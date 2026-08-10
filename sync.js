// TME290 错题本 —— 本地存储 + 跨端同步（挂到 window.WrongBook）
//
// 本地结构（localStorage 'tme290-wrongbook-v1'）：
//   { data: { "<examId>#<n>": entry }, updatedAt }
// entry = { examId, examTitle, n, section, q, correct, user, explain, ts, removed }
//   correct: 'T' | 'F' | 'both'   user: 'T' | 'F' | ''(留空)   removed: 答对后置 true 的墓碑
// 合并按 entry.ts 逐条取新，天然支持“换设备各自新增 + 答对移除”，无需登录。
(function () {
  var LS_BOOK = 'tme290-wrongbook-v1';
  var LS_CODE = 'tme290-sync-code';
  var API = '/api/errors';

  function now() { return Date.now(); }
  function keyOf(examId, n) { return examId + '#' + n; }

  function load() {
    try {
      var b = JSON.parse(localStorage.getItem(LS_BOOK));
      if (b && b.data) return b;
    } catch (e) {}
    return { data: {}, updatedAt: 0 };
  }
  function saveLocal(book) {
    try { localStorage.setItem(LS_BOOK, JSON.stringify(book)); } catch (e) {}
  }
  function getCode() {
    try { return (localStorage.getItem(LS_CODE) || '').trim(); } catch (e) { return ''; }
  }
  function setCode(c) {
    try { localStorage.setItem(LS_CODE, (c || '').trim()); } catch (e) {}
  }
  function validCode(c) { return /^[A-Za-z0-9_-]{4,64}$/.test((c || '').trim()); }

  // 逐条按 ts 取新合并（含墓碑）
  function merge(a, b) {
    var out = { data: {}, updatedAt: 0 };
    var keys = {}, k;
    for (k in a.data) keys[k] = 1;
    for (k in b.data) keys[k] = 1;
    for (k in keys) {
      var x = a.data[k], y = b.data[k];
      var pick = !y ? x : !x ? y : ((y.ts || 0) >= (x.ts || 0) ? y : x);
      out.data[k] = pick;
      if ((pick.ts || 0) > out.updatedAt) out.updatedAt = pick.ts || 0;
    }
    return out;
  }

  // 交卷时把整卷结果写入错题本：错/空 → 记入；答对 → 若已存在则置墓碑
  function recordResult(exam, ALL, state, isCorrect) {
    var book = load(), t = now(), changed = false;
    ALL.forEach(function (q) {
      var kk = keyOf(exam.id, q.n);
      var user = state.answers[q.n];
      var ok = user !== undefined && isCorrect(q, user);
      if (ok) {
        if (book.data[kk] && !book.data[kk].removed) {
          book.data[kk] = Object.assign({}, book.data[kk], { removed: true, ts: t });
          changed = true;
        }
      } else {
        book.data[kk] = {
          examId: exam.id, examTitle: exam.title, n: q.n, section: q.section,
          q: q.q, correct: q.both ? 'both' : (q.a ? 'T' : 'F'),
          user: user === undefined ? '' : user, explain: q.e || '',
          ts: t, removed: false,
        };
        changed = true;
      }
    });
    if (changed) { book.updatedAt = t; saveLocal(book); push(); } // push 为尽力而为
    return book;
  }

  // 手动移除（“已弄懂”）
  function resolve(k) {
    var book = load();
    if (book.data[k]) {
      book.data[k] = Object.assign({}, book.data[k], { removed: true, ts: now() });
      book.updatedAt = now();
      saveLocal(book);
      push();
    }
  }

  function activeList(book) {
    var arr = [];
    for (var k in book.data) if (!book.data[k].removed) arr.push(book.data[k]);
    arr.sort(function (a, b) {
      if (a.examId !== b.examId) return a.examId < b.examId ? -1 : 1;
      return a.n - b.n;
    });
    return arr;
  }

  // ---------- 网络 ----------
  function pullRemote() {
    var code = getCode();
    if (!validCode(code)) return Promise.reject(new Error('no-code'));
    return fetch(API + '?code=' + encodeURIComponent(code), { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
      .then(function (j) { return (j && j.data) ? j : { data: {}, updatedAt: 0 }; });
  }
  function push() {
    var code = getCode();
    if (!validCode(code)) return Promise.resolve(false);
    var book = load();
    return fetch(API, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: code, data: book.data, updatedAt: book.updatedAt }),
    }).then(function (r) { return r.ok; }).catch(function () { return false; });
  }
  // 拉远端 → 合并 → 回写本地 → 推合并结果，返回合并后的 book
  function sync() {
    return pullRemote().then(function (remote) {
      var merged = merge(load(), remote);
      saveLocal(merged);
      return push().then(function () { return merged; });
    });
  }

  window.WrongBook = {
    load: load, saveLocal: saveLocal,
    getCode: getCode, setCode: setCode, validCode: validCode,
    recordResult: recordResult, resolve: resolve, activeList: activeList,
    pull: pullRemote, push: push, sync: sync,
  };
})();
