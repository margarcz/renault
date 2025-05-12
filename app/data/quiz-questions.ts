export type Question = {
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
  letterReveal?: string // Písmeno tajenky, které se odhalí po správné odpovědi
}

export type QuizData = {
  id: string
  name: string
  adult: Question[]
  children: Question[]
}

export const quizData: QuizData[] = [
  {
    id: "1",
    name: "Masarykovo náměstí v Jílovém u Prahy",
    adult: [
      {
        question:
          "Dům Mince, ve kterém do roku 1420 sídlil královský horní úřad, kam se deponovalo místní vytěžené zlato, je dnešní:",
        options: ["Radnice", "Regionální muzeum v Jílovém u Prahy", "Obecní dům"],
        correctAnswer: 1,
        explanation:
          "Dům Mince je dnes sídlem Regionálního muzea v Jílovém u Prahy, kde se můžete dozvědět více o historii těžby zlata v regionu.",
        letterReveal: "P",
      },
    ],
    children: [
      {
        question: "Gotický kostel ze 13. století, který je dominantou Masarykovo náměstí v Jílovém, je dnes zasvěcen:",
        options: ["Sv. Anně", "Sv. Prokopovi", "Sv. Vojtěchovi"],
        correctAnswer: 2,
        explanation: "Gotický kostel na náměstí je zasvěcen sv. Vojtěchovi a je významnou historickou památkou města.",
        letterReveal: "P",
      },
    ],
  },
  {
    id: "2",
    name: "U sv. Anny",
    adult: [
      {
        question:
          "Jak se jmenoval známý barokní malíř, který krátce působil v Jílovém jako těžař na kocourském žilném pásmu?",
        options: ["Petr Brandl", "Rembrandt", "Karel Škréta"],
        correctAnswer: 0,
        explanation:
          "Petr Brandl, významný český barokní malíř, krátce působil v Jílovém jako těžař na kocourském žilném pásmu.",
        letterReveal: "E",
      },
    ],
    children: [
      {
        question:
          "Svatá Anna, které je zasvěcena místní výklenková kaplička, je kromě ochránkyní matek, manželství, mlynářů, truhlářů, tkalců a krejčích, také patronkou",
        options: ["hasičů", "cestovatelů", "havířů"],
        correctAnswer: 2,
        explanation: "Svatá Anna je mimo jiné patronkou havířů (horníků).",
        letterReveal: "E",
      },
    ],
  },
  {
    id: "7",
    name: "Doly Šlojířského pásma",
    adult: [
      {
        question: "Jaký důl šlojířského zlatonosného pásma ze 14. století je nejvýznamnější?",
        options: ["Důl Rotlev", "Důl sv. Prokopa", "Důl sv. Anny"],
        correctAnswer: 0,
        explanation: "Důl Rotlev je nejvýznamnějším dolem šlojířského zlatonosného pásma ze 14. století.",
        letterReveal: "N",
      },
    ],
    children: [
      {
        question: "Jak se nazývá zařízení středověkého dolování znázorněné na obrázku?",
        options: ["rumpál", "žentour", "žernov"],
        correctAnswer: 1,
        explanation: "Na obrázku je znázorněn žentour, zařízení používané při středověkém dolování.",
        letterReveal: "N",
      },
    ],
  },
  {
    id: "6",
    name: "Vyhlídka Pepř",
    adult: [
      {
        question: "Při dobré viditelnosti lze z rozhledny spatřit i památnou horu s názvem:",
        options: ["Sněžka", "Říp", "Praděd"],
        correctAnswer: 1,
        explanation:
          "Z rozhledny lze při dobré viditelnosti spatřit horu Říp, která je významným symbolem české historie.",
        letterReveal: "O",
      },
    ],
    children: [
      {
        question: "Cesta od rozhledny do Jílového vede přes nejvýznamnější důlní pásmo s názvem",
        options: ["Josefské", "Rejské", "Šlojířské"],
        correctAnswer: 2,
        explanation:
          "Cesta od rozhledny do Jílového vede přes Šlojířské důlní pásmo, které je nejvýznamnější v této oblasti.",
        letterReveal: "O",
      },
    ],
  },
  {
    id: "5",
    name: "Důl Pepř s úpravnou",
    adult: [
      {
        question:
          "Na archivní fotografii je objekt, který byl nad dolem Pepř ve Studeném postaven v roce 1833, jak se nazýval?",
        options: ["Starý cech", "Nový cech", "Jílovský cech"],
        correctAnswer: 1,
        explanation: "Objekt postavený nad dolem Pepř ve Studeném v roce 1833 se nazýval Nový cech.",
        letterReveal: "M",
      },
    ],
    children: [
      {
        question: "K čemu sloužila tzv. úpravna?",
        options: ["úpravě hornického náčiní", "zpracování zlata", "šlo o šperkařskou dílnu"],
        correctAnswer: 1,
        explanation: "Úpravna sloužila ke zpracování zlata, které bylo vytěženo v dole.",
        letterReveal: "M",
      },
    ],
  },
  {
    id: "A",
    name: "Bejčkova strouha",
    adult: [
      {
        question: "Do jaké oblasti Jílového nás zavede cesta roklí od Bejčkovy strouhy?",
        options: ["Radlík", "Dolní Studené", "Kamenný Přívoz"],
        correctAnswer: 1,
        explanation: "Cesta roklí od Bejčkovy strouhy nás zavede do oblasti Dolní Studené.",
        letterReveal: "Í",
      },
    ],
    children: [
      {
        question: "Jak se nazývá důlní pásmo u Bejčkovy strouhy?",
        options: ["prokopské", "klobáské", "bludné"],
        correctAnswer: 1,
        explanation: "Důlní pásmo u Bejčkovy strouhy se nazývá klobáské.",
        letterReveal: "Í",
      },
    ],
  },
  {
    id: "B",
    name: "Žilníky klobáského pásma",
    adult: [
      {
        question: "Pramen u cesty je výtokem důlních vod z jaké štoly?",
        options: ["Halíře", "Sv. Prokopa", "Sv. Václava"],
        correctAnswer: 1,
        explanation: "Pramen u cesty je výtokem důlních vod ze štoly Sv. Prokopa.",
        letterReveal: "K",
      },
    ],
    children: [
      {
        question: "Jak se nazývá soustava hustých a většinou nepravidelných žil klobáského pásma?",
        options: ["žilník", "křemík", "žulík"],
        correctAnswer: 0,
        explanation: "Soustava hustých a většinou nepravidelných žil se nazývá žilník.",
        letterReveal: "K",
      },
    ],
  },
  {
    id: "C",
    name: "Štoly sv. Josefa a sv. Antonína Paduánského",
    adult: [
      {
        question:
          "Štoly jsou historickými pozůstatky po těžbě a zpracování zlata a obě jsou zpřístupněné návštěvníkům. Která z nich se u vstupu pyšní sochou světce?",
        options: ["Štola sv. Josefa", "Štola sv. Antonína Paduánského", "Štola Halíře"],
        correctAnswer: 1,
        explanation: "U vstupu do štoly sv. Antonína Paduánského se nachází socha tohoto světce.",
        letterReveal: "R",
      },
    ],
    children: [
      {
        question:
          "Jak se nazývá jeden z největších kamenných mostů ve střední Evropě, který se tyčí nedaleko štol? Stejně se nazývá pomístní název u Sázavy.",
        options: ["Kandík", "Pacifik", "Žampach"],
        correctAnswer: 2,
        explanation:
          "Nedaleko štol se tyčí kamenný most Žampach, který je jedním z největších kamenných mostů ve střední Evropě. Stejný název nese i pomístní název u řeky Sázavy.",
        letterReveal: "R",
      },
    ],
  },
]
