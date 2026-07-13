// TME290 / FIM764 题库：模拟卷 + 2024/2025/2026 三套真题（官方答案）
// a: true = T, false = F；both: true 表示考官声明 T/F 均判对；e = 一句话解析
// section 可带 context（HTML），一题一页模式下显示在题干上方

var DOCKERFILE_CTX =
  '<details class="ctx" open><summary><strong>Dockerfile（两种变体，题目引用其行号）</strong></summary>' +
  '<div class="ctx-grid">' +
  '<div><div class="ctx-label">变体 1 · Alpine</div><pre>' +
' 1  # Build\n' +
' 2  FROM alpine:3.17 as builder\n' +
' 3  RUN apk update && \\\n' +
' 4      apk --no-cache add \\\n' +
' 5          ca-certificates \\\n' +
' 6          cmake \\\n' +
' 7          g++ \\\n' +
' 8          make \\\n' +
' 9          linux-headers\n' +
'10  RUN apk add libcluon --no-cache --repository \\\n' +
'11      https://chrberger.github.io/libcluon/alpine/v3.13 --allow-untrusted\n' +
'12  ADD . /opt/sources\n' +
'13  WORKDIR /opt/sources\n' +
'14  RUN mkdir /tmp/build && cd /tmp/build && \\\n' +
'15      cmake /opt/sources && \\\n' +
'16      make && make test && cp helloworld /tmp\n' +
'17\n' +
'18  # Deploy\n' +
'19  FROM alpine:3.17\n' +
'20  RUN apk update && \\\n' +
'21      apk --no-cache add \\\n' +
'22          libstdc++\n' +
'23  COPY --from=builder /tmp/helloworld /usr/bin\n' +
'24  CMD ["/usr/bin/helloworld"]' +
  '</pre></div>' +
  '<div><div class="ctx-label">变体 2 · Ubuntu</div><pre>' +
' 1  # Build\n' +
' 2  FROM ubuntu:22.04 as builder\n' +
' 3  RUN apt-get update && \\\n' +
' 4      apt-get install -y \\\n' +
' 5          build-essential \\\n' +
' 6          cmake \\\n' +
' 7          software-properties-common\n' +
' 8\n' +
' 9\n' +
'10  RUN add-apt-repository \'ppa:chrberger/libcluon\' && \\\n' +
'11      apt-get update && apt-get install libcluon\n' +
'12  ADD . /opt/sources\n' +
'13  WORKDIR /opt/sources\n' +
'14  RUN mkdir /tmp/build && cd /tmp/build && \\\n' +
'15      cmake /opt/sources && \\\n' +
'16      make && make test && cp helloworld /tmp\n' +
'17\n' +
'18  # Deploy\n' +
'19  FROM ubuntu:22.04\n' +
'20\n' +
'21\n' +
'22\n' +
'23  COPY --from=builder /tmp/helloworld /usr/bin\n' +
'24  CMD ["/usr/bin/helloworld"]' +
  '</pre></div></div></details>';

var KINEMATICS_CTX =
  '<div class="ctx"><strong>Robot kinematics</strong> — 建议先在草稿纸上推导差速驱动运动学方程（提示：从瞬时旋转中心 ICR 出发）。已知：' +
  '<ul>' +
  '<li>The robot has the velocity V and yaw rate φ̇</li>' +
  '<li>The robot’s frame is a rigid body of radius R</li>' +
  '<li>The wheels, radius r, roll without slipping</li>' +
  '<li>The wheels can only move in the direction perpendicular to the wheel axis</li>' +
  '<li>The wheels can rotate independently of each other</li>' +
  '<li>The forward speed of the wheel is v = ωr</li>' +
  '</ul></div>';

// 2025 Part 5 的有向图（按真题图重绘）
var DIJKSTRA_CTX = (function () {
  var N = { A: [45, 180], B: [170, 75], C: [255, 325], D: [330, 210], E: [455, 65], F: [490, 205], G: [530, 330], H: [615, 170] };
  var E = [
    ['A', 'B', 5], ['A', 'C', 8], ['B', 'E', 4], ['B', 'D', 3], ['C', 'D', 3],
    ['D', 'E', 2], ['D', 'F', 5], ['D', 'G', 3], ['E', 'F', 2], ['E', 'H', 4],
    ['F', 'H', 1], ['G', 'H', 1]
  ];
  var R = 18;
  var s = '<svg viewBox="0 0 660 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Directed graph for Dijkstra">' +
    '<defs><marker id="arr" markerWidth="9" markerHeight="8" refX="8" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1f2937"/></marker></defs>';
  E.forEach(function (e) {
    var a = N[e[0]], b = N[e[1]];
    var dx = b[0] - a[0], dy = b[1] - a[1], len = Math.sqrt(dx * dx + dy * dy);
    var ux = dx / len, uy = dy / len;
    var x1 = a[0] + ux * R, y1 = a[1] + uy * R;
    var x2 = b[0] - ux * (R + 4), y2 = b[1] - uy * (R + 4);
    var mx = (x1 + x2) / 2 - uy * 12, my = (y1 + y2) / 2 + ux * 12;
    s += '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="#1f2937" stroke-width="2" marker-end="url(#arr)"/>';
    s += '<text x="' + mx + '" y="' + my + '" font-size="15" font-weight="bold" fill="#1f2937" text-anchor="middle" dominant-baseline="middle">' + e[2] + '</text>';
  });
  Object.keys(N).forEach(function (k) {
    var p = N[k];
    s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + R + '" fill="#fff" stroke="#1f2937" stroke-width="2"/>';
    s += '<text x="' + p[0] + '" y="' + p[1] + '" font-size="15" font-weight="bold" fill="#1f2937" text-anchor="middle" dominant-baseline="central">' + k + '</text>';
  });
  s += '</svg>';
  return '<div class="ctx"><strong>Path planning</strong> — 下图为有向图（按 2025 真题重绘），Q38/Q39 需按图手推 Dijkstra。' + s + '</div>';
})();

