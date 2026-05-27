import React from 'react';

export default function OhCrapGame() {

  // =========================
  // SOUND ENGINE V6
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
  // RANDOM STARTS
  // =========================
  const startScenarios = [
    'toiletStart',
    'kitchenStart',
    'waterHeaterStart',
    'laundryStart'
  ];

  const getRandomStart = () => {
    return startScenarios[
      Math.floor(Math.random() * startScenarios.length)
    ];
  };

  // =========================
  // RANDOM SPOUSE PERSONALITY
  // =========================
  const spouseTypes = [
    'silently judging you',
    'already pricing contractors',
    'opening Zillow again',
    'documenting everything for insurance',
    'questioning your confidence level',
    'deeply unimpressed'
  ];

  const randomSpouseMood =
    spouseTypes[
      Math.floor(Math.random() * spouseTypes.length)
    ];

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

  const [node, setNode] = React.useState(getRandomStart());
  const [event, setEvent] = React.useState('');
  const [shake, setShake] = React.useState(false);
  const [flash, setFlash] = React.useState(false);

  // =========================
  // RANDOM EVENTS
  // =========================
  const randomEvents = [
    "Your neighbor texts: 'Everything okay over there?'",
    "The dog suddenly leaves the room at high speed.",
    "Something inside the wall makes a deeply concerning noise.",
    "Your spouse quietly opens Zillow.",
    "A pipe makes a sound like a submarine hull failing.",
    "You smell something expensive.",
    "The floor develops a suspicious squish.",
    "The lights flicker for emotional effect.",
    "You hear water where water should not exist."
  ];

  const triggerEvent = () => {
    if (Math.random() < 0.45) {
      setEvent(
        randomEvents[
          Math.floor(Math.random() * randomEvents.length)
        ]
      );
    } else {
      setEvent('');
    }
  };

  // =========================
  // AI NARRATOR
  // =========================
  const narratorCommentary = () => {

    if (state.chaos > 120) {
      return "The house is now making sounds normally associated with submarines.";
    }

    if (state.mistakes >= 4) {
      return "Your confidence continues to exceed your plumbing qualifications.";
    }

    if (state.damage > 70) {
      return "Structural integrity is becoming more of a suggestion.";
    }

    if (state.chaos < 30) {
      return "This situation is still technically recoverable.";
    }

    return "The plumbing system remains deeply unconvinced by your strategy.";
  };

  // =========================
  // EZ-FAST AI RESPONSE ENGINE
  // =========================
  const ezFastResponse = () => {

    const responses = [
      "EZ-FAST arrives, surveys the scene, and nods with the exhaustion of someone who has seen this exact confidence before.",

      "The technician fixes the issue in 18 minutes and politely avoids asking why you touched the cleanout pipe.",

      "EZ-FAST restores order while your spouse watches silently like this is a courtroom proceeding.",

      "The technician immediately identifies the issue and says: 'Ah. A classic DIY escalation event.'",

      "EZ-FAST stabilizes the system before the house can evolve into an indoor water park.",

      "The plumber walks in, takes one look, and says: 'Well... at least you stopped eventually.'",

      "A senior technician restores normal water pressure while your dog finally exits witness protection."
    ];

    return responses[
      Math.floor(Math.random() * responses.length)
    ];
  };

  // =========================
  // STORY ENGINE
  // =========================
  const story = {

    toiletStart: {
      title: "OH CRAP! — Toilet Overflow",
      comic: "🚽",

      spouse: `Your spouse is ${randomSpouseMood}.`,

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

    kitchenStart: {
      title: "OH CRAP! — Kitchen Sink Disaster",
      comic: "🍽️",

      spouse: `Your spouse is ${randomSpouseMood}.`,

      dog: "The dog watches the disposal with deep suspicion.",

      text: `
You turn on the garbage disposal.

It immediately makes a sound like a motorcycle crashing into cookware.

The sink backs up instantly.

Something black and horrifying floats upward from the drain.
      `,

      choices: [
        {
          text: "Call EZ-FAST Plumbing",
          next: "goodEnding",
          damage: -10,
          stress: -10,
          wallet: -280
        },

        {
          text: "Reach into disposal like a maniac",
          next: "kitchenDisaster",
          damage: 20,
          stress: 25,
          wallet: -40
        }
      ]
    },

    waterHeaterStart: {
      title: "OH CRAP! — Water Heater Leak",
      comic: "🔥",

      spouse: `Your spouse is ${randomSpouseMood}.`,

      dog: "The dog refuses to enter the garage.",

      text: `
You hear a faint hissing sound in the garage.

The water heater is leaking slowly from the bottom.

A puddle spreads outward with unsettling confidence.

The metal tank makes a noise like it's planning something violent.
      `,

      choices: [
        {
          text: "Call EZ-FAST Plumbing",
          next: "goodEnding",
          damage: -10,
          stress: -12,
          wallet: -320
        },

        {
          text: "Tap random valves confidently",
          next: "heaterDisaster",
          damage: 25,
          stress: 20,
          wallet: -20
        }
      ]
    },

    laundryStart: {
      title: "OH CRAP! — Laundry Room Flood",
      comic: "🧺",

      spouse: `Your spouse is ${randomSpouseMood}.`,

      dog: "The dog refuses to step onto the wet floor and now judges you from afar.",

      text: `
You start a load of laundry.

Ten minutes later, you hear splashing.

The washing machine has apparently decided to reject modern civilization.

Water pours across the floor toward the hallway.
      `,

      choices: [
        {
          text: "Call EZ-FAST Plumbing",
          next: "goodEnding",
          damage: -8,
          stress: -10,
          wallet: -260
        },

        {
          text: "Attempt emergency towel engineering",
          next: "laundryDisaster",
          damage: 20,
          stress: 25,
          wallet: -35
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

    kitchenDisaster: {
      title: "Kitchen Escalation Event",
      comic: "🧼",

      spouse: "Your spouse has stopped offering suggestions and started recording evidence.",

      dog: "The dog retreats behind the couch.",

      text: `
You attempt several increasingly questionable fixes.

The disposal growls.

The dishwasher starts draining into the sink.

You now appear to be fighting the kitchen itself.
      `,

      choices: [
        {
          text: "Call EZ-FAST Plumbing immediately",
          next: "rescueEnding",
          damage: -5,
          stress: -10,
          wallet: -450
        },

        {
          text: "Continue YouTube-certified repair strategy",
          next: "disaster",
          damage: 35,
          stress: 30,
          wallet: -150
        }
      ]
    },

    heaterDisaster: {
      title: "Boiler Confidence Event",
      comic: "💦",

      spouse: "Your spouse asks if shutting off the house water might have been step one.",

      dog: "The dog now sits outside the garage monitoring you from a safe distance.",

      text: `
You adjust several valves with increasing confidence.

This confidence is not supported by engineering.

The leak becomes more aggressive.

Steam appears.

Nothing about this feels legal anymore.
      `,

      choices: [
        {
          text: "Call EZ-FAST before this becomes newsworthy",
          next: "lateEnding",
          damage: 5,
          stress: -5,
          wallet: -700
        },

        {
          text: "Keep adjusting random valves",
          next: "badEnding",
          damage: 60,
          stress: 60,
          wallet: -2400
        }
      ]
    },

    laundryDisaster: {
      title: "Laundry System Collapse",
      comic: "🌊",

      spouse: "Your spouse says: 'Please stop helping.'",

      dog: "The dog has relocated upstairs and refuses eye contact.",

      text: `
You attempt to stop the leak using towels, optimism, and panic.

The drain overflows.

The machine vibrates violently.

You are now essentially losing a fight against socks and water.
      `,

      choices: [
        {
          text: "Call EZ-FAST and surrender",
          next: "rescueEnding",
          damage: -5,
          stress: -8,
          wallet: -500
        },

        {
          text: "Keep troubleshooting emotionally",
          next: "disaster",
          damage: 40,
          stress: 35,
          wallet: -220
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
  // ACHIEVEMENTS
  // =========================
  const achievements = [];

  if (state.mistakes >= 3) {
    achievements.push("🧠 DIY Confidence Expert");
  }

  if (state.wallet <= -2000) {
    achievements.push("💸 Financial Catastrophe");
  }

  if (state.chaos >= 120) {
    achievements.push("🌊 Indoor Water Park Creator");
  }

  // =========================
  // CHOICE ENGINE
  // =========================
  const choose = (choice) => {

    play('click');
    triggerEvent();

    if (choice.damage >= 30) {

      setShake(true);
      setFlash(true);

      play('disaster');

      setTimeout(() => {
        setShake(false);
      }, 500);

      setTimeout(() => {
        setFlash(false);
      }, 300);
    }

    if (choice.next.includes("Ending")) {
      play('success');
    }

    setState(prev => ({
      chaos: prev.chaos + choice.damage + choice.stress,
      stress: prev.stress + choice.stress,
      damage: prev.damage + choice.damage,
      wallet: prev.wallet + choice.wallet,

      mistakes:
        prev.mistakes +
        (
          choice.text.toLowerCase().includes("diy") ||
          choice.text.toLowerCase().includes("keep") ||
          choice.text.toLowerCase().includes("random") ||
          choice.text.toLowerCase().includes("towel")
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

    setNode(getRandomStart());
    setEvent('');
  };

  // =========================
  // COMIC PANEL
  // =========================
  const ComicPanel = () => {

    return (
      <div className="flex flex-col items-center justify-center text-center w-full">

        <div className="relative mb-8">

          <div className="absolute inset-0 blur-3xl opacity-30 bg-cyan-400 rounded-full animate-pulse"></div>

          <div className="relative text-[10rem] floating">
            {current.comic}
          </div>

        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 w-full max-w-md">

          <div className="text-cyan-300 font-black mb-3 text-lg">
            SYSTEM STATUS
          </div>

          <div className="text-slate-300 leading-7">
            {narratorCommentary()}
          </div>

        </div>

      </div>
    );
  };

  return (

    <div className={`min-h-screen bg-slate-950 text-white p-6 flex items-center justify-center overflow-hidden ${shake ? 'animate-shake' : ''}`}>

      {/* FLASH EFFECT */}
      {flash && (
        <div className="fixed inset-0 bg-red-500/20 pointer-events-none z-50 animate-pulse"></div>
      )}

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* MAIN PANEL */}
        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 flex flex-col min-h-[760px]">

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

          {/* CHAOS BAR */}
          <div className="mb-8">

            <div className="flex justify-between text-sm mb-2">

              <span className="text-red-300 font-bold">
                CHAOS LEVEL
              </span>

              <span className="text-slate-400">
                {state.chaos}%
              </span>

            </div>

            <div className="w-full h-5 bg-slate-800 rounded-full overflow-hidden">

              <div
                className={`h-full transition-all duration-700
                  ${state.chaos < 40 ? 'bg-green-500' : ''}
                  ${state.chaos >= 40 && state.chaos < 90 ? 'bg-yellow-500' : ''}
                  ${state.chaos >= 90 ? 'bg-red-500 animate-pulse' : ''}
                `}
                style={{
                  width: `${Math.min(state.chaos, 100)}%`
                }}
              />

            </div>

          </div>

          {/* AI NARRATOR */}
          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 mb-6">

            <div className="text-cyan-300 font-bold mb-2">
              🤖 AI NARRATOR
            </div>

            <div className="text-slate-300 text-sm italic">
              {narratorCommentary()}
            </div>

          </div>

          <div className="flex-grow"></div>

          {/* ENDING */}
          {current.ending && (

            <>
              <div className="bg-green-500/10 border border-green-400 rounded-2xl p-5 mb-6">

                <div className="text-green-300 font-black mb-2">
                  🛠️ EZ-FAST RESOLUTION
                </div>

                <div className="text-slate-200 leading-7">
                  {ezFastResponse()}
                </div>

              </div>

              {achievements.length > 0 && (

                <div className="bg-yellow-500/10 border border-yellow-400 rounded-2xl p-5 mb-6">

                  <div className="text-yellow-300 font-black mb-3">
                    🏆 ACHIEVEMENTS
                  </div>

                  <div className="space-y-2">

                    {achievements.map((a, i) => (
                      <div
                        key={i}
                        className="bg-slate-800 rounded-xl p-3"
                      >
                        {a}
                      </div>
                    ))}

                  </div>

                </div>
              )}

            </>
          )}

          {/* BUTTONS */}
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

        {/* COMIC PANEL */}
        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 flex items-center justify-center min-h-[760px]">

          <ComicPanel />

        </div>

      </div>

    </div>
  );
}