import React from 'react';

export default function OhCrapGame() {

  // =========================
  // SOUND ENGINE
  // =========================
  const sound = {
    click: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
    disaster: 'https://assets.mixkit.co/active_storage/sfx/209/209-preview.mp3',
    success: 'https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3',
  };

  const play = (type) => {
    const audio = new Audio(sound[type]);
    audio.volume = 0.35;
    audio.play().catch(() => {});
  };

  // =========================
  // STATE
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
  const [mode, setMode] = React.useState('calm');

  // =========================
  // VISUAL STATE ENGINE (NEW)
  // =========================
  const getVisualMode = () => {
    if (state.flood > 60 || mode === 'disaster') return 'flood';
    if (state.flood > 30 || mode === 'warning') return 'warning';
    return 'calm';
  };

  const visualMode = getVisualMode();

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
  // STORY
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
  // EVENTS
  // =========================
  const triggerEvent = () => {
    if (Math.random() < 0.3) {
      setEvent(events[Math.floor(Math.random() * events.length)]);
    } else setEvent('');
  };

  // =========================
  // CHOICE ENGINE
  // =========================
  const choose = (c) => {
    play('click');
    triggerEvent();

    if (c.damage > 30) {
      setShake(true);
      play('disaster');
      setTimeout(() => setShake(false), 400);
    }

    if (c.damage >= 40) setMode('disaster');
    else if (c.damage >= 20) setMode('warning');
    else setMode('calm');

    setState(prev => ({
      damage: Math.max(0, prev.damage + c.damage),
      stress: Math.max(0, prev.stress + c.stress),
      wallet: prev.wallet + c.wallet,
      flood: Math.min(100, prev.flood + c.damage),
      chaos: prev.chaos + c.damage + c.stress
    }));

    setNode(c.next);
  };

  // =========================
  // RESET
  // =========================
  const reset = () => {
    setNode('start');
    setState({ damage: 0, stress: 0, wallet: 0, flood: 0, chaos: 0 });
    setEvent('');
    setMode('calm');
  };

  // =========================
  // VISUAL PANEL (NEW ANIMATIONS)
  // =========================
  const VisualPanel = () => {
    return (
      <div className="w-full h-full flex items-center justify-center relative">

        {/* CALM */}
        {visualMode === 'calm' && (
          <div className="text-blue-300 animate-pulse text-center">
            💧 Subtle plumbing hum...
          </div>
        )}

        {/* WARNING */}
        {visualMode === 'warning' && (
          <div className="text-yellow-300 animate-bounce text-center">
            🚰 Pipes under pressure...
          </div>
        )}

        {/* FLOOD */}
        {visualMode === 'flood' && (
          <div className="text-red-400 animate-pulse text-center">
            🌊 SYSTEM FAILURE<br />
            Water rising...
          </div>
        )}

      </div>
    );
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 bg-slate-950 text-white ${shake ? "animate-shake" : ""}`}>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* LEFT GAME PANEL */}
        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-700">

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
                  className="w-full p-4 bg-slate-800 hover:bg-slate-700 rounded-xl"
                >
                  {c.text}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="text-green-300 font-semibold">
                EZ-FAST restores order.
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

        {/* RIGHT VISUAL PANEL */}
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 flex items-center justify-center min-h-[300px]">
          <VisualPanel />
        </div>

      </div>
    </div>
  );
}