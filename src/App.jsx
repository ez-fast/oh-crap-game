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

  // ===============================
  // 1. WORLD STATE (UPGRADED)
  // ===============================
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
  const [finalReport, setFinalReport] = React.useState('');

  const randomEvents = [
    "A neighbor gives unsolicited plumbing advice.",
    "Your spouse is now supervising you.",
    "The water pressure suddenly changes.",
    "You hear dripping... but can't find it.",
    "The house smells worse than before.",
    "A YouTube plumber contradicts your plan."
  ];

  // ===============================
  // STORY NODES
  // ===============================
  const storyNodes = {
    start: {
      title: "OH CRAP!",
      text: `
It’s 9:14 PM.

You flush the upstairs toilet.

Nothing happens.

Then it gets worse.
      `,
      choices: [
        {
          text: "Call EZ-FAST Plumbing",
          next: "goodEnding",
          damage: -5,
          stress: -10,
          wallet: -250
        },
        {
          text: "Try to fix it yourself",
          next: "plungerAttempt",
          damage: 10,
          stress: 15,
          wallet: 0
        }
      ]
    },

    plungerAttempt: {
      title: "The Plunger Incident",
      text: `
You plunge aggressively.

The toilet responds emotionally.

Poorly.
      `,
      choices: [
        {
          text: "Call EZ-FAST Plumbing",
          next: "rescuedEnding",
          damage: -5,
          stress: -10,
          wallet: -350
        },
        {
          text: "Rent a drain snake",
          next: "snakeDisaster",
          damage: 25,
          stress: 20,
          wallet: -89
        }
      ]
    },

    snakeDisaster: {
      title: "Critical Failure",
      text: `
The snake gets stuck in the pipe.

You panic.

The house starts making new sounds.
      `,
      choices: [
        {
          text: "Call EZ-FAST Plumbing",
          next: "lateRescueEnding",
          damage: 10,
          stress: 10,
          wallet: -650
        },
        {
          text: "Push harder anyway",
          next: "catastropheEnding",
          damage: 50,
          stress: 40,
          wallet: -1200
        }
      ]
    },

    goodEnding: {
      ending: true,
      title: "Professional Victory",
      text: "EZ-FAST fixes everything quickly. Nothing else breaks."
    },

    rescuedEnding: {
      ending: true,
      title: "Narrow Escape",
      text: "You avoided a full plumbing disaster."
    },

    lateRescueEnding: {
      ending: true,
      title: "Expensive Lesson"
    },

    catastropheEnding: {
      ending: true,
      title: "TOTAL CATASTROPHE"
    }
  };

  const node = storyNodes[currentNode];

  // ===============================
  // 2. WORLD STATE ENGINE (DOG + FAMILY + CHAOS)
  // ===============================
  const handleChoice = (choice) => {
    playSound('click');

    // random event system
    if (Math.random() < 0.35) {
      setEvent(randomEvents[Math.floor(Math.random() * randomEvents.length)]);
    } else {
      setEvent('');
    }

    // shake on big damage
    if (choice.damage >= 25) {
      setShake(true);
      playSound('disaster');
      setTimeout(() => setShake(false), 500);
    }

    // WORLD STATE UPDATE (CORE UPGRADE)
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

    if (choice.next === 'catastropheEnding') {
      setAchievement('MASTER OF BAD DECISIONS');
      generateFinalReport("catastropheEnding");
    }

    if (choice.next === 'goodEnding') {
      setAchievement('RESPONSIBLE HOMEOWNER');
      generateFinalReport("goodEnding");
    }

    setCurrentNode(choice.next);
  };

  // ===============================
  // 3. FINAL REPORT (INSURANCE STYLE)
  // ===============================
  const generateFinalReport = (endingType) => {
    setFinalReport(`
INSURANCE + HOME DAMAGE REPORT

Physical Damage: ${state.damage}%
Emotional Stress: ${state.stress}%
Financial Loss: $${Math.abs(state.wallet)}

Dog Mood: ${state.dogMood}/100
Spouse Trust: ${state.spouseTrust}/100
Insurance Risk Score: ${state.insuranceRisk}
Chaos Index: ${state.chaosLevel}

Outcome: ${endingType.toUpperCase()}

Recommendation:
Do not attempt further DIY plumbing.
Call a licensed professional immediately.
    `);
  };

  const restartGame = () => {
    setCurrentNode('start');
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
    setFinalReport('');
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-white p-6 flex items-center justify-center ${shake ? "animate-pulse" : ""}`}>

      <div className="w-full max-w-4xl bg-slate-900 p-8 rounded-3xl border border-slate-700">

        <h1 className="text-4xl font-bold text-red-400 mb-4">
          {node.title}
        </h1>

        {event && (
          <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-400 text-yellow-200 rounded-xl">
            ⚠ {event}
          </div>
        )}

        <p className="whitespace-pre-line mb-6 text-slate-200">
          {node.text}
        </p>

        {/* WORLD STATE HUD */}
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

            {finalReport && (
              <pre className="text-xs bg-black/40 p-4 rounded-xl whitespace-pre-wrap">
                {finalReport}
              </pre>
            )}
          </div>
        )}

      </div>
    </div>
  );
}