import React from 'react';

export default function OhCrapGame() {

  // =========================
  // SOUND ENGINE V3
  // =========================
  const sound = {
    click: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
    disaster: 'https://assets.mixkit.co/active_storage/sfx/209/209-preview.mp3',
    success: 'https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3',
    drip: 'https://assets.mixkit.co/active_storage/sfx/3005/3005-preview.mp3'
  };

  const play = (type) => {
    const audio = new Audio(sound[type]);
    audio.volume = 0.35;
    audio.play().catch(() => {});
  };

  // =========================
  // WORLD STATE V3
  // =========================
  const [state, setState] = React.useState({
    damage: 0,
    stress: 0,
    wallet: 0,
    flood: 0,
    chaos: 0
  });

  const [node, setNode] = React.useState('start');
  const [event, setEvent] = React.useState('');
  const [shake, setShake] = React.useState(false);
  const [ending, setEnding] = React.useState('');

  // =========================
  // VISUAL SCENES
  // =========================
  const backgrounds = {
    start: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
    kitchen: "https://images.unsplash.com/photo-1556911220-bff31c812dba",
    bathroom: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
    disaster: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6"
  };

  // =========================
  // AI-STYLE EZ FAST ENGINE
  // =========================
  const aiResponse = (chaos) => {
    const responses = [
      "Technician stabilizes system instantly.",
      "Advanced diagnosis prevents escalation.",
      "Emergency bypass installed successfully.",
      "Full system restoration completed.",
      "Critical leak isolated and repaired."
    ];

    return responses[Math.min(Math.floor(chaos / 20), responses.length - 1)];
  };

  // =========================
  // RANDOM EVENTS
  // =========================
  const events = [
    "A pipe vibrates ominously...",
    "You hear water behind the walls...",
    "Your dog refuses to enter the bathroom.",
    "The floor feels slightly warmer...",
    "Something is dripping… somewhere.",
  ];

  // =========================
  // STORY NODES V3
  // =========================
  const story = {
    start: {
      title: "OH CRAP! — Toilet Overflow",
      text: "Water rises. Fast. Something is wrong.",
      choices: [
        { text: "Call EZ-FAST Plumbing", next: "end_good", damage: -10, stress: -15, wallet: -250 },
        { text: "Try to fix it yourself", next: "bathroom", damage: 15, stress: 20, wallet: 0 }
      ]
    },

    bathroom: {
      title: "Bathroom Escalation",
      text: "The problem spreads to the shower drain.",
      choices: [
        { text: "Call EZ-FAST Plumbing", next: "end_rescue", damage: -5, stress: -10, wallet: -400 },
        { text: "Keep going", next: "disaster", damage: 35, stress: 30, wallet: -120 }
      ]
    },

    disaster: {
      title: "SYSTEM FAILURE",
      text: "Multiple drains are now backing up simultaneously.",
      choices: [
        { text: "Call EZ-FAST Plumbing", next: "end_late", damage: 10, stress: 10, wallet: -800 },
        { text: "Open cleanout pipe", next: "end_bad", damage: 60, stress: 60, wallet: -2000 }
      ]
    },

    end_good: {
      ending: true,
      title: "Professional Victory",
      text: "Everything is fixed cleanly and quickly."
    },

    end_rescue: {
      ending: true,
      title: "Narrow Escape",
      text: "You avoided major damage."
    },

    end_late: {
      ending: true,
      title: "Expensive Lesson",
      text: "It got fixed… but at a cost."
    },

    end_bad: {
      ending: true,
      title: "TOTAL DISASTER",
      text: "The house will never be the same."
    }
  };

  const current = story[node];

  // =========================
  // RANDOM EVENT TRIGGER
  // =========================
  const triggerEvent = () => {
    if (Math.random() < 0.3) {
      setEvent(events[Math.floor(Math.random() * events.length)]);
    } else {
      setEvent('');
    }
  };

  // =========================
  // HANDLE CHOICE V3
  // =========================
  const choose = (c) => {
    play('click');
    triggerEvent();

    if (c.damage > 30) {
      setShake(true);
      play('disaster');
      setTimeout(() => setShake(false), 400);
    }

    setState(prev => ({
      damage: Math.max(0, prev.damage + c.damage),
      stress: Math.max(0, prev.stress + c.stress),
      wallet: prev.wallet + c.wallet,
      flood: Math.min(100, prev.flood + c.damage),
      chaos: prev.chaos + c.damage + c.stress
    }));

    if (c.next.includes("end")) {
      play('success');
      setEnding(c.next);
    }

    setNode(c.next);
  };

  // =========================
  // RESET
  // =========================
  const reset = () => {
    setNode('start');
    setState({ damage: 0, stress: 0, wallet: 0, flood: 0, chaos: 0 });
    setEnding('');
    setEvent('');
  };

  return (
    <div
      className={`min-h-screen text-white flex items-center justify-center p-6 transition-all duration-500 ${shake ? "animate-shake" : ""}`}
      style={{
        backgroundImage: `url(${backgrounds[node] || backgrounds.start})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >

      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* flood effect */}
      {state.flood > 30 && (
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-blue-500/20 animate-flood"></div>
      )}

      <div className="relative w-full max-w-3xl bg-slate-900/90 p-8 rounded-3xl border border-slate-700 backdrop-blur-lg">

        <h1 className="text-3xl font-bold text-red-400 mb-3">
          {current.title}
        </h1>

        {event && (
          <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-400 text-yellow-200 rounded-xl">
            ⚠ {event}
          </div>
        )}

        <p className="mb-6 text-slate-200 whitespace-pre-line">
          {current.text}
        </p>

        {/* HUD */}
        <div className="grid grid-cols-3 gap-2 text-xs text-slate-300 mb-6">
          <div>Damage: {state.damage}</div>
          <div>Stress: {state.stress}</div>
          <div>Chaos: {state.chaos}</div>
        </div>

        {!current.ending ? (
          <div className="space-y-3">
            {current.choices.map((c, i) => (
              <button
                key={i}
                onClick={() => choose(c)}
                className="w-full p-4 bg-slate-800/80 hover:bg-slate-700 rounded-xl transition"
              >
                {c.text}
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center text-lg text-green-300">
              {aiResponse(state.chaos)}
            </div>

            <button
              onClick={reset}
              className="w-full p-4 bg-red-600 rounded-xl"
            >
              Play Again
            </button>

            <div className="text-xs text-slate-400 text-center">
              Final Chaos Score: {state.chaos}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}