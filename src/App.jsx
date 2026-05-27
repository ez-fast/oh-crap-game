import React from 'react';

export default function OhCrapGame() {

  // =========================
  // SOUND ENGINE V5.5
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
  // GAME STATE
  // =========================
  const [state, setState] = React.useState({
    chaos: 0,
    stress: 0,
    damage: 0,
    wallet: 0,
    mistakes: 0
  });

  const [node, setNode] = React.useState('start');
  const [event, setEvent] = React.useState('');
  const [shake, setShake] = React.useState(false);

  // =========================
  // RANDOM EVENTS
  // =========================
  const randomEvents = [
    "Your neighbor texts: 'Everything okay over there?'",
    "The dog suddenly leaves the room at high speed.",
    "Something inside the wall makes a deeply concerning noise.",
    "Your spouse quietly opens Zillow.",
    "A pipe makes a sound like a submarine hull failing."
  ];

  const triggerEvent = () => {
    if (Math.random() < 0.45) {
      setEvent(randomEvents[Math.floor(Math.random() * randomEvents.length)]);
    } else {
      setEvent('');
    }
  };

  // =========================
  // EZ-FAST AI CHARACTER
  // =========================
  const ezFastResponse = () => {
    const responses = [
      "EZ-FAST arrives, surveys the scene, and nods with the exhaustion of someone who has seen this exact confidence before.",
      "The technician fixes the issue in 18 minutes and politely avoids asking why you touched the cleanout pipe.",
      "EZ-FAST restores order while your spouse watches silently like this is a courtroom proceeding.",
      "The technician immediately identifies the issue and says: 'Ah. A classic DIY escalation event.'",
      "EZ-FAST stabilizes the system before the house can evolve into an indoor water park."
    ];

    return responses[
      Math.floor(Math.random() * responses.length)
    ];
  };

  // =========================
  // STORY ENGINE
  // =========================
  const story = {

    start: {
      title: "OH CRAP! — Toilet Overflow",
      comic: "🚽",
      spouse: "Your spouse stares at the rising toilet water with the expression of someone reconsidering past life choices.",
      dog: "The dog begins barking at the bathroom like it detected paranormal activity.",
      text: `
You flush the upstairs toilet.

Nothing happens.

Then the bowl slowly fills to the top like the house itself is thinking about revenge.

A bubbling sound echoes from somewhere deep inside the walls.
      `,
      choices: [
        {
          text: "Call EZ-FAST Plumbing",
          next: "goodEnding",
          damage: -10,
          stress: -15,
          wallet: -250
        },
        {
          text: "Attempt confident DIY repair",
          next: "bathroom",
          damage: 15,
          stress: 20,
          wallet: 0
        }
      ]
    },

    bathroom: {
      title: "Bathroom Escalation Event",
      comic: "🌊",
      spouse: "Your spouse asks if you've 'actually done this before' in a tone that already knows the answer.",
      dog: "The dog refuses to cross the bathroom doorway.",
      text: `
You begin plunging aggressively.

At first, it seems promising.

Then the shower drain starts bubbling.

Then the sink joins in.

The bathroom now sounds like a swamp having an argument.
      `,
      choices: [
        {
          text: "Call EZ-FAST Plumbing",
          next: "rescueEnding",
          damage: -5,
          stress: -10,
          wallet: -400
        },
        {
          text: "Continue DIY experiment",
          next: "disaster",
          damage: 35,
          stress: 30,
          wallet: -120
        }
      ]
    },

    disaster: {
      title: "SYSTEM FAILURE",
      comic: "💥",
      spouse: "Your spouse has stopped speaking entirely, which somehow feels worse.",
      dog: "The dog relocates to the farthest corner of the house.",
      text: `
You remove a pipe you were emotionally unprepared to remove.

The system immediately responds.

Water explodes across the floor.

Something hits the ceiling.

You now understand why professional plumbers charge what they charge.
      `,
      choices: [
        {
          text: "Call EZ-FAST Plumbing and admit defeat",
          next: "lateEnding",
          damage: 10,
          stress: 10,
          wallet: -850
        },
        {
          text: "Keep going somehow",
          next: "badEnding",
          damage: 60,
          stress: 60,
          wallet: -2000
        }
      ]
    },

    // =========================
    // ENDINGS
    // =========================
    goodEnding: {
      ending: true,
      title: "Professional Victory",
      comic: "🛠️",
      spouse: "Your spouse regains partial confidence in your decision-making abilities.",
      dog: "The dog cautiously returns to the hallway.",
      text: `
You wisely stop before things become catastrophic.

The situation remains mostly contained.

For now.
      `
    },

    rescueEnding: {
      ending: true,
      title: "Narrow Escape",
      comic: "🚰",
      spouse: "Your spouse immediately claims they suggested calling a professional earlier.",
      dog: "The dog watches the plumber with deep respect.",
      text: `
You narrowly avoid structural water damage.

The house survives.

Emotionally? Less clear.
      `
    },

    lateEnding: {
      ending: true,
      title: "Expensive Lesson",
      comic: "💸",
      spouse: "Your spouse now supervises all future home improvement discussions.",
      dog: "The dog no longer trusts loud plumbing noises.",
      text: `
The repairs are successful.

Unfortunately, so is the invoice.
      `
    },

    badEnding: {
      ending: true,
      title: "TOTAL PLUMBING APOCALYPSE",
      comic: "🔥",
      spouse: "Your spouse begins researching tiny homes.",
      dog: "The dog has emotionally detached from the family.",
      text: `
Water enters rooms that should never contain water.

Insurance terminology becomes part of your daily vocabulary.

The ceiling develops opinions.
      `
    }
  };

  const current = story[node];

  // =========================
  // CHOICE ENGINE
  // =========================
  const choose = (choice) => {

    play('click');
    triggerEvent();

    if (choice.damage >= 30) {
      setShake(true);
      play('disaster');

      setTimeout(() => {
        setShake(false);
      }, 500);
    }

    if (choice.next.includes("Ending")) {
      play('success');
    }

    setState(prev => ({
      chaos: prev.chaos + choice.damage + choice.stress,
      stress: prev.stress + choice.stress,
      damage: prev.damage + choice.damage,
      wallet: prev.wallet + choice.wallet,
      mistakes: prev.mistakes + (
        choice.text.toLowerCase().includes("diy") ||
        choice.text.toLowerCase().includes("keep going")
          ? 1
          : 0
      )
    }));

    setNode(choice.next);
  };

  // =========================
  // RESET
  // =========================
  const reset = () => {

    setState({
      chaos: 0,
      stress: 0,
      damage: 0,
      wallet: 0,
      mistakes: 0
    });

    setNode('start');
    setEvent('');
  };

  // =========================
  // VISUAL PANEL
  // =========================
  const ComicPanel = () => {

    if (node === 'start') {
      return (
        <div className="flex flex-col items-center text-center">
          <div className="text-8xl animate-bounce">🚽</div>

          <div className="mt-6 bg-blue-500/10 border border-blue-400 rounded-2xl p-4">
            <div className="text-blue-300 font-bold mb-2">
              PIPE STATUS
            </div>

            <div className="text-slate-300 text-sm">
              Pressure increasing...
            </div>
          </div>
        </div>
      );
    }

    if (node === 'bathroom') {
      return (
        <div className="flex flex-col items-center text-center">
          <div className="text-8xl animate-pulse">🌊</div>

          <div className="mt-6 bg-yellow-500/10 border border-yellow-400 rounded-2xl p-4">
            <div className="text-yellow-300 font-bold mb-2">
              SITUATION
            </div>

            <div className="text-slate-300 text-sm">
              Multiple drains are now participating.
            </div>
          </div>
        </div>
      );
    }

    if (node === 'disaster') {
      return (
        <div className="flex flex-col items-center text-center">
          <div className="text-8xl animate-ping">💥</div>

          <div className="mt-6 bg-red-500/10 border border-red-400 rounded-2xl p-4">
            <div className="text-red-300 font-bold mb-2">
              HOUSE STATUS
            </div>

            <div className="text-slate-300 text-sm">
              Structural confidence declining rapidly.
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center text-center">
        <div className="text-8xl animate-pulse">
          {current.comic}
        </div>

        <div className="mt-6 bg-green-500/10 border border-green-400 rounded-2xl p-4">
          <div className="text-green-300 font-bold mb-2">
            EZ-FAST STATUS
          </div>

          <div className="text-slate-300 text-sm">
            Situation stabilized.
          </div>
        </div>
      </div>
    );
  };

  return (

    <div className={`min-h-screen bg-slate-950 text-white p-6 flex items-center justify-center ${shake ? 'animate-shake' : ''}`}>

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* MAIN STORY PANEL */}
        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 flex flex-col min-h-[700px]">

          {/* TITLE */}
          <h1 className="text-4xl font-black text-red-400 mb-6">
            {current.title}
          </h1>

          {/* RANDOM EVENT */}
          {event && (
            <div className="mb-5 bg-yellow-500/10 border border-yellow-400 rounded-2xl p-4 text-yellow-200">
              ⚠ {event}
            </div>
          )}

          {/* STORY */}
          <div className="text-slate-200 whitespace-pre-line leading-8 text-lg mb-6">
            {current.text}
          </div>

          {/* SPOUSE */}
          <div className="bg-purple-500/10 border border-purple-400 rounded-2xl p-4 mb-4">
            <div className="text-purple-300 font-bold mb-2">
              😬 SPOUSE REACTION
            </div>

            <div className="text-slate-300 text-sm">
              {current.spouse}
            </div>
          </div>

          {/* DOG */}
          <div className="bg-blue-500/10 border border-blue-400 rounded-2xl p-4 mb-6">
            <div className="text-blue-300 font-bold mb-2">
              🐶 DOG STATUS
            </div>

            <div className="text-slate-300 text-sm">
              {current.dog}
            </div>
          </div>

          {/* HUD */}
          <div className="grid grid-cols-4 gap-3 mb-8 text-center">

            <div className="bg-slate-800 rounded-2xl p-3">
              <div className="text-red-300 font-bold text-xl">
                {state.damage}
              </div>

              <div className="text-xs text-slate-400">
                DAMAGE
              </div>
            </div>

            <div className="bg-slate-800 rounded-2xl p-3">
              <div className="text-yellow-300 font-bold text-xl">
                {state.stress}
              </div>

              <div className="text-xs text-slate-400">
                STRESS
              </div>
            </div>

            <div className="bg-slate-800 rounded-2xl p-3">
              <div className="text-green-300 font-bold text-xl">
                ${Math.abs(state.wallet)}
              </div>

              <div className="text-xs text-slate-400">
                COST
              </div>
            </div>

            <div className="bg-slate-800 rounded-2xl p-3">
              <div className="text-purple-300 font-bold text-xl">
                {state.chaos}
              </div>

              <div className="text-xs text-slate-400">
                CHAOS
              </div>
            </div>

          </div>

          {/* PUSH EVERYTHING BELOW */}
          <div className="flex-grow"></div>

          {/* EZ-FAST RESPONSE BOTTOM */}
          {current.ending && (
            <div className="bg-green-500/10 border border-green-400 rounded-2xl p-5 mb-6">

              <div className="text-green-300 font-black mb-2">
                🛠️ EZ-FAST RESOLUTION
              </div>

              <div className="text-slate-200 leading-7">
                {ezFastResponse()}
              </div>

            </div>
          )}

          {/* BUTTONS ALWAYS BOTTOM */}
          {!current.ending ? (
            <div className="space-y-4">

              {current.choices.map((choice, i) => (
                <button
                  key={i}
                  onClick={() => choose(choice)}
                  className="w-full p-5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-2xl text-left font-bold text-lg transition-all duration-200 hover:scale-[1.01]"
                >
                  {choice.text}
                </button>
              ))}

            </div>
          ) : (
            <button
              onClick={reset}
              className="w-full p-5 bg-red-600 hover:bg-red-500 rounded-2xl font-black text-lg transition-all duration-200"
            >
              PLAY AGAIN
            </button>
          )}

        </div>

        {/* COMIC VISUAL PANEL */}
        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 flex items-center justify-center min-h-[700px]">

          <ComicPanel />

        </div>

      </div>
    </div>
  );
}