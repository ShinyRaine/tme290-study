// TME290 / FIM764 模拟卷 · 60 题判断题（全新措辞，非真题原句）
// answer: true = T, false = F
const EXAM_DATA = [
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
];