var EXAMS = [
  {
    id: 'mock',
    title: '模拟卷（全新措辞）',
    subtitle: '60 题 · 检验是否真懂原理，考前一周闭卷计时 40 分钟做',
    gradeNote: '3 → 45，4 → 51，5 → 56',
    grades: { g3: 45, g4: 51, g5: 56 },
    sections: [
      {
        section: "History & computing hardware 历史与计算硬件",
        questions: [
          { n: 1, q: "The Tortoise demonstrated that complex behaviour can emerge from a few simple analog circuits.", a: true, e: "乌龟用简单模拟电路→涌现。" },
          { n: 2, q: "Shakey (SRI) was the first general-purpose mobile robot able to reason about its own actions.", a: true, e: "Shakey 是首台能对自身行动推理的通用移动机器人。" },
          { n: 3, q: "Personal companion robots became a widespread commercial success in the 1990s.", a: false, e: "个人机器人在 90 年代只是炒作，没真正普及。" },
          { n: 4, q: "A microcontroller normally runs without any operating system.", a: true, e: "微控制器裸机运行、无操作系统。" },
          { n: 5, q: "A CPU running a general-purpose operating system can guarantee hard real-time timing.", a: false, e: "跑 OS 的 CPU 实时性差，不能保证硬实时。" },
          { n: 6, q: "A PLD/FPGA is fast because its logic is implemented directly as hardware circuitry.", a: true, e: "PLD/FPGA 是硬件电路直接算，故极快。" },
          { n: 7, q: "A CPU together with an operating system can run several programs concurrently.", a: true, e: "CPU+OS 可同时跑多个程序。" }
        ]
      },
      {
        section: "Sensors & cameras 传感器与相机",
        questions: [
          { n: 8, q: "Ultrasonic sensors generally have a longer range than IR sensors.", a: true, e: "超声波量程比 IR 远。" },
          { n: 9, q: "An IR distance sensor can measure an object located at exactly zero distance.", a: false, e: "主动测距有大于零的最小量程，测不到 0 距离。" },
          { n: 10, q: "A conventional RGB camera captures more light in the red band than in the green band.", a: false, e: "拜耳阵列绿最多，不是红。" },
          { n: 11, q: "A rolling shutter reads the image out line by line, whereas a global shutter exposes all pixels at the same instant.", a: true, e: "卷帘逐行读出、全局快门整幅同时曝光——描述正确。" },
          { n: 12, q: "Intrinsic calibration is what relates a camera to the other sensors mounted on the robot.", a: false, e: "联系其他传感器的是外参；内参只管相机自身。" }
        ]
      },
      {
        section: "CI/CD, git & OTA",
        questions: [
          { n: 13, q: "Continuous Integration (CI) includes automatically testing the built binaries.", a: true, e: "自动测试是 CI 的核心。" },
          { n: 14, q: "Using git you can trace the exact source-code version of your software.", a: true, e: "git 提供源代码的可溯源性。" },
          { n: 15, q: "git is the tool used to version and trace the compiled binaries that run on the robot.", a: false, e: "git 管源码；二进制溯源靠 CI/CD，不是 git。" },
          { n: 16, q: "OTA (over-the-air) refers to remotely deploying new software to robots in the field.", a: true, e: "OTA=远程下发软件。" }
        ]
      },
      {
        section: "Docker",
        questions: [
          { n: 17, q: "The command `docker run` creates a container from an image.", a: true, e: "docker run 从镜像创建并启动容器。" },
          { n: 18, q: "The command `docker run` builds a new Docker image.", a: false, e: "造镜像的是 docker build；run 产出容器。" },
          { n: 19, q: "Alpine-based images are generally smaller than Ubuntu-based images.", a: true, e: "Alpine 比 Ubuntu 小。" },
          { n: 20, q: "In a multi-stage build, the build tools used in the builder stage end up in the final image.", a: false, e: "build 工具留在 builder 阶段，最终镜像只含编好的程序。" },
          { n: 21, q: "In a multi-stage build, a second FROM starts a fresh image into which only the compiled program is copied.", a: true, e: "第二个 FROM 开启全新镜像、只复制编好的程序——多阶段构建。" },
          { n: 22, q: "libcluon is a library for transmitting data between running programs.", a: true, e: "libcluon=进程间通信库。" }
        ]
      },
      {
        section: "Microservices & cross-compilation 微服务与交叉编译",
        questions: [
          { n: 23, q: "Microservices deployed on a robot usually share a common communication protocol.", a: true, e: "微服务共享统一通信协议。" },
          { n: 24, q: "A single microservice should handle all the tasks needed to operate the robot.", a: false, e: "一个微服务只做一件事。" },
          { n: 25, q: "A microservice architecture makes it easier to work with OTA and CI/CD.", a: true, e: "微服务利于 OTA 和 CI/CD。" },
          { n: 26, q: "A microservice architecture makes it easier to decide which algorithms the robot should run.", a: false, e: "微服务管部署/隔离，不决定“该跑哪些算法”（三年真题都 F）。" },
          { n: 27, q: "Cross-compilation lets an amd64 machine build a binary that runs on an arm64 robot.", a: true, e: "交叉编译=在 amd64 上编出 arm64 能跑的二进制。" },
          { n: 28, q: "Adding more third-party dependencies to a binary is a good way to improve its security.", a: false, e: "依赖越多攻击面越大，降低安全性。" }
        ]
      },
      {
        section: "Deployment & tuning 部署与调参",
        questions: [
          { n: 29, q: "SSH is primarily used to remotely log in and run commands on a machine.", a: true, e: "SSH 本职=远程登录敲命令。" },
          { n: 30, q: "SSH is the tool used to cross-compile software.", a: false, e: "SSH 不是交叉编译工具。" },
          { n: 31, q: "It is good practice to hard-code a large number of perception parameters as constants in the C++ code.", a: false, e: "视觉参数硬编码是坏做法（应可配置）。" },
          { n: 32, q: "Data replay is an effective way to tune perception parameters.", a: true, e: "调感知参数用 data replay 高效。" },
          { n: 33, q: "Data replay is the most efficient way to tune motion-control parameters.", a: false, e: "运动控制要闭环/实物；data replay 是开环，不行。" }
        ]
      },
      {
        section: "Differential-drive kinematics 差速驱动运动学",
        context: KINEMATICS_CTX,
        questions: [
          { n: 34, q: "For a differential-drive robot, the forward speed is V = (v_R + v_L) / 2.", a: true, e: "V=(v_R+v_L)/2（无 R）。" },
          { n: 35, q: "The yaw rate is φ̇ = (v_R − v_L) / R.", a: false, e: "应为 φ̇=(v_R−v_L)/2R，分母是 2R。" },
          { n: 36, q: "The right wheel speed satisfies v_R = V + φ̇R.", a: true, e: "由 V、φ̇ 反解：v_R=V+φ̇R。" },
          { n: 37, q: "When integrating the x position, one can use x₁ = x₀ + ∫ ((v_R + v_L)/2) · sin φ dt.", a: false, e: "x 用 cos φ（sin φ 是 y 的）——这是符号陷阱。" }
        ]
      },
      {
        section: "Simulation 仿真",
        questions: [
          { n: 38, q: "Modular simulation fits naturally with a microservice architecture.", a: true, e: "模块化仿真与微服务天然契合。" },
          { n: 39, q: "Hardware-in-the-loop (HIL) testing can be used as part of automated testing.", a: true, e: "HIL 可进自动化测试。" },
          { n: 40, q: "Modular simulation makes SIL more difficult than a monolithic simulation does.", a: false, e: "模块化仿真让 SIL 更容易，不是更难。" }
        ]
      },
      {
        section: "Control & steering 控制与转向",
        questions: [
          { n: 41, q: "In a PID controller, the derivative (D) term helps resist oscillations.", a: true, e: "D 项抑制振荡（阻尼）。" },
          { n: 42, q: "When steering a robot, the integral (I) term is the most important component.", a: false, e: "转向主力是 P、D，不是 I。" },
          { n: 43, q: "A rate limiter is useful when working with vision-based perception.", a: true, e: "rate limiter 平滑视觉感知的跳变。" },
          { n: 44, q: "The two-point steering model uses a near point and a far point, and its output is a control rate.", a: true, e: "两点模型=近点+远点，输出转向速率。" },
          { n: 45, q: "The aim-point model has fewer tunable parameters than the preview model.", a: true, e: "瞄点参数比预瞄模型少（2024 原题）。" }
        ]
      },
      {
        section: "Kalman filter 卡尔曼滤波",
        questions: [
          { n: 46, q: "A Kalman filter is often used when sensors are noisy.", a: true, e: "传感器噪声大时用 KF。" },
          { n: 47, q: "A Kalman filter is often used when the sensor update frequency is too low.", a: true, e: "更新频率低时用 KF（模型填空档）。" },
          { n: 48, q: "A Kalman filter cannot be used on a robot because it needs pre-recorded data.", a: false, e: "KF 在线递归、边跑边算，不需录制数据。" },
          { n: 49, q: "A Kalman filter performs the Predict step before the Update step.", a: true, e: "先 Predict 后 Update。" },
          { n: 50, q: "The process model and the observation model are simply two ways of modelling the sensors.", a: false, e: "process model 描述运动，不是“另一种传感器建模”。" },
          { n: 51, q: "The Kalman gain balances trust between the model prediction and the measurement.", a: true, e: "Kalman gain=模型/测量的信任权重。" },
          { n: 52, q: "The standard (linear) Kalman filter works well with a state vector [x, y, φ] that includes the heading angle.", a: false, e: "[x,y,φ] 含朝向角→位置更新非线性→要 EKF，标准 KF 不行。" }
        ]
      },
      {
        section: "Decision making 决策 (FSM / BBR / Symbolic AI / ER / ANN)",
        questions: [
          { n: 53, q: "A finite-state machine (FSM) describes the transitions between behaviours.", a: true, e: "FSM 描述行为间转移。" },
          { n: 54, q: "An FSM automatically tunes its own parameters.", a: false, e: "FSM 参数人工设定，不自调。" },
          { n: 55, q: "A subsumption architecture can be built from a set of FSMs, with higher layers suppressing lower ones.", a: true, e: "包容架构可由一组 FSM 搭、高层抑制低层。" },
          { n: 56, q: "Braitenberg vehicles are implemented as simple finite-state machines.", a: false, e: "Braitenberg=传感器直连电机的纯连线，不是 FSM。" },
          { n: 57, q: "Behaviour-based robotics (BBR) is inspired by human psychology.", a: false, e: "BBR 源自动物行为学 (ethology)，不是心理学。" },
          { n: 58, q: "In behaviour-based robotics, the behaviours run in parallel rather than strictly one after another.", a: true, e: "BBR 行为并行运行，不是顺序。" },
          { n: 59, q: "In evolutionary/embodied robotics, there are no clearly defined behaviours or data-processing stages.", a: true, e: "进化/具身机器人无预定义行为/阶段。" },
          { n: 60, q: "A sufficiently large fully-connected ANN can approximate essentially any input–output mapping.", a: true, e: "足够大的全连接 ANN=万能逼近器。" }
        ]
      }
    ]
  },

  {
    id: 'e2026',
    title: '2026年6月真题',
    subtitle: '60 题 · 你 6 月摸底 40/60 的那套，目标稳定 50+',
    gradeNote: '3 → 45，4 → 51，5 → 56',
    grades: { g3: 45, g4: 51, g5: 56 },
    sections: [
      {
        section: "历史 History",
        questions: [
          { n: 1, q: "The Tortoise is famous for being first with using a microcontroller.", a: false, e: "乌龟用模拟电路；微控制器 1971 年才出现（晚 23 年）。" },
          { n: 2, q: "Shakey was a robot with clear physical similarities to the Kiwi D2 robot.", a: true, e: "两者都是带摄像头+测距传感器的轮式移动机器人。⚠️你6月错" },
          { n: 3, q: "So called personal robots was a concept that really took off in the 90s.", a: false, e: "80/90 年代只是炒作、没真正普及。⚠️你6月错" }
        ]
      },
      {
        section: "计算硬件 Computing hardware",
        questions: [
          { n: 4, q: "A programmable logic device is extremely fast in execution.", a: true, e: "可重配硬件电路、信号直穿 → 极快。⚠️你6月错" },
          { n: 5, q: "A microcontroller runs a very lean operating system (OS).", a: false, e: "微控制器直接在裸硬件上跑程序，无 OS。⚠️你6月错" },
          { n: 6, q: "A microcontroller is capable of real-time execution.", a: true, e: "裸机运行、执行时机可预测 → 实时。⚠️你6月错" },
          { n: 7, q: "A CPU is optimized to run one executable at a time.", a: false, e: "CPU 配 OS 就是为同时跑多个程序。⚠️你6月错" }
        ]
      },
      {
        section: "传感器与相机 Sensors & cameras",
        questions: [
          { n: 8, q: "IR sensors have a minimum range larger than zero.", a: true, e: "主动测距都有 >0 的最小量程。" },
          { n: 9, q: "IR sensors have a longer range compared to ultrasonic sensors.", a: false, e: "超声波更远。" },
          { n: 10, q: "A conventional RGB camera captures more light within the red wavelengths compared to blue and green.", a: false, e: "拜耳阵列绿最多（2绿1红1蓝）。" },
          { n: 11, q: "A rolling shutter is faster compared to a global shutter.", a: true, e: "卷帘逐行读出更快（全局快门更慢更贵）。⚠️你6月错" },
          { n: 12, q: "Intrinsic calibration of a camera relates it to other sensors on the robot.", a: false, e: "联系其他传感器的是外参；内参只标定相机自身。" }
        ]
      },
      {
        section: "git / CI / OTA",
        questions: [
          { n: 13, q: "Using git one can achieve traceability (version identification) of binaries for robots.", a: false, e: "git 管源码、不管二进制；二进制溯源靠 CI/CD（can 陷阱）。⚠️你6月错" },
          { n: 14, q: "GitLab and GitHub are examples of web-based frontends for git-based CI.", a: true, e: "两者都是 git CI 的 web 前端。" },
          { n: 15, q: "CI includes automated testing of binaries.", a: true, e: "自动测试是 CI 核心。⚠️你6月错" },
          { n: 16, q: "HIL can be used as part of automated testing.", a: true, e: "硬件在环可自动化。⚠️你6月错" },
          { n: 17, q: "OTA is the process of reading performance data from robots in the field.", a: false, e: "OTA 是下发软件；读数据回来是监控。⚠️你6月错" }
        ]
      },
      {
        section: "Docker / 微服务 / 部署",
        questions: [
          { n: 18, q: "Ubuntu-based Docker images are recommended to use on robots as they include more features.", a: false, e: "机器人求小 → 用 Alpine。" },
          { n: 19, q: "libcluon is a library for transmitting data between running computer programs.", a: true, e: "进程间通信库，三年都考。" },
          { n: 20, q: "The command docker run creates a Docker container.", a: true, e: "run 产出容器（造镜像的是 docker build）。⚠️你6月错" },
          { n: 21, q: "A set of microservices deployed in a robot shares a common communication protocol.", a: true, e: "统一协议。" },
          { n: 22, q: "A microservice should handle a single task.", a: true, e: "一个服务只做一件事。" },
          { n: 23, q: "Microservices makes it easier to plan what algorithms should run on a robot.", a: false, e: "三年都是 F！微服务管部署/隔离/更新，算法选型另说。⚠️你6月错" },
          { n: 24, q: "Microservices makes it easier to work with OTA and CI/CD.", a: true, e: "小而独立 → 易单独更新。⚠️你6月错" },
          { n: 25, q: "A drawback of using microservices is that they are likely to increase technical debt.", a: false, e: "反而帮控复杂度。" },
          { n: 26, q: "Cross-compilation can be especially useful in robotics when configured as an automated part of a CI/CD pipeline.", a: true, e: "CI/CD 流水线中自动交叉编译正是常规做法。" },
          { n: 27, q: "Dependencies for a binary is a good way to increase software security.", a: false, e: "依赖越多攻击面越大。" },
          { n: 28, q: "Small binaries are hard to achieve when cross-compiling.", a: false, e: "交叉编译照样能产出小二进制。" },
          { n: 29, q: "A general difficulty when deploying a C++-based microservice to the Kiwi robot is that the Raspberry Pi uses an ARM64 CPU, while a GitLab server runs on an AMD64 CPU.", a: false, e: "架构确实不同，但交叉编译是常规操作、能轻松跨过，不算“难点”。" },
          { n: 30, q: "SSH is a tool primarily used for software deployment, for example in robots.", a: false, e: "SSH 本职是远程登录操作。" }
        ]
      },
      {
        section: "调参 Parameter tuning",
        questions: [
          { n: 31, q: "It is a good idea to set a large number of parameters for visual perception as constants within the C++ code.", a: false, e: "硬编码是坏做法（应可配置）。" },
          { n: 32, q: "The best way to find parameters for visual perception for the robot is to use data replay.", a: true, e: "调感知参数用 data replay 最高效。" },
          { n: 33, q: "Data replay is the most efficient way of tuning parameters for robot motion control.", a: false, e: "运动控制要闭环；data replay 是开环，只适合感知。⚠️你6月错" }
        ]
      },
      {
        section: "运动学 Robot kinematics",
        context: KINEMATICS_CTX,
        questions: [
          { n: 34, q: "It can be shown that v_R = V + φ̇R", a: true, e: "由 V、φ̇ 反解单轮速。" },
          { n: 35, q: "The yaw rate is calculated as φ̇ = (v_R − v_L) / 2R", a: true, e: "分母 2R，对。" },
          { n: 36, q: "When integrating the x position of a differentially steered robot in simulation, the following can be used: x₁ = x₀ + ∫ (v_R(t)+v_L(t))/2 · cos φ(t) dt", a: true, e: "位置 = 速度 Vx 的积分，x 用 cos φ。⚠️你6月错" }
        ]
      },
      {
        section: "仿真与控制 Simulation & control",
        questions: [
          { n: 37, q: "Modular simulation makes SIL more challenging, compared to monolithic simulation.", a: false, e: "模块化仿真让 SIL 更容易。" },
          { n: 38, q: "For a PID controller, the I part is the most important component when steering a robot.", a: false, e: "转向主力是 P 和 D。" },
          { n: 39, q: "A rate limiter is useful when working with vision-based perception.", a: true, e: "视觉会跳变，限速率平滑。⚠️你6月错" },
          { n: 40, q: "The two-point model uses a near and a far point, where the output is given as control rate.", a: true, e: "三年原句。" },
          { n: 41, q: "The aim point model contains two tunable parameters.", a: false, e: "瞄点参数比预瞄更少；说“两个”故 F。" }
        ]
      },
      {
        section: "卡尔曼滤波 Kalman filter",
        questions: [
          { n: 42, q: "A Kalman filter is often used when sensors have too low update frequency.", a: true, e: "频率低时用 KF 填空档。" },
          { n: 43, q: "A Kalman filter can not be used in a robot, since it requires recorded data.", a: false, e: "KF 在线递归、边跑边算即可。" },
          { n: 44, q: "A Kalman filter first runs the step Update and then the step Predict.", a: false, e: "先 Predict 后 Update。" },
          { n: 45, q: "The process model and observation model are two ways of modelling the sensors.", a: false, e: "process model 建的是运动。" },
          { n: 46, q: "The Kalman gain is used to increase the frequency of sensors.", a: false, e: "gain 是信任权重。" },
          { n: 47, q: "The standard Kalman filter works well with the kinematic model of the differentially steered robot.", a: true, e: "运动学关系（轮速↔V、φ̇）是线性的 → 标准 KF 可用。" },
          { n: 48, q: "The standard Kalman filter works well with the dynamic model of the differentially steered robot.", a: false, e: "动力学模型非线性 → 要 EKF。" },
          { n: 49, q: "The standard Kalman filter works well with the state vector [x, y, φ].", a: false, e: "含 φ 的位置更新非线性 → 需 EKF。" }
        ]
      },
      {
        section: "决策 Decision making",
        questions: [
          { n: 50, q: "A finite-state machine (FSM) is used to describe the transitions between behaviours.", a: true, e: "FSM 描述行为间转移。" },
          { n: 51, q: "An FSM can be implemented as if-statements acting on globally available variables.", a: true, e: "可用作用于全局变量的 if 语句实现。" },
          { n: 52, q: "Breitenberg vehicles are implemented as simple FSMs.", a: false, e: "Braitenberg = 传感器直连电机的纯连线映射，不是 FSM。" },
          { n: 53, q: "Behaviour-based robotics (BBR) is inspired from human psychology.", a: false, e: "源自动物行为学 ethology。" },
          { n: 54, q: "BBR uses atomic behaviours as building blocks.", a: true, e: "原子行为是积木。" },
          { n: 55, q: "In BBR, behaviour selection is trivial.", a: false, e: "行为协调是核心难题。" },
          { n: 56, q: "A Subsumption architecture can be modelled from a set of FSMs.", a: true, e: "包容架构可由一组 FSM 搭。⚠️你6月错" },
          { n: 57, q: "Breitenberg vehicles show us that simple atomic behaviours result in easily explainable overall behaviours.", a: false, e: "教训是“造易析难”，不是容易解释。⚠️你6月错" },
          { n: 58, q: "In Symbolic AI, intelligence is decomposed into functional modules with no clearly defined data processing stages.", a: false, e: "符号 AI 恰恰有清晰阶段，“no”说反。" },
          { n: 59, q: "In evolutionary/embodied robotics, there are no clearly defined behaviours or data processing stages.", a: true, e: "进化机器人无预定义阶段。" },
          { n: 60, q: "A fully connected ANN with a sufficiently large number of hidden layers can achieve any mapping between inputs and outputs in a behavioural model.", a: true, e: "万能逼近。⚠️你6月错" }
        ]
      }
    ]
  },

  {
    id: 'e2025',
    title: '2025年5月真题',
    subtitle: '46 题 · 含 Dockerfile 图题和 Dijkstra 手推图题',
    gradeNote: '3 → 34，4 → 38，5 → 42',
    grades: { g3: 34, g4: 38, g5: 42 },
    sections: [
      {
        section: "Part 1: Using Docker for autonomous robots",
        context: DOCKERFILE_CTX,
        questions: [
          { n: 1, q: "RUN commands can be placed before the first FROM command.", a: false, e: "RUN 必须在 FROM 之后。" },
          { n: 2, q: "The second FROM (line 19) will start over, creating a second Docker image.", a: true, e: "第二个 FROM 开启全新镜像（多阶段构建）。" },
          { n: 3, q: "The build tools installed from line 3 are installed since they are needed in the resulting Docker image (later deployed on the robot).", a: false, e: "build 工具只留在 builder 阶段；最终镜像只含编好的程序。" },
          { n: 4, q: "Every time a new Docker image is created, from line 14, the source code seems to be tested using pre-defined test cases.", a: true, e: "第 16 行 make test：构建时跑预定义测试。" },
          { n: 5, q: "Ubuntu lacks the package libstdc++, making it unable to run the compiled program.", a: false, e: "编造的依赖说法。" },
          { n: 6, q: "Line 24 immediately runs the compiled program.", a: false, e: "CMD 只是声明容器启动时才执行的命令。" },
          { n: 7, q: "Ubuntu is more suitable to use on robots, as the resulting images are smaller than Alpine.", a: false, e: "说反了：Alpine 更小、机器人用 Alpine。" },
          { n: 8, q: "libcluon is a library for transmitting data between running computer programs.", a: true, e: "进程间通信库。" },
          { n: 9, q: "The command docker run spawns a Docker image.", a: false, e: "run 产出容器；造镜像的是 docker build。" },
          { n: 10, q: "A set of microservices deployed in a robot shares a common communication protocol.", a: true, e: "统一协议。" },
          { n: 11, q: "A microservice should handle all the tasks needed for operating the robot.", a: false, e: "一个服务只做一件事。" },
          { n: 12, q: "Microservices makes it easier to plan what algorithms should run in a robot.", a: false, e: "三年都是 F：微服务不帮算法选型。" },
          { n: 13, q: "Microservices makes it easier to work with OTA and CI/CD.", a: true, e: "小而独立 → 易单独更新。" },
          { n: 14, q: "Cross-compilation is useful since we can compile software on one CPU type (e.g. amd64) to run on another (e.g. arm64).", a: true, e: "这才是交叉编译的定义（跨 CPU 架构）。" }
        ]
      },
      {
        section: "Part 2: Robot simulation and robot control",
        context: KINEMATICS_CTX,
        questions: [
          { n: 15, q: "The forward speed is calculated as V = R(v_R+v_L)/2", a: false, e: "多了 R；正确 V=(v_R+v_L)/2。" },
          { n: 16, q: "The yaw rate is calculated as φ̇ = (v_R−v_L)/R", a: false, e: "分母应是 2R。" },
          { n: 17, q: "Modular simulation works poorly for a microservice architecture.", a: false, e: "模块化仿真与微服务天然契合。" },
          { n: 18, q: "In a PID controller, the D part is resisting oscillations.", a: true, e: "D = 阻尼抑振。" },
          { n: 19, q: "A rate limiter is important when working with vision-based perception.", a: true, e: "视觉会跳变，限速率平滑。" },
          { n: 20, q: "The two-point model uses a near and a far point, where the output is given as control rate.", a: true, e: "三年原句。" }
        ]
      },
      {
        section: "Part 3: Kalman filters for sensor fusion",
        questions: [
          { n: 21, q: "A Kalman filter is often used when sensors have too low update frequency.", a: true, e: "频率低时用 KF 填空档。" },
          { n: 22, q: "A Kalman filter can not be used in a robot, since it requires recorded data.", a: false, e: "KF 在线递归、边跑边算即可。" },
          { n: 23, q: "A Kalman filter is often used when sensors are noisy.", a: true, e: "噪声大用 KF。" },
          { n: 24, q: "The process model and observation model are two ways of modelling the sensors.", a: false, e: "process model 建的是运动。" },
          { n: 25, q: "The Kalman gain is used to increase the frequency of sensors.", a: false, e: "gain 是信任权重。" },
          { n: 26, q: "A Kalman filter can be used for localization of a robot.", a: true, e: "KF 可用于定位。" }
        ]
      },
      {
        section: "Part 4: Behaviour architectures and decision making",
        questions: [
          { n: 27, q: "A finite-state machine (FSM) is used to describe the transitions between behaviours.", a: true, e: "FSM 描述行为间转移。" },
          { n: 28, q: "An FSM is often a set of if-statements.", a: true, e: "常实现为一组 if 语句。" },
          { n: 29, q: "An FSM automatically tunes its own parameters.", a: false, e: "FSM 参数由人工设定。" },
          { n: 30, q: "Behaviour-based robotics (BBR) is inspired from human psychology.", a: false, e: "源自动物行为学 ethology。" },
          { n: 31, q: "BBR can be modelled from an FSM.", a: true, e: "可由 FSM 建模。" },
          { n: 32, q: "BBR uses atomic behaviours as building blocks.", a: true, e: "原子行为是积木。" },
          { n: 33, q: "Breitenberg vehicles show us that simple atomic behaviours result in easily explainable overall behaviours.", a: false, e: "教训是“造易析难”。" },
          { n: 34, q: "In Symbolic AI, intelligence is decomposed into functional modules with no clearly defined data processing stages.", a: false, e: "符号 AI 恰恰有清晰阶段。" },
          { n: 35, q: "In evolutionary/embodied robotics, there are no clearly defined behaviours or data processing stages.", a: true, e: "进化机器人无预定义阶段。" },
          { n: 36, q: "In behaviour-based robotics, a set of isolated robotic behaviours run in sequence.", a: false, e: "是并行，不是顺序。" },
          { n: 37, q: "A fully connected ANN with X hidden layers can achieve any mapping between inputs and outputs.", a: true, e: "万能逼近。" }
        ]
      },
      {
        section: "Part 5: Path planning",
        context: DIJKSTRA_CTX,
        questions: [
          { n: 38, q: "When running Dijkstra's algorithm on the above graph (from A to H), the distance to H is updated twice.", a: true, e: "H 先经 E 更新为 13，再经 F 更新为 12——共 2 次（G→H 得 12 不更小）。" },
          { n: 39, q: "When running Dijkstra's algorithm on the above graph (from A to H), all nodes except one needs to be visited.", a: false, e: "到 H 出队为止所有节点都被访问过。" },
          { n: 40, q: "Dijkstra's algorithm is the most efficient algorithm for finding the shortest distance for a robot.", a: false, e: "A*（Dijkstra+启发式）更快。" },
          { n: 41, q: "Dijkstra's algorithm is often used when controlling the speed of a robot.", a: false, e: "它是路径规划（找路），不管速度控制。" }
        ]
      },
      {
        section: "Part 6: Working with the Kiwi D1 robot",
        questions: [
          { n: 42, q: "There are at least three ways of getting a C++-based microservice to the Kiwi robot.", a: true, e: "部署方式不止一种（SSH 拷贝、Docker、OTA…）。" },
          { n: 43, q: "SSH is a tool for cross-compilation.", a: false, e: "SSH 是远程登录工具。" },
          { n: 44, q: "It is a good idea to set parameters for visual perception as constants in the C++ code.", a: false, e: "硬编码是坏做法。" },
          { n: 45, q: "The best way to find parameters for visual perception for the robot is to use modular simulation.", a: false, e: "调感知参数最好用 data replay，不是模块化仿真。" },
          { n: 46, q: "The most efficient way to find parameters for visual perception for the robot is to use the robot hardware.", a: false, e: "用实机最低效；感知调参用 data replay。" }
        ]
      }
    ]
  },

  {
    id: 'e2024',
    title: '2024年8月补考真题',
    subtitle: '33 题 · 原卷规则答错扣 1 分（判分时两种口径都给你算）',
    gradeNote: '3 → 24，4 → 27，5 → 30（按原卷倒扣规则）',
    grades: { g3: 24, g4: 27, g5: 30 },
    penalty: true,
    sections: [
      {
        section: "Part A: Using Docker for autonomous robots",
        context: DOCKERFILE_CTX,
        questions: [
          { n: 1, q: "Line 2 indicate what base image the Docker resulting image will be based on.", a: false, e: "多阶段构建：最终镜像基于第二个 FROM（19行），第2行只是 builder 阶段。" },
          { n: 2, q: "The word builder on line 2 is user-specified (rather than being a formal Docker keyword).", a: true, e: "builder 是用户自定义别名。" },
          { n: 3, q: "The build tools installed from line 3 are installed since they are needed in the resulting Docker image (later deployed on the robot).", a: false, e: "build 工具只留在 builder 阶段。" },
          { n: 4, q: "Every time a new Docker image is created, from line 14, the source code seems to be tested using pre-defined test cases.", a: true, e: "第 16 行 make test：构建时跑测试。" },
          { n: 5, q: "Ubuntu lacks the package libstdc++, making it unable to run the compiled program.", a: false, e: "编造的依赖说法。" },
          { n: 6, q: "Line 24 immediately runs the compiled program.", a: false, e: "CMD 只是声明容器启动时才执行的命令。" },
          { n: 7, q: "Alpine images are in general smaller in disk space compared to Ubuntu images.", a: true, e: "Alpine 极简、更小。" },
          { n: 8, q: "libcluon is a library for transmitting data between running computer programs.", a: true, e: "进程间通信库。" },
          { n: 9, q: "The command docker run spawns a Docker image.", a: false, e: "run 产出容器；造镜像的是 docker build。" },
          { n: 10, q: "A set of microservices deployed in a robot shares a common communication protocol.", a: true, e: "统一协议。" },
          { n: 11, q: "A microservice should handle all the tasks needed for operating the robot.", a: false, e: "一个服务只做一件事。" },
          { n: 12, q: "Microservices makes it easier to plan what algorithms should run in a robot.", a: false, e: "三年都是 F。" },
          { n: 13, q: "Microservices makes it easier to work with OTA and CI/CD.", a: true, e: "小而独立 → 易单独更新。" },
          { n: 14, q: "Cross-compilation is useful since we can compile software in Alpine to work with Ubuntu.", a: false, e: "交叉编译是跨 CPU 架构（amd64↔arm64），不是跨发行版。" }
        ]
      },
      {
        section: "Part B: Robot simulation and robot control",
        context: KINEMATICS_CTX,
        questions: [
          { n: 15, q: "The forward speed is calculated as V = R(v_R+v_L)/2", a: false, e: "多了 R。" },
          { n: 16, q: "The yaw rate is calculated as φ̇ = (v_R−v_L)/R", a: false, e: "分母应是 2R。" },
          { n: 17, q: "Modular simulation works poorly for a microservice architecture.", a: false, e: "天然契合。" },
          { n: 18, q: "Modular simulation is a good complement when running hardware-in-the-loop tests.", a: true, e: "模块化仿真是 HIL 的好补充。" },
          { n: 19, q: "The aim point model has fewer parameters than the preview model.", a: true, e: "瞄点参数比预瞄少。" },
          { n: 20, q: "The two-point model uses a near and a far point, where the output is given as control rate.", a: true, e: "三年原句。" }
        ]
      },
      {
        section: "Part C: Kalman filters for sensor fusion",
        questions: [
          { n: 21, q: "A Kalman filter is often used when sensors have too low update frequency.", a: true, e: "频率低时用 KF。" },
          { n: 22, q: "A Kalman filter is often used when there is no good model of the robot motion.", a: true, both: true, e: "考官声明 T 与 F 都判对（本站按你怎么选都算对）。" },
          { n: 23, q: "A Kalman filter is often used when sensors are noisy.", a: true, e: "噪声大用 KF。" },
          { n: 24, q: "The process model and observation model are two ways of modelling the sensors.", a: false, e: "process model 建的是运动。" },
          { n: 25, q: "The Kalman gain is used to increase the frequency of sensors.", a: false, e: "gain 是信任权重。" },
          { n: 26, q: "A Kalman filter can be used for localization of a robot.", a: true, e: "可用于定位。" }
        ]
      },
      {
        section: "Problem D: Behaviour architectures and decision making",
        questions: [
          { n: 27, q: "A finite-state machine (FSM) is used to describe the transitions between behaviours.", a: true, e: "FSM 描述行为间转移。" },
          { n: 28, q: "An FSM is often a set of if-statements.", a: true, e: "常实现为一组 if。" },
          { n: 29, q: "An FSM automatically tunes its own parameters.", a: false, e: "参数人工设定。" },
          { n: 30, q: "Behaviour-based robotics (BBR) is inspired from human psychology.", a: false, e: "源自动物行为学 ethology。" },
          { n: 31, q: "BBR can be modelled from an FSM.", a: true, e: "可由 FSM 建模。" },
          { n: 32, q: "BBR uses atomic behaviours as building blocks.", a: true, e: "原子行为是积木。" },
          { n: 33, q: "BBR is a method for decision making.", a: true, e: "BBR 是决策方法。" }
        ]
      }
    ]
  }
];
