import React from 'react';

export default function OhCrapGame() {
  const soundEffects = {
    click: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
    disaster: 'https://assets.mixkit.co/active_storage/sfx/209/209-preview.mp3',
    success: 'https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3'
  };

  const playSound = (type) => {
    const audio = new Audio(soundEffects[type]);
    audio.volume = 0.35;
    audio.play().catch(() => {});
  };

  // =========================
  // WORLD STATE SYSTEM
  // =========================
  const [state, setState] = React.useState({
    damage: 0,
    stress: 0,
    wallet: 0,
    flood: 0,
    dogMood: 70,
    spouseTrust: 80,
    insuranceRisk: 10,
    chaosLevel: 0
  });

  const [currentNode, setCurrentNode] = React.useState('start');
  const [event, setEvent] = React.useState('');
  const [shake, setShake] = React.useState(false);
  const [achievement, setAchievement] = React.useState('');

  // =========================
  // RANDOM EVENTS
  // =========================
  const randomEvents = [
    "A neighbor gives unsolicited plumbing advice.",
    "Your spouse is now supervising you.",
    "The water pressure suddenly changes.",
    "You hear dripping... but can't find it.",
    "The house smells worse than before.",
    "A YouTube plumber contradicts your plan."
  ];

  // =========================
  // EZ-FAST RESCUE ENGINE (NEW)
  // =========================
  const generateRescueOutcome = () => {
    const outcomes = [
      {
        text: "EZ-FAST dispatch arrives within 40 minutes and quickly stabilizes the system with no additional damage.",
        stress: -15,
        bonus: 0
      },
      {
        text: "A senior technician identifies the issue early and prevents what could have become a major failure.",
        stress: -20,
        bonus: 75
      },
      {
        text: "Emergency service arrives promptly. The blockage is cleared and the system is fully restored.",
        stress: -12,
        bonus: 0
      },
      {
        text: "Technician explains the root cause and performs a preventive fix that saves you future repairs.",
        stress: -18,
        bonus: 50
      }
    ];

    return outcomes[Math.floor(Math.random() * outcomes.length)];
  };

  const isCallEzFast = (text) =>
    text.toLowerCase().includes("call ez-fast");

  // =========================
  // STORY NODES
  // =========================
  const storyNodes = {
    start: {
      title: "OH CRAP! — Toilet Backup",
      text: `
You flush the upstairs toilet.

Nothing happens.

Then everything happens.
      `,
      choices: [
        { text: "Call EZ-FAST Plumbing", next: "goodEnding", damage: -5, stress: -10, wallet: -250 },
        { text: "Try DIY plunging", next: "plungerAttempt", damage: 10, stress: 15, wallet: 0 }
      ]
    },

    kitchenStart: {
      title: "OH CRAP! — Kitchen Disaster",
      text: `
The garbage disposal makes a horrifying noise.

The sink fills up faster than it drains.
      `,
      choices: [
        { text: "Call EZ-FAST Plumbing", next: "goodEnding", damage: -5, stress: -10, wallet: -250 },
        { text: "Reach in carefully", next: "disposalDisaster", damage: 20, stress: 25, wallet: -50 }
      ]
    },

    waterHeaterStart: {
      title: "OH CRAP! — Water Heater Leak",
      text: `
You hear hissing from the garage.

The water heater is leaking.

It is not supposed to do that.
      `,
      choices: [
        { text: "Call EZ-FAST Plumbing", next: "goodEnding", damage: -5, stress: -10, wallet: -300 },
        { text: "Tap it lightly", next: "heaterExplosion", damage: 30, stress: 25, wallet: -100 }
      ]
    },

    plungerAttempt: {
      title: "The Plunger Incident",
      text: `The toilet responds… aggressively.`,
      choices: [
        { text: "Call EZ-FAST Plumbing", next: "rescuedEnding", damage: -5, stress: -10, wallet: -350 },
        { text: "Rent a drain snake", next: "snakeDisaster", damage: 25, stress: 20, wallet: -89 }
      ]
    },

    snakeDisaster: {
      title: "Critical Failure",
      text: `The snake gets stuck. Something cracks.`,
      choices: [
        { text: "Call EZ-FAST Plumbing", next: "lateRescueEnding", damage: 10, stress: 10, wallet: -650 },
        { text: "Push harder", next: "catastropheEnding", damage: 50, stress: 40, wallet: -1200 }
      ]
    },

    disposalDisaster: {
      title: "Kitchen Escalation",
      text: `Everything starts backing up into everything else.`,
      choices: [
        { text: "Call EZ-FAST Plumbing", next: "rescuedEnding", damage: 5, stress: 5, wallet: -300 },
        { text: "Keep DIY-ing", next: "catastropheEnding", damage: 40, stress: 30, wallet: -900 }
      ]
    },

    heaterExplosion: {
      title: "Water Heater Regret",
      text: `The leak becomes… more confident.`,
      choices: [
        { text: "Call EZ-FAST Plumbing", next: "lateRescueEnding", damage: 15, stress: 15, wallet: -800 }
      ]
    },

    // =========================
    // ENDINGS
    // =========================
    goodEnding: {
      ending: true,
      title: "Professional Victory",
      text: "Everything is fixed quickly and correctly."
    },

    rescuedEnding: {
      ending: true,
      title: "Narrow Escape",
      text: "You avoided major damage."
    },

    lateRescueEnding: {
      ending: true,
      title: "Expensive Lesson",
      text: "Repairs worked, but the bill hurt."
    },

    catastropheEnding: {
      ending: true,
      title: "TOTAL CATASTROPHE",
      text: "Everything went wrong. Completely."
    }
  };

  const node = storyNodes[currentNode];
  const startNodes = ['start', 'kitchenStart', 'waterHeaterStart'];

  // =========================
  // HANDLE CHOICE (UPDATED)
  // =========================
  const handleChoice = (choice) => {
    playSound('click');

    if (Math.random() < 0.35) {
      setEvent(randomEvents[Math.floor(Math.random() * randomEvents.length)]);
    } else {
      setEvent('');
    }

    if (choice.damage >= 25) {
      setShake(true);
      playSound('disaster');
      setTimeout(() => setShake(false), 500);
    }

    // =========================
    // EZ-FAST CALL ENHANCED LOGIC
    // =========================
    if (isCallEzFast(choice.text)) {
      const result = generateRescueOutcome();

      setEvent(`🚨 EZ-FAST Dispatch: ${result.text}`);

      setState(prev => ({
        ...prev,
        stress: Math.max(0, prev.stress + result.stress),
        wallet: prev.wallet + choice.wallet + result.bonus,
        damage: Math.max(0, prev.damage - 10),
        insuranceRisk: Math.max(0, prev.insuranceRisk - 5),
        chaosLevel: prev.chaosLevel + 2
      }));

      setTimeout(() => {
        setCurrentNode(choice.next);
      }, 1200);

      return;
    }

    // =========================
    // NORMAL PATH
    // =========================
    setState(prev => ({
      damage: Math.max(0, prev.damage + choice.damage),
      stress: Math.max(0, prev.stress + choice.stress),
      wallet: prev.wallet + choice.wallet,
      flood: Math.min(100, prev.flood + choice.damage),
      dogMood: Math.max(0, prev.dogMood - choice.damage * 0.4),
      spouseTrust: Math.max(0, prev.spouseTrust - choice.stress * 0.5),
      insuranceRisk: prev.insuranceRisk + choice.damage * 0.6,
      chaosLevel: prev.chaosLevel + choice.damage + choice.stress
    }));

    setCurrentNode(choice.next);

    if (choice.next === 'catastropheEnding') {
      setAchievement("MASTER OF BAD DECISIONS");
    }
  };

  // =========================
  // RESTART
  // =========================
  const restartGame = () => {
    const randomStart =
      startNodes[Math.floor(Math.random() * startNodes.length)];

    setCurrentNode(randomStart);

    setState({
      damage: 0,
      stress: 0,
      wallet: 0,
      flood: 0,
      dogMood: 70,
      spouseTrust: 80,
      insuranceRisk: 10,
      chaosLevel: 0
    });

    setEvent('');
    setAchievement('');
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-white p-6 flex items-center justify-center ${shake ? "animate-shake" : ""}`}>
      <div className="w-full max-w-4xl bg-slate-900 p-8 rounded-3xl border border-slate-700">

        <h1 className="text-4xl font-bold text-red-400 mb-4">
          {node.title}
        </h1>

        {event && (
          <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-400 text-yellow-200 rounded-xl">
            ⚠ {event}
          </div>
        )}

        <p className="whitespace-pre-line mb-6">
          {node.text}
        </p>

        <div className="grid grid-cols-2 gap-2 text-sm text-slate-300 mb-6">
          <div>Damage: {state.damage}</div>
          <div>Stress: {state.stress}</div>
          <div>Dog Mood: {state.dogMood}</div>
          <div>Spouse Trust: {state.spouseTrust}</div>
        </div>

        {!node.ending ? (
          <div className="space-y-3">
            {node.choices.map((c, i) => (
              <button
                key={i}
                onClick={() => handleChoice(c)}
                className="w-full p-4 bg-slate-800 rounded-xl hover:bg-slate-700"
              >
                {c.text}
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <button
              onClick={restartGame}
              className="w-full p-4 bg-red-600 rounded-xl"
            >
              Play Again
            </button>

            <div className="text-sm text-slate-300 bg-black/40 p-4 rounded-xl">
              Chaos Score: {state.chaosLevel}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}