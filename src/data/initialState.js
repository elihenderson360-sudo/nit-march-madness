export const INITIAL_STATE = {
  entrant: { name: "", email: "", handle: "" },
  tiebreakers: {
    firstRound: "",
    secondRound: "",
    quarterfinals: "",
    semifinals: "",
    championship: "",
    total: ""
  },
  submittedAt: null,
  leftTop: {
    name: "Left Top",
    round1: [
      { id: "lt-1", teams: ["Auburn", "South Alabama"], winner: null },
      { id: "lt-2", teams: ["Seattle U", "St. Thomas (MN)"], winner: null },
      { id: "lt-3", teams: ["George Mason", "Liberty"], winner: null },
      { id: "lt-4", teams: ["Nevada", "Murray St."], winner: null }
    ],
    round2: [
      { id: "lt-r2-1", teams: [null, null], winner: null },
      { id: "lt-r2-2", teams: [null, null], winner: null }
    ],
    round3: [{ id: "lt-r3-1", teams: [null, null], winner: null }]
  },
  leftBottom: {
    name: "Left Bottom",
    round1: [
      { id: "lb-1", teams: ["Wake Forest", "Navy"], winner: null },
      { id: "lb-2", teams: ["Illinois St.", "Kent St."], winner: null },
      { id: "lb-3", teams: ["Yale", "UNCW"], winner: null },
      { id: "lb-4", teams: ["Dayton", "Bradley"], winner: null }
    ],
    round2: [
      { id: "lb-r2-1", teams: [null, null], winner: null },
      { id: "lb-r2-2", teams: [null, null], winner: null }
    ],
    round3: [{ id: "lb-r3-1", teams: [null, null], winner: null }]
  },
  rightTop: {
    name: "Right Top",
    round1: [
      { id: "rt-1", teams: ["New Mexico", "Sam Houston"], winner: null },
      { id: "rt-2", teams: ["Utah Valley", "George Washington"], winner: null },
      { id: "rt-3", teams: ["Colorado St.", "Saint Joseph's"], winner: null },
      { id: "rt-4", teams: ["California", "UIC"], winner: null }
    ],
    round2: [
      { id: "rt-r2-1", teams: [null, null], winner: null },
      { id: "rt-r2-2", teams: [null, null], winner: null }
    ],
    round3: [{ id: "rt-r3-1", teams: [null, null], winner: null }]
  },
  rightBottom: {
    name: "Right Bottom",
    round1: [
      { id: "rb-1", teams: ["Tulsa", "SFA"], winner: null },
      { id: "rb-2", teams: ["UC Irvine", "UNLV"], winner: null },
      { id: "rb-3", teams: ["Wichita St.", "Wyoming"], winner: null },
      { id: "rb-4", teams: ["Oklahoma St.", "Davidson"], winner: null }
    ],
    round2: [
      { id: "rb-r2-1", teams: [null, null], winner: null },
      { id: "rb-r2-2", teams: [null, null], winner: null }
    ],
    round3: [{ id: "rb-r3-1", teams: [null, null], winner: null }]
  },
  semifinals: [
    { id: "sf-1", teams: [null, null], winner: null },
    { id: "sf-2", teams: [null, null], winner: null }
  ],
  championship: { id: "final", teams: [null, null], winner: null }
};

