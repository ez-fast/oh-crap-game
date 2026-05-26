import React from 'react';

export default function OhCrapGame() {

  // =========================
  // SOUND ENGINE V3.1
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
  // WORLD STATE
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
  const [mode, setMode] = React.useState('calm');

  // =========================
  // BACKGROUNDS
  // =========================
  const backgrounds = {
    start: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
    bathroom: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
    kitchen: "https://images.unsplash.com/photo-1556911220-bff31c812dba",
    disaster: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6"
  };

  // =========================
  // EZ-FAST AI RESPONSE ENGINE
  // =========================
  const aiResponse = (chaos) => {
    const responses = [
      "EZ-FAST stabilizes the system instantly.",
      "Technician isolates the failure point before escalation.",
      "Emergency bypass prevents further flooding.",
      "Full restoration completed with no secondary damage.",
      "Advanced diagnostics prevent a major failure."
    ];
    return responses[Math.min(Math.floor(chaos / 25), responses.length - 1)];
  };

  // =========================
  // RANDOM EVENTS
  // =========================
  const events = [
    "A pipe vibrates ominously...",
    "Water sounds echo behind the walls...",
    "Your dog refuses to enter the room.",
    "Something is dripping... but unseen.",
    "Pressure in the system is changing.",
  ];

  // =========================
  // STORY ENGINE
  // =========================
  const story = {
    start: {
      title: "OH CRAP! — Toilet Overflow",
      text: "Water rises fast. Something is wrong.",
      choices: [
        { text: "Call EZ-FAST Plumbing", next: "end_good", damage: -10, stress: -15, wallet: -250 },
        { text: "Try DIY plunging", next: "bathroom", damage: 15, stress: 20, wallet: 0 }
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
      text: "Multiple drains are backing up simultaneously.",
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
    if (Math.random() < 0.35) {
      setEvent(events[Math.floor(Math.random() * events.length)]);
    } else {
      setEvent('');
    }
  };

  // =========================
  // CHOICE ENGINE
  // =========================
  const choose = (c) => {
    play('click');
    triggerEvent();

    // MODE SYSTEM
    if (c.damage >= 40) setMode('disaster');
    else if (c.damage >= 20) setMode('warning');
    else setMode('calm');

    // SHAKE
    if (c.damage > 30) {
      setShake(true);
      play('disaster');
      setTimeout(() => setShake(false), 400);
    }

    // STATE UPDATE
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
    setEvent('');
    setEnding('');
    setMode('calm');
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 text-white transition-all duration-500 ${shake ? "animate-shake" : ""}`}
      style={{
        backgroundImage: `url(${backgrounds[node] || backgrounds.start})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* FLOOD EFFECT */}
      {state.flood > 20 && (
        <div
          className="absolute bottom-0 left-0 w-full bg-blue-500/20 transition-all duration-700"
          style={{ height: `${state.flood}%` }}
        />
      )}

      <div className="relative w-full max-w-4xl bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-700 z-10">

        <h1 className="text-3xl font-bold text-red-400 mb-3">
          {current.title}
        </h1>

        {/* EVENT */}
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
          <div className="space-y-4 text-center">

            <div className="text-green-300 text-lg font-semibold">
              {aiResponse(state.chaos)}
            </div>

            <button
              onClick={reset}
              className="w-full p-4 bg-red-600 rounded-xl"
            >
              Play Again
            </button>

            <div className="text-xs text-slate-400">
              Chaos Score: {state.chaos}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}