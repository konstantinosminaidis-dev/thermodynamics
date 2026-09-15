export type Choice = { id: string; text: string };

export type McItem = {
  kind: "mc";
  prompt: string;
  options: Choice[];
  answer: string;
  explain: string;
};

export type TfItem = {
  kind: "tf";
  prompt: string;
  answer: boolean;
  explain: string;
};

export type MatchItem = {
  kind: "match";
  prompt: string;
  left: Choice[];
  right: Choice[];
  pairs: Record<string, string>;
  explain: string;
};

export type BlankItem = {
  kind: "blank";
  prompt: string;
  textBefore: string[];
  answers: string[];
  bank: string[];
  explain: string;
};

export type CalcItem = {
  kind: "calc";
  prompt: string;
  formula: string;
  answer: number;
  unit: string;
  tolerance?: number;
  hint: string;
  explain: string;
};

export type Item = McItem | TfItem | MatchItem | BlankItem | CalcItem;

export type ExerciseKind = "mc" | "tf" | "match" | "blank" | "calc";

export type Exercise = {
  id: string;
  group: "units" | "energy" | "systems" | "calc";
  kind: ExerciseKind;
  code: string;
  title: string;
  units: number;
  theory: string;
  stem?: string;
  givens?: { label: string; value: string }[];
  items: Item[];
};

export const GROUPS: { id: Exercise["group"]; title: string; blurb: string }[] = [
  { id: "units", title: "Μονάδες SI", blurb: "Πολλαπλή επιλογή, αντιστοίχιση και κενά." },
  { id: "energy", title: "Μορφές ενέργειας", blurb: "Τι είναι έργο, θερμότητα, εσωτερική, κινητική, δυναμική." },
  { id: "systems", title: "Συστήματα", blurb: "Κλειστά, ανοικτά, μονωμένα, αδιαβατικά, ισορροπία." },
  { id: "calc", title: "Υπολογιστικά", blurb: "Έργο, ισχύς, ταχύτητα — βήμα-βήμα στον πίνακα." },
];

export const EXERCISES: Exercise[] = [
  {
    id: "mc-si-1",
    group: "units",
    kind: "mc",
    code: "Θέμα 2ο · 2.1",
    title: "Πίεση, SI και ισχύς",
    units: 9,
    theory: "monades",
    items: [
      {
        kind: "mc",
        prompt: "Η πίεση P μετριέται σε:",
        options: [
          { id: "a", text: "m/s" },
          { id: "b", text: "PS" },
          { id: "c", text: "Joule" },
          { id: "d", text: "bar" },
        ],
        answer: "d",
        explain: "Η πίεση στο SI είναι Pa (N/m²). Στην πράξη χρησιμοποιούμε και το bar. Τα m/s είναι ταχύτητα, το PS ίπποι, το Joule ενέργεια.",
      },
      {
        kind: "mc",
        prompt: "Ποια από τις παρακάτω μονάδες δεν είναι μονάδα του Διεθνούς Συστήματος (SI);",
        options: [
          { id: "a", text: "Joule" },
          { id: "b", text: "Kelvin" },
          { id: "c", text: "Kcal" },
          { id: "d", text: "m³" },
        ],
        answer: "c",
        explain: "Η χιλιοθερμίδα (kcal) είναι καταργημένη. 1 cal = 4,186 J. Joule, Kelvin και m³ ανήκουν στο SI.",
      },
      {
        kind: "mc",
        prompt: "Μονάδα μέτρησης της ισχύος είναι:",
        options: [
          { id: "a", text: "kg" },
          { id: "b", text: "Watt" },
          { id: "c", text: "Pascal" },
          { id: "d", text: "Kelvin" },
        ],
        answer: "b",
        explain: "Ισχύς = έργο / χρόνος. Μονάδα SI: 1 W = 1 J/s.",
      },
    ],
  },
  {
    id: "match-si-base",
    group: "units",
    kind: "match",
    code: "Θέμα 2ο · 2.1α",
    title: "Βασικά μεγέθη και μονάδες",
    units: 4,
    theory: "monades",
    stem: "Αντιστοίχισε κάθε μέγεθος με τη μονάδα του στο SI. Δύο γράμματα θα περισσέψουν.",
    items: [
      {
        kind: "match",
        prompt: "Μέγεθος → μονάδα SI",
        left: [
          { id: "1", text: "Μήκος" },
          { id: "2", text: "Μάζα" },
          { id: "3", text: "Χρόνος" },
          { id: "4", text: "Ηλεκτρικό ρεύμα" },
        ],
        right: [
          { id: "a", text: "Μέτρο" },
          { id: "b", text: "Λεπτό" },
          { id: "c", text: "Αμπέρ" },
          { id: "d", text: "Χιλιόγραμμο" },
          { id: "e", text: "Γραμμάριο" },
          { id: "f", text: "δευτερόλεπτο" },
        ],
        pairs: { "1": "a", "2": "d", "3": "f", "4": "c" },
        explain: "SI: μήκος → m, μάζα → kg (όχι g), χρόνος → s (όχι min), ρεύμα → A.",
      },
    ],
  },
  {
    id: "match-prefixes",
    group: "units",
    kind: "match",
    code: "Θέμα 2ο · 2.1β",
    title: "Πολλαπλάσια και υποπολλαπλάσια",
    units: 5,
    theory: "monades",
    stem: "Αντιστοίχισε το σύμβολο με τη δύναμη του 10. Ένα γράμμα θα περισσέψει.",
    items: [
      {
        kind: "match",
        prompt: "Σύμβολο → δύναμη του 10",
        left: [
          { id: "1", text: "K" },
          { id: "2", text: "M" },
          { id: "3", text: "d" },
          { id: "4", text: "c" },
          { id: "5", text: "m" },
        ],
        right: [
          { id: "a", text: "10⁻¹" },
          { id: "b", text: "10³" },
          { id: "c", text: "10⁻²" },
          { id: "d", text: "10⁹" },
          { id: "e", text: "10⁻³" },
          { id: "f", text: "10⁶" },
        ],
        pairs: { "1": "b", "2": "f", "3": "a", "4": "c", "5": "e" },
        explain: "k/K = 10³, M = 10⁶, d = 10⁻¹, c = 10⁻², m = 10⁻³. Το 10⁹ (G) περισσεύει.",
      },
    ],
  },
  {
    id: "fill-pressure",
    group: "units",
    kind: "blank",
    code: "Θέμα 2ο · 2.2",
    title: "Pa και bar",
    units: 16,
    theory: "monades",
    stem: "Δίνονται οι μονάδες Pa και bar.",
    items: [
      {
        kind: "blank",
        prompt: "Συμπλήρωσε τα κενά.",
        textBefore: [
          "Οι μονάδες αυτές μετρούν το μέγεθος ",
          ". Η μονάδα του S.I. είναι το ",
          ". Η σχέση που τις συνδέει είναι ",
          ".",
        ],
        answers: ["πίεση", "Pa", "1 bar = 10⁵ Pa"],
        bank: ["πίεση", "ενέργεια", "ισχύς", "Pa", "bar", "N", "1 bar = 10⁵ Pa", "1 Pa = 10⁵ bar"],
        explain: "Pa και bar μετρούν πίεση. SI μονάδα: Pa. 1 bar = 10⁵ Pa = 10⁵ N/m².",
      },
      {
        kind: "mc",
        prompt: "Ποιο είναι το κύριο πλεονέκτημα της χρήσης της μονάδας bar;",
        options: [
          { id: "a", text: "Είναι η βασική μονάδα πίεσης του SI." },
          { id: "b", text: "Η τιμή της είναι περίπου ίση με την ατμοσφαιρική πίεση." },
          { id: "c", text: "Είναι μικρότερη από το Pascal, άρα πιο ακριβής." },
        ],
        answer: "b",
        explain: "1 bar ≈ 1 atm (ακριβώς 1 atm = 1,01325 bar). Γι’ αυτό είναι πρακτική μονάδα.",
      },
    ],
  },
  {
    id: "mc-si-2",
    group: "units",
    kind: "mc",
    code: "Θέμα 2ο · 2.1",
    title: "Ταχύτητα, Νιούτον, ειδικός όγκος",
    units: 9,
    theory: "monades",
    items: [
      {
        kind: "mc",
        prompt: "Η μονάδα μέτρησης της ταχύτητας στο S.I είναι:",
        options: [
          { id: "a", text: "m/s" },
          { id: "b", text: "m/s²" },
          { id: "c", text: "N·m" },
          { id: "d", text: "km/h" },
        ],
        answer: "a",
        explain: "Ταχύτητα = μήκος / χρόνος → m/s. Το m/s² είναι επιτάχυνση, το N·m είναι Joule, το km/h δεν είναι SI.",
      },
      {
        kind: "mc",
        prompt: "Το N (Νιούτον), το οποίο είναι σύνθετη μονάδα, ισούται με:",
        options: [
          { id: "a", text: "kg/s²" },
          { id: "b", text: "kg·m" },
          { id: "c", text: "J/s" },
          { id: "d", text: "kg·m/s²" },
        ],
        answer: "d",
        explain: "Από F = m·a: 1 N = 1 kg · 1 m/s². Το J/s είναι Watt.",
      },
      {
        kind: "mc",
        prompt: "Η μονάδα μέτρησης του ειδικού όγκου (ν) στο S.I είναι:",
        options: [
          { id: "a", text: "kg/m³" },
          { id: "b", text: "N·m" },
          { id: "c", text: "m³/kg" },
          { id: "d", text: "m³/N" },
        ],
        answer: "c",
        explain: "Ειδικός όγκος = όγκος / μάζα → m³/kg. Το kg/m³ είναι πυκνότητα (το αντίστροφο).",
      },
    ],
  },
  {
    id: "match-quantities",
    group: "units",
    kind: "match",
    code: "Θέμα 2ο · 2.2",
    title: "Μεγέθη και μονάδες",
    units: 12,
    theory: "monades",
    stem: "Αντιστοίχισε κάθε μέγεθος με τη μονάδα του. Ένα γράμμα θα περισσέψει.",
    items: [
      {
        kind: "match",
        prompt: "Μέγεθος → μονάδα",
        left: [
          { id: "1", text: "Ισχύς" },
          { id: "2", text: "Πίεση" },
          { id: "3", text: "Δύναμη" },
          { id: "4", text: "Έργο" },
        ],
        right: [
          { id: "a", text: "K (Κέλβιν)" },
          { id: "b", text: "N (Νιούτον)" },
          { id: "c", text: "W (Βατ)" },
          { id: "d", text: "Pa (Πασκάλ)" },
          { id: "e", text: "J (Τζάουλ)" },
        ],
        pairs: { "1": "c", "2": "d", "3": "b", "4": "e" },
        explain: "Ισχύς W, πίεση Pa, δύναμη N, έργο J. Το K (θερμοκρασία) περισσεύει.",
      },
    ],
  },
  {
    id: "fill-derived",
    group: "units",
    kind: "blank",
    code: "Θέμα 2ο · 2.3",
    title: "Παράγωγα μεγέθη",
    units: 4,
    theory: "monades",
    stem: "Η ταχύτητα και ο όγκος είναι παράγωγα μεγέθη. Συμπλήρωσε με ποια βασικά μεγέθη συνδέονται.",
    items: [
      {
        kind: "blank",
        prompt: "Σχέσεις παραγώγων μεγεθών",
        textBefore: [
          "ταχύτητα = ",
          " / ",
          "    ·    όγκος = ",
          " × ",
          " × ",
          "",
        ],
        answers: ["μήκος", "χρόνος", "μήκος", "μήκος", "μήκος"],
        bank: ["μήκος", "χρόνος", "μάζα", "θερμοκρασία"],
        explain: "Ταχύτητα = μήκος / χρόνος (m/s). Όγκος = μήκος × μήκος × μήκος (m³).",
      },
    ],
  },
  {
    id: "match-energy-1",
    group: "energy",
    kind: "match",
    code: "Θέμα 2ο · 2.2",
    title: "Ενέργεια, θερμότητα, έργο",
    units: 16,
    theory: "monades",
    stem: "Αντιστοίχισε κάθε μορφή με τον ορισμό της.",
    items: [
      {
        kind: "match",
        prompt: "Μορφή ενέργειας → ορισμός",
        left: [
          { id: "1", text: "Δυναμική ενέργεια" },
          { id: "2", text: "Εσωτερική ενέργεια" },
          { id: "3", text: "Θερμότητα" },
          { id: "4", text: "Έργο" },
        ],
        right: [
          { id: "a", text: "ενέργεια σε μεταφορά όπου η διαφορά θερμοκρασίας δεν εμπλέκεται άμεσα" },
          { id: "b", text: "ενέργεια σε μεταφορά εξαιτίας της διαφοράς θερμοκρασίας" },
          { id: "c", text: "αποθηκευμένη ενέργεια που οφείλεται στην κίνηση των ατόμων και μορίων" },
          { id: "d", text: "ενέργεια λόγω ύψους" },
        ],
        pairs: { "1": "d", "2": "c", "3": "b", "4": "a" },
        explain: "Δυναμική → ύψος. Εσωτερική → κίνηση ατόμων/μορίων. Θερμότητα → μεταφορά λόγω ΔΤ. Έργο → μεταφορά χωρίς ΔΤ.",
      },
    ],
  },
  {
    id: "match-energy-2",
    group: "energy",
    kind: "match",
    code: "Θέμα 2ο · 2.2",
    title: "Τέσσερις μορφές ενέργειας",
    units: 16,
    theory: "monades",
    stem: "Αντιστοίχισε μορφή και περιγραφή.",
    items: [
      {
        kind: "match",
        prompt: "Μορφή → περιγραφή",
        left: [
          { id: "1", text: "Εσωτερική ενέργεια" },
          { id: "2", text: "Δυναμική ενέργεια" },
          { id: "3", text: "Κινητική ενέργεια" },
          { id: "4", text: "Θερμότητα" },
        ],
        right: [
          { id: "a", text: "ενέργεια που μεταφέρεται εξαιτίας της διαφοράς θερμοκρασίας" },
          { id: "b", text: "η ενέργεια που έχει ένα ρευστό που βρίσκεται σε κίνηση" },
          { id: "c", text: "αποθηκευμένη ενέργεια λόγω κίνησης ατόμων και μορίων" },
          { id: "d", text: "ενέργεια λόγω του ύψους ως προς επίπεδο αναφοράς" },
        ],
        pairs: { "1": "c", "2": "d", "3": "b", "4": "a" },
        explain: "Εσωτερική αποθηκεύεται στη δομή. Δυναμική από ύψος (mgZ). Κινητική από κίνηση (V²/2). Θερμότητα είναι μεταφορά, όχι αποθήκη.",
      },
    ],
  },
  {
    id: "tf-systems-1",
    group: "systems",
    kind: "tf",
    code: "Θέμα 2ο · 2.1",
    title: "Ανοικτά, αδιαβατικά, μονωμένα",
    units: 9,
    theory: "systima",
    items: [
      {
        kind: "tf",
        prompt:
          "Τα ανοικτά συστήματα περιορίζονται από επιφάνειες που δεν επιτρέπουν τη μεταφορά μάζας από το σύστημα προς το περιβάλλον και αντίστροφα.",
        answer: false,
        explain: "Αυτός είναι ο ορισμός των κλειστών συστημάτων. Τα ανοικτά επιτρέπουν μεταφορά μάζας.",
      },
      {
        kind: "tf",
        prompt:
          "Ένα σύστημα που επιτρέπει την εναλλαγή θερμικής ενέργειας με το περιβάλλον του ονομάζεται αδιαβατικό.",
        answer: false,
        explain: "Αδιαβατικό είναι ό,τι ΔΕΝ ανταλλάσσει θερμότητα. Αυτό που ανταλλάσσει είναι μη αδιαβατικό.",
      },
      {
        kind: "tf",
        prompt:
          "Μονωμένο ονομάζεται το κλειστό σύστημα στο οποίο δεν υπάρχει καμία εναλλαγή ενέργειας, σε οποιαδήποτε μορφή, με το περιβάλλον.",
        answer: true,
        explain: "Σωστό. Στο μονωμένο ισχύει E = σταθ.",
      },
    ],
  },
  {
    id: "fill-system",
    group: "systems",
    kind: "blank",
    code: "Θέμα 2ο · 2.1",
    title: "Όριο και μονωμένο σύστημα",
    units: 16,
    theory: "systima",
    stem: "Τρεις λέξεις θα περισσέψουν.",
    items: [
      {
        kind: "blank",
        prompt: "Συμπλήρωσε την παράγραφο.",
        textBefore: [
          "Το σύστημα καταλαμβάνει έναν ορισμένο όγκο, ο οποίος περιορίζεται από μια επιφάνεια κλειστή που ονομάζεται ",
          ". Το ",
          " που δεν επιτρέπει την εναλλαγή ενέργειας με το ",
          " του, ονομάζεται ",
          ".",
        ],
        answers: ["όριο συστήματος", "κλειστό σύστημα", "περιβάλλον", "μονωμένο σύστημα"],
        bank: [
          "κλειστό σύστημα",
          "περιβάλλον",
          "αδιαβατικό σύστημα",
          "ανοικτό σύστημα",
          "όριο συστήματος",
          "σύστημα",
          "μονωμένο σύστημα",
        ],
        explain:
          "Όριο συστήματος είναι η κλειστή επιφάνεια. Μονωμένο είναι το κλειστό σύστημα χωρίς καμία εναλλαγή ενέργειας με το περιβάλλον.",
      },
    ],
  },
  {
    id: "tf-systems-2",
    group: "systems",
    kind: "tf",
    code: "Θέμα 2ο · 2.2",
    title: "Αδιαβατικά, μάζα, ισορροπία",
    units: 9,
    theory: "isorropia",
    items: [
      {
        kind: "tf",
        prompt:
          "Τα συστήματα που επιτρέπουν την εναλλαγή θερμικής ενέργειας με το περιβάλλον τους ονομάζονται αδιαβατικά.",
        answer: false,
        explain: "Λάθος. Αδιαβατικά είναι όσα δεν επιτρέπουν εναλλαγή θερμότητας.",
      },
      {
        kind: "tf",
        prompt: "Στα κλειστά συστήματα δεν επιτρέπεται η μεταφορά μάζας και ισχύει m = σταθ.",
        answer: true,
        explain: "Σωστός ορισμός κλειστού συστήματος. Ο όγκος μπορεί να μεταβάλλεται.",
      },
      {
        kind: "tf",
        prompt: "Για να είναι ένα σύστημα σε θερμοδυναμική ισορροπία αρκεί να είναι σε θερμική ισορροπία.",
        answer: false,
        explain: "Χρειάζονται και οι τρεις: θερμική, μηχανική και χημική ισορροπία.",
      },
    ],
  },
  {
    id: "calc-vehicle",
    group: "calc",
    kind: "calc",
    code: "Θέμα 4ο",
    title: "Όχημα σε επιτάχυνση",
    units: 25,
    theory: "monades",
    stem: "Ένα όχημα μάζας 2000 kg ξεκινά από την ηρεμία και κινείται με σταθερή επιτάχυνση μέχρι να αποκτήσει ταχύτητα 90 km/h σε χρόνο 12 s.",
    givens: [
      { label: "m", value: "2000 kg" },
      { label: "u₀", value: "0" },
      { label: "u", value: "90 km/h" },
      { label: "t", value: "12 s" },
    ],
    items: [
      {
        kind: "calc",
        prompt: "Υπολογίστε την τελική ταχύτητα σε m/s.",
        formula: "v = 90 · (1000 / 3600)",
        answer: 25,
        unit: "m/s",
        hint: "1 km/h = 1000 m / 3600 s = 1/3,6 m/s.",
        explain: "90 / 3,6 = 25 m/s.",
      },
      {
        kind: "calc",
        prompt: "Υπολογίστε το έργο επιτάχυνσης.",
        formula: "W = ΔΕₖ = ½ m v²",
        answer: 625000,
        unit: "J",
        hint: "Από ηρεμία, το έργο ισούται με την κινητική ενέργεια που αποκτά το όχημα.",
        explain: "W = ½ · 2000 · 25² = 1000 · 625 = 625 000 J.",
      },
      {
        kind: "calc",
        prompt: "Υπολογίστε την ισχύ που απαιτείται.",
        formula: "P = W / t",
        answer: 52083,
        unit: "W",
        tolerance: 0.01,
        hint: "Ισχύς είναι έργο στη μονάδα του χρόνου.",
        explain: "P = 625 000 / 12 ≈ 52 083 W (ή 52,08 kW).",
      },
    ],
  },
  {
    id: "calc-lift",
    group: "calc",
    kind: "calc",
    code: "Θέμα 4ο",
    title: "Μηχανή ανύψωσης",
    units: 25,
    theory: "monades",
    stem: "Μια μηχανή ανύψωσης ανυψώνει σώμα μάζας m = 100 kg σε ύψος h = 20 m σε χρόνο t = 20 s. Δίνεται g = 10 m/s².",
    givens: [
      { label: "m", value: "100 kg" },
      { label: "h", value: "20 m" },
      { label: "t", value: "20 s" },
      { label: "g", value: "10 m/s²" },
    ],
    items: [
      {
        kind: "calc",
        prompt: "Να υπολογίσετε το βάρος G του σώματος.",
        formula: "G = m g",
        answer: 1000,
        unit: "N",
        hint: "Βάρος είναι δύναμη: μάζα επί επιτάχυνση βαρύτητας.",
        explain: "G = 100 · 10 = 1000 N.",
      },
      {
        kind: "calc",
        prompt: "Να υπολογίσετε το έργο W που παράγει η μηχανή.",
        formula: "W = G · h = m g h",
        answer: 20000,
        unit: "J",
        hint: "Το έργο ανύψωσης ισούται με την αύξηση δυναμικής ενέργειας.",
        explain: "W = 1000 · 20 = 20 000 J.",
      },
      {
        kind: "calc",
        prompt: "Να υπολογίσετε την ισχύ P της μηχανής ανύψωσης.",
        formula: "P = W / t",
        answer: 1000,
        unit: "W",
        hint: "Ισχύς = έργο / χρόνος.",
        explain: "P = 20 000 / 20 = 1000 W.",
      },
    ],
  },
];

export function getExercise(id: string) {
  return EXERCISES.find((e) => e.id === id);
}

export function adjacentExercises(id: string) {
  const i = EXERCISES.findIndex((e) => e.id === id);
  return {
    prev: i > 0 ? EXERCISES[i - 1] : undefined,
    next: i >= 0 && i < EXERCISES.length - 1 ? EXERCISES[i + 1] : undefined,
  };
}

export const KIND_LABEL: Record<ExerciseKind, string> = {
  mc: "Πολλαπλή επιλογή",
  tf: "Σωστό / Λάθος",
  match: "Αντιστοίχιση",
  blank: "Συμπλήρωση κενού",
  calc: "Υπολογισμός",
};
