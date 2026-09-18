// Survival Italian content. Each phrase: { id, it, en, cat, note? }
// Conversations: { id, title, where, lines: [{ who, it, en }] }

const CATEGORIES = [
  { id: "basics", name: "Politeness & basics", emoji: "👋" },
  { id: "bar", name: "Bar & coffee", emoji: "☕" },
  { id: "restaurant", name: "Restaurant", emoji: "🍝" },
  { id: "questions", name: "Questions & directions", emoji: "🧭" },
  { id: "paying", name: "Paying & shopping", emoji: "💶" },
  { id: "numbers", name: "Numbers", emoji: "🔢" },
  { id: "help", name: "Help & emergencies", emoji: "🆘" },
];

const PHRASES = [
  // ---- Politeness & basics ----
  { id: "b01", cat: "basics", it: "Buongiorno", en: "Good morning / good day", note: "Use until early afternoon. Say it when you walk into any shop or bar." },
  { id: "b02", cat: "basics", it: "Buonasera", en: "Good evening", note: "From roughly mid-afternoon onwards." },
  { id: "b03", cat: "basics", it: "Ciao", en: "Hi / bye (informal)", note: "Friends and people your age. With staff and strangers use buongiorno / arrivederci." },
  { id: "b04", cat: "basics", it: "Arrivederci", en: "Goodbye (polite)" },
  { id: "b05", cat: "basics", it: "Per favore", en: "Please" },
  { id: "b06", cat: "basics", it: "Grazie", en: "Thank you" },
  { id: "b07", cat: "basics", it: "Grazie mille", en: "Thanks a lot" },
  { id: "b08", cat: "basics", it: "Prego", en: "You're welcome / go ahead / after you", note: "You'll hear this constantly. Staff say it to mean 'how can I help?' too." },
  { id: "b09", cat: "basics", it: "Scusi", en: "Excuse me (to get attention, polite)", note: "Say it to a waiter, a stranger, a shop assistant." },
  { id: "b10", cat: "basics", it: "Mi scusi", en: "I'm sorry / excuse me (apologising)" },
  { id: "b11", cat: "basics", it: "Permesso", en: "Excuse me (squeezing past)", note: "On a crowded bus or getting to the bar counter." },
  { id: "b12", cat: "basics", it: "Sì", en: "Yes" },
  { id: "b13", cat: "basics", it: "No", en: "No" },
  { id: "b14", cat: "basics", it: "Va bene", en: "OK / that's fine" },
  { id: "b15", cat: "basics", it: "Non capisco", en: "I don't understand" },
  { id: "b16", cat: "basics", it: "Parla inglese?", en: "Do you speak English?" },
  { id: "b17", cat: "basics", it: "Non parlo bene l'italiano", en: "I don't speak Italian well" },
  { id: "b18", cat: "basics", it: "Può ripetere, per favore?", en: "Can you repeat, please?" },
  { id: "b19", cat: "basics", it: "Più lentamente, per favore", en: "More slowly, please" },
  { id: "b20", cat: "basics", it: "Come si dice... in italiano?", en: "How do you say... in Italian?" },
  { id: "b21", cat: "basics", it: "Mi dispiace", en: "I'm sorry" },
  { id: "b22", cat: "basics", it: "Come sta?", en: "How are you? (polite)" },
  { id: "b23", cat: "basics", it: "Bene, grazie", en: "Fine, thanks" },
  { id: "b24", cat: "basics", it: "Buona giornata", en: "Have a good day", note: "Said when leaving. Reply: 'Grazie, anche a lei'." },

  // ---- Bar & coffee ----
  { id: "c01", cat: "bar", it: "Un caffè, per favore", en: "An espresso, please", note: "'Caffè' alone always means espresso." },
  { id: "c02", cat: "bar", it: "Un cappuccino, per favore", en: "A cappuccino, please", note: "Considered a morning drink. After lunch, locals switch to caffè." },
  { id: "c03", cat: "bar", it: "Un caffè macchiato", en: "An espresso with a dash of milk" },
  { id: "c04", cat: "bar", it: "Un caffè lungo", en: "A long espresso (more water)" },
  { id: "c05", cat: "bar", it: "Un caffè americano", en: "An americano" },
  { id: "c06", cat: "bar", it: "Un caffè decaffeinato", en: "A decaf espresso", note: "Often shortened to 'un deca'." },
  { id: "c07", cat: "bar", it: "Un cornetto", en: "A croissant", note: "'Brioche' in the north." },
  { id: "c08", cat: "bar", it: "Un bicchiere d'acqua, per favore", en: "A glass of water, please" },
  { id: "c09", cat: "bar", it: "Acqua naturale", en: "Still water" },
  { id: "c10", cat: "bar", it: "Acqua frizzante", en: "Sparkling water" },
  { id: "c11", cat: "bar", it: "Una spremuta d'arancia", en: "A fresh-squeezed orange juice" },
  { id: "c12", cat: "bar", it: "Un tè", en: "A tea" },
  { id: "c13", cat: "bar", it: "Al banco", en: "At the counter", note: "Cheaper than sitting down. Standing at the bar is the local way." },
  { id: "c14", cat: "bar", it: "Al tavolo", en: "At a table" },
  { id: "c15", cat: "bar", it: "Da portare via", en: "To take away" },
  { id: "c16", cat: "bar", it: "Pago alla cassa?", en: "Do I pay at the till?", note: "In many bars you pay first at the cassa, then show the receipt at the counter." },
  { id: "c17", cat: "bar", it: "Lo scontrino", en: "The receipt", note: "Keep it. You may need to show it to get your drink." },
  { id: "c18", cat: "bar", it: "Uno spritz, per favore", en: "A spritz, please" },
  { id: "c19", cat: "bar", it: "Una birra media", en: "A medium beer (~400 ml)" },
  { id: "c20", cat: "bar", it: "Una birra piccola", en: "A small beer" },
  { id: "c21", cat: "bar", it: "Un altro, per favore", en: "Another one, please" },

  // ---- Restaurant ----
  { id: "r01", cat: "restaurant", it: "Un tavolo per due, per favore", en: "A table for two, please" },
  { id: "r02", cat: "restaurant", it: "Avete un tavolo?", en: "Do you have a table?" },
  { id: "r03", cat: "restaurant", it: "Ho prenotato a nome...", en: "I have a reservation under the name..." },
  { id: "r04", cat: "restaurant", it: "Il menù, per favore", en: "The menu, please" },
  { id: "r05", cat: "restaurant", it: "Cosa mi consiglia?", en: "What do you recommend?" },
  { id: "r06", cat: "restaurant", it: "Vorrei...", en: "I would like...", note: "The most useful two syllables in Italy. Vorrei + anything." },
  { id: "r07", cat: "restaurant", it: "Per me...", en: "For me...", note: "Natural way to order: 'Per me, la carbonara.'" },
  { id: "r08", cat: "restaurant", it: "Prendo...", en: "I'll have..." },
  { id: "r09", cat: "restaurant", it: "Una bottiglia d'acqua naturale", en: "A bottle of still water" },
  { id: "r10", cat: "restaurant", it: "Un bicchiere di vino rosso", en: "A glass of red wine" },
  { id: "r11", cat: "restaurant", it: "Un bicchiere di vino bianco", en: "A glass of white wine" },
  { id: "r12", cat: "restaurant", it: "Il vino della casa", en: "The house wine", note: "Usually cheap and good. Order 'un quarto' or 'mezzo litro'." },
  { id: "r13", cat: "restaurant", it: "Ancora un po' di pane, per favore", en: "A bit more bread, please" },
  { id: "r14", cat: "restaurant", it: "Sono vegetariano / vegetariana", en: "I'm vegetarian (m / f)" },
  { id: "r15", cat: "restaurant", it: "Sono allergico / allergica a...", en: "I'm allergic to... (m / f)" },
  { id: "r16", cat: "restaurant", it: "Senza glutine", en: "Gluten-free" },
  { id: "r17", cat: "restaurant", it: "Senza cipolla", en: "Without onion", note: "Swap in anything: senza formaggio, senza carne." },
  { id: "r18", cat: "restaurant", it: "È piccante?", en: "Is it spicy?" },
  { id: "r19", cat: "restaurant", it: "Buonissimo!", en: "Delicious!" },
  { id: "r20", cat: "restaurant", it: "Basta così, grazie", en: "That's all, thanks" },
  { id: "r21", cat: "restaurant", it: "Il conto, per favore", en: "The bill, please", note: "You must ask; they won't bring it unprompted." },
  { id: "r22", cat: "restaurant", it: "Posso pagare con la carta?", en: "Can I pay by card?" },
  { id: "r23", cat: "restaurant", it: "Il coperto", en: "The cover charge", note: "A per-person charge on the bill (€1–3). Normal, not a scam." },
  { id: "r24", cat: "restaurant", it: "Dov'è il bagno?", en: "Where is the bathroom?" },
  { id: "r25", cat: "restaurant", it: "Un primo", en: "A first course (pasta, risotto)" },
  { id: "r26", cat: "restaurant", it: "Un secondo", en: "A main course (meat, fish)" },
  { id: "r27", cat: "restaurant", it: "Un contorno", en: "A side dish" },
  { id: "r28", cat: "restaurant", it: "Un dolce", en: "A dessert" },
  { id: "r29", cat: "restaurant", it: "Siamo in quattro", en: "There are four of us", note: "Answer to 'Quanti siete?' — siamo in due / tre / quattro." },
  { id: "r30", cat: "restaurant", it: "Per lui... / Per lei...", en: "For him... / For her...", note: "Ordering for someone else at the table: 'Per lei la pizza.'" },
  { id: "r31", cat: "restaurant", it: "Per i bambini...", en: "For the kids...", note: "Waiters often say 'per i ragazzi?' meaning the same thing." },
  { id: "r32", cat: "restaurant", it: "Per il tavolo", en: "For the table", note: "Water, bread, a side to share: 'una frizzante per il tavolo'." },
  { id: "r33", cat: "restaurant", it: "Da dividere", en: "To share" },
  { id: "r34", cat: "restaurant", it: "Un altro piatto, per favore", en: "Another plate, please", note: "For sharing a dish between two people." },
  { id: "r35", cat: "restaurant", it: "Tutto insieme", en: "All together (one bill)", note: "Splitting the bill is unusual in Italy; one person pays and you sort it out later." },

  // ---- Questions & directions ----
  { id: "q01", cat: "questions", it: "Dov'è...?", en: "Where is...?" },
  { id: "q02", cat: "questions", it: "Dov'è il bagno?", en: "Where is the bathroom?" },
  { id: "q03", cat: "questions", it: "Dov'è la stazione?", en: "Where is the station?" },
  { id: "q04", cat: "questions", it: "Dov'è la farmacia?", en: "Where is the pharmacy?" },
  { id: "q05", cat: "questions", it: "Dov'è un bancomat?", en: "Where is an ATM?" },
  { id: "q06", cat: "questions", it: "Dov'è la fermata dell'autobus?", en: "Where is the bus stop?" },
  { id: "q07", cat: "questions", it: "C'è un supermercato qui vicino?", en: "Is there a supermarket near here?" },
  { id: "q08", cat: "questions", it: "È lontano?", en: "Is it far?" },
  { id: "q09", cat: "questions", it: "A destra", en: "To the right" },
  { id: "q10", cat: "questions", it: "A sinistra", en: "To the left" },
  { id: "q11", cat: "questions", it: "Sempre dritto", en: "Straight ahead" },
  { id: "q12", cat: "questions", it: "Qui", en: "Here" },
  { id: "q13", cat: "questions", it: "Lì", en: "There" },
  { id: "q14", cat: "questions", it: "Vicino", en: "Near" },
  { id: "q15", cat: "questions", it: "Lontano", en: "Far" },
  { id: "q16", cat: "questions", it: "Che ore sono?", en: "What time is it?" },
  { id: "q17", cat: "questions", it: "A che ora apre?", en: "What time does it open?" },
  { id: "q18", cat: "questions", it: "A che ora chiude?", en: "What time does it close?" },
  { id: "q19", cat: "questions", it: "È aperto?", en: "Is it open?" },
  { id: "q20", cat: "questions", it: "È chiuso", en: "It's closed", note: "You will hear this a lot between 13:00 and 16:00." },
  { id: "q21", cat: "questions", it: "Mi può aiutare?", en: "Can you help me?" },
  { id: "q22", cat: "questions", it: "Quanto tempo ci vuole?", en: "How long does it take?" },
  { id: "q23", cat: "questions", it: "Questo autobus va a...?", en: "Does this bus go to...?" },
  { id: "q24", cat: "questions", it: "Un biglietto per..., per favore", en: "A ticket to..., please" },

  // ---- Paying & shopping ----
  { id: "p01", cat: "paying", it: "Quanto costa?", en: "How much does it cost?" },
  { id: "p02", cat: "paying", it: "Quant'è?", en: "How much is it (in total)?" },
  { id: "p03", cat: "paying", it: "Posso pagare con la carta?", en: "Can I pay by card?" },
  { id: "p04", cat: "paying", it: "Solo contanti?", en: "Cash only?" },
  { id: "p05", cat: "paying", it: "Il resto", en: "The change" },
  { id: "p06", cat: "paying", it: "Una busta, per favore", en: "A bag, please" },
  { id: "p07", cat: "paying", it: "Sto solo guardando, grazie", en: "I'm just looking, thanks" },
  { id: "p08", cat: "paying", it: "Lo prendo", en: "I'll take it" },
  { id: "p09", cat: "paying", it: "Un etto di prosciutto", en: "100 g of prosciutto", note: "Deli counters work in etti (100 g). 'Due etti' = 200 g." },
  { id: "p10", cat: "paying", it: "Mezzo chilo di...", en: "Half a kilo of..." },
  { id: "p11", cat: "paying", it: "Un chilo di...", en: "A kilo of..." },
  { id: "p12", cat: "paying", it: "Questo", en: "This one", note: "Point and say it. Solves most shopping." },
  { id: "p13", cat: "paying", it: "Quello", en: "That one" },
  { id: "p14", cat: "paying", it: "Tocca a me", en: "It's my turn", note: "At a busy counter with no queue." },
  { id: "p15", cat: "paying", it: "Vorrei un biglietto dell'autobus", en: "I'd like a bus ticket", note: "Buy at the tabaccheria (sign with a big T), not on the bus." },

  // ---- Numbers ----
  { id: "n01", cat: "numbers", it: "Uno", en: "1" },
  { id: "n02", cat: "numbers", it: "Due", en: "2" },
  { id: "n03", cat: "numbers", it: "Tre", en: "3" },
  { id: "n04", cat: "numbers", it: "Quattro", en: "4" },
  { id: "n05", cat: "numbers", it: "Cinque", en: "5" },
  { id: "n06", cat: "numbers", it: "Sei", en: "6" },
  { id: "n07", cat: "numbers", it: "Sette", en: "7" },
  { id: "n08", cat: "numbers", it: "Otto", en: "8" },
  { id: "n09", cat: "numbers", it: "Nove", en: "9" },
  { id: "n10", cat: "numbers", it: "Dieci", en: "10" },
  { id: "n11", cat: "numbers", it: "Quindici", en: "15" },
  { id: "n12", cat: "numbers", it: "Venti", en: "20" },
  { id: "n13", cat: "numbers", it: "Trenta", en: "30" },
  { id: "n14", cat: "numbers", it: "Cinquanta", en: "50" },
  { id: "n15", cat: "numbers", it: "Cento", en: "100" },
  { id: "n16", cat: "numbers", it: "Due euro e cinquanta", en: "€2.50", note: "Prices: euro + 'e' + cents." },

  // ---- Help & emergencies ----
  { id: "h01", cat: "help", it: "Aiuto!", en: "Help!" },
  { id: "h02", cat: "help", it: "Ho bisogno di un medico", en: "I need a doctor" },
  { id: "h03", cat: "help", it: "Chiami un'ambulanza", en: "Call an ambulance", note: "Emergency number in Italy: 112." },
  { id: "h04", cat: "help", it: "Non mi sento bene", en: "I don't feel well" },
  { id: "h05", cat: "help", it: "Mi sono perso / persa", en: "I'm lost (m / f)" },
  { id: "h06", cat: "help", it: "Ho perso il portafoglio", en: "I've lost my wallet" },
  { id: "h07", cat: "help", it: "Ho perso il telefono", en: "I've lost my phone" },
  { id: "h08", cat: "help", it: "Dov'è l'ospedale?", en: "Where is the hospital?" },
  { id: "h09", cat: "help", it: "Dov'è la polizia?", en: "Where is the police station?" },
  { id: "h10", cat: "help", it: "Ho mal di testa", en: "I have a headache" },
  { id: "h11", cat: "help", it: "Ho mal di stomaco", en: "I have a stomach ache" },
  { id: "h12", cat: "help", it: "Qualcosa per il raffreddore", en: "Something for a cold" },
];

const CONVERSATIONS = [
  {
    id: "coffee", title: "Coffee at the bar", where: "Standing at the counter, morning",
    lines: [
      { who: "you", it: "Buongiorno.", en: "Good morning." },
      { who: "them", it: "Buongiorno, prego.", en: "Good morning, what can I get you?" },
      { who: "you", it: "Un cappuccino e un cornetto, per favore.", en: "A cappuccino and a croissant, please." },
      { who: "them", it: "Cornetto semplice o alla crema?", en: "Plain croissant or with cream?" },
      { who: "you", it: "Semplice, grazie.", en: "Plain, thanks." },
      { who: "them", it: "Ecco a lei.", en: "Here you go." },
      { who: "you", it: "Grazie. Quant'è?", en: "Thanks. How much is it?" },
      { who: "them", it: "Due e cinquanta.", en: "Two fifty." },
      { who: "you", it: "Ecco. Grazie, arrivederci!", en: "Here you are. Thanks, goodbye!" },
      { who: "them", it: "Arrivederci, buona giornata.", en: "Goodbye, have a good day." },
    ],
  },
  {
    id: "coffee-cassa", title: "Pay first at the till", where: "A busy bar where you pay before ordering",
    lines: [
      { who: "you", it: "Scusi, pago alla cassa?", en: "Excuse me, do I pay at the till?" },
      { who: "them", it: "Sì, alla cassa e poi al banco con lo scontrino.", en: "Yes, at the till and then at the counter with the receipt." },
      { who: "you", it: "Va bene. Un caffè e un'acqua naturale.", en: "OK. An espresso and a still water." },
      { who: "them", it: "Due euro e venti.", en: "Two twenty." },
      { who: "you", it: "Ecco a lei.", en: "Here you go." },
      { who: "them", it: "Grazie, ecco lo scontrino.", en: "Thanks, here's the receipt." },
      { who: "you", it: "Grazie.", en: "Thanks." },
    ],
  },
  {
    id: "table", title: "Getting a table", where: "Walking into a trattoria at dinner time",
    lines: [
      { who: "you", it: "Buonasera. Avete un tavolo per due?", en: "Good evening. Do you have a table for two?" },
      { who: "them", it: "Avete prenotato?", en: "Do you have a reservation?" },
      { who: "you", it: "No, non abbiamo prenotato.", en: "No, we haven't booked." },
      { who: "them", it: "Va bene, prego, seguitemi.", en: "OK, please, follow me." },
      { who: "you", it: "Grazie. Il menù, per favore.", en: "Thanks. The menu, please." },
      { who: "them", it: "Subito. Da bere?", en: "Right away. Something to drink?" },
      { who: "you", it: "Una bottiglia d'acqua frizzante e mezzo litro di vino rosso della casa.", en: "A bottle of sparkling water and half a litre of house red." },
    ],
  },
  {
    id: "order", title: "Ordering food", where: "At the table, waiter comes back",
    lines: [
      { who: "them", it: "Allora, cosa prendete?", en: "So, what will you have?" },
      { who: "you", it: "Cosa mi consiglia?", en: "What do you recommend?" },
      { who: "them", it: "Oggi la pasta al ragù è molto buona.", en: "Today the pasta with ragù is very good." },
      { who: "you", it: "Perfetto. Per me la pasta al ragù.", en: "Perfect. For me the pasta with ragù." },
      { who: "them", it: "E come secondo?", en: "And for the main course?" },
      { who: "you", it: "No, basta così, grazie.", en: "No, that's enough, thanks." },
      { who: "them", it: "Va bene.", en: "OK." },
      { who: "you", it: "Scusi, sono allergico alle noci.", en: "Excuse me, I'm allergic to nuts." },
      { who: "them", it: "Nessun problema, non ci sono noci.", en: "No problem, there are no nuts." },
    ],
  },
  {
    id: "family", title: "Ordering for four", where: "Trattoria with the family. The waiter goes round the table; one person handles the table-wide things (water, wine, bill), everyone else just needs 'per me…'. Speakers: you, your partner, the waiter",
    lines: [
      { who: "them", it: "Buonasera, quanti siete?", en: "Good evening, how many are you?" },
      { who: "you", it: "Buonasera. Siamo in quattro. Avete un tavolo?", en: "Good evening. There are four of us. Do you have a table?" },
      { who: "them", it: "Certo, prego. Va bene qui?", en: "Of course, please. Is here OK?" },
      { who: "you", it: "Perfetto, grazie.", en: "Perfect, thanks." },
      { who: "them", it: "Ecco i menù. Da bere per tutti?", en: "Here are the menus. Something to drink for everyone?" },
      { who: "you", it: "Una naturale e una frizzante per il tavolo, e mezzo litro di vino rosso della casa.", en: "One still and one sparkling for the table, and half a litre of house red." },
      { who: "them", it: "Benissimo. Siete pronti per ordinare?", en: "Very good. Are you ready to order?" },
      { who: "you", it: "Sì. Per me la carbonara.", en: "Yes. For me the carbonara." },
      { who: "them", it: "E per lei?", en: "And for you? (to the next person)" },
      { who: "partner", name: "Partner", it: "Per me la pizza margherita, senza basilico.", en: "For me the margherita pizza, without basil." },
      { who: "them", it: "Va bene. E per i ragazzi?", en: "OK. And for the kids?" },
      { who: "you", it: "Per lui gli gnocchi al pomodoro, e per lei una margherita, piccola se possibile.", en: "For him the gnocchi with tomato, and for her a margherita, small if possible." },
      { who: "them", it: "Certo. Qualcos'altro? Un contorno?", en: "Sure. Anything else? A side?" },
      { who: "partner", name: "Partner", it: "Sì, un'insalata mista da dividere.", en: "Yes, a mixed salad to share." },
      { who: "them", it: "Perfetto. Vi porto subito il pane.", en: "Perfect. I'll bring you bread right away." },
      { who: "you", it: "Scusi, un altro piatto, per favore, così dividiamo.", en: "Excuse me, another plate please, so we can share." },
      { who: "them", it: "Subito.", en: "Right away." },
      { who: "you", it: "Il conto, per favore. Tutto insieme.", en: "The bill, please. All together." },
      { who: "them", it: "Va bene, arrivo.", en: "OK, coming." },
    ],
  },
  {
    id: "bill", title: "Asking for the bill", where: "End of the meal",
    lines: [
      { who: "you", it: "Scusi!", en: "Excuse me!" },
      { who: "them", it: "Prego, mi dica.", en: "Yes, tell me." },
      { who: "you", it: "Il conto, per favore.", en: "The bill, please." },
      { who: "them", it: "Subito.", en: "Right away." },
      { who: "you", it: "Posso pagare con la carta?", en: "Can I pay by card?" },
      { who: "them", it: "Certo. Ecco il conto.", en: "Of course. Here's the bill." },
      { who: "you", it: "Era buonissimo, grazie.", en: "It was delicious, thanks." },
      { who: "them", it: "Grazie a voi, buona serata.", en: "Thank you, have a good evening." },
    ],
  },
  {
    id: "bathroom", title: "Finding the bathroom", where: "In a bar or restaurant",
    lines: [
      { who: "you", it: "Scusi, dov'è il bagno?", en: "Excuse me, where is the bathroom?" },
      { who: "them", it: "In fondo a destra.", en: "At the back on the right." },
      { who: "you", it: "Grazie.", en: "Thanks." },
      { who: "them", it: "Prego.", en: "You're welcome." },
    ],
  },
  {
    id: "directions", title: "Asking for directions", where: "On the street",
    lines: [
      { who: "you", it: "Scusi, dov'è la stazione?", en: "Excuse me, where is the station?" },
      { who: "them", it: "Sempre dritto, poi a sinistra al semaforo.", en: "Straight ahead, then left at the traffic lights." },
      { who: "you", it: "È lontano?", en: "Is it far?" },
      { who: "them", it: "No, cinque minuti a piedi.", en: "No, five minutes on foot." },
      { who: "you", it: "Può ripetere, per favore? Più lentamente.", en: "Can you repeat, please? More slowly." },
      { who: "them", it: "Dritto... poi a sinistra... al semaforo.", en: "Straight... then left... at the lights." },
      { who: "you", it: "Ho capito. Grazie mille!", en: "I understand. Thanks a lot!" },
    ],
  },
  {
    id: "deli", title: "At the deli counter", where: "Supermarket or alimentari",
    lines: [
      { who: "them", it: "Prego, chi è il prossimo?", en: "Who's next?" },
      { who: "you", it: "Tocca a me. Due etti di prosciutto crudo, per favore.", en: "It's my turn. 200 g of prosciutto crudo, please." },
      { who: "them", it: "Va bene così?", en: "Is this OK?" },
      { who: "you", it: "Sì, perfetto. E un pezzo di parmigiano.", en: "Yes, perfect. And a piece of parmesan." },
      { who: "them", it: "Quanto?", en: "How much?" },
      { who: "you", it: "Così, va bene. Basta così, grazie.", en: "Like that, fine. That's all, thanks." },
    ],
  },
  {
    id: "tabacchi", title: "Bus tickets at the tabaccheria", where: "Shop with the big T sign",
    lines: [
      { who: "you", it: "Buongiorno. Due biglietti dell'autobus, per favore.", en: "Good morning. Two bus tickets, please." },
      { who: "them", it: "Da novanta minuti?", en: "Ninety-minute ones?" },
      { who: "you", it: "Sì. Quant'è?", en: "Yes. How much is it?" },
      { who: "them", it: "Tre euro.", en: "Three euros." },
      { who: "you", it: "Posso pagare con la carta?", en: "Can I pay by card?" },
      { who: "them", it: "Solo contanti, mi dispiace.", en: "Cash only, sorry." },
      { who: "you", it: "Va bene, ecco. Grazie!", en: "OK, here. Thanks!" },
    ],
  },
  {
    id: "pharmacy", title: "At the pharmacy", where: "Farmacia, green cross sign",
    lines: [
      { who: "you", it: "Buongiorno. Non mi sento bene. Ho mal di testa.", en: "Good morning. I don't feel well. I have a headache." },
      { who: "them", it: "Ha anche la febbre?", en: "Do you also have a fever?" },
      { who: "you", it: "No, solo mal di testa.", en: "No, just a headache." },
      { who: "them", it: "Le do questo, una compressa ogni otto ore.", en: "I'll give you this, one tablet every eight hours." },
      { who: "you", it: "Va bene. Quanto costa?", en: "OK. How much does it cost?" },
      { who: "them", it: "Cinque euro e cinquanta.", en: "Five fifty." },
      { who: "you", it: "Grazie mille, arrivederci.", en: "Thanks a lot, goodbye." },
    ],
  },
  {
    id: "aperitivo", title: "Aperitivo", where: "Early evening, outdoor bar",
    lines: [
      { who: "them", it: "Buonasera, cosa vi porto?", en: "Good evening, what can I bring you?" },
      { who: "you", it: "Uno spritz e una birra media, per favore.", en: "A spritz and a medium beer, please." },
      { who: "them", it: "Spritz Aperol o Campari?", en: "Aperol or Campari spritz?" },
      { who: "you", it: "Aperol, grazie.", en: "Aperol, thanks." },
      { who: "them", it: "Vi porto anche qualcosa da mangiare.", en: "I'll bring you something to eat too." },
      { who: "you", it: "Perfetto, grazie.", en: "Perfect, thanks." },
      { who: "you", it: "Scusi, un altro spritz, per favore.", en: "Excuse me, another spritz, please." },
    ],
  },
];

// ---- Numbers reference ----
// Shared by the app (Numbers tab) and tools/dump-text.mjs (so clips get generated).
function numberToItalian(n) {
  n = Math.floor(Math.abs(Number(n)));
  if (!Number.isFinite(n) || n > 999999) return "";
  const units = ["zero", "uno", "due", "tre", "quattro", "cinque", "sei", "sette", "otto", "nove", "dieci",
    "undici", "dodici", "tredici", "quattordici", "quindici", "sedici", "diciassette", "diciotto", "diciannove"];
  const tens = ["", "", "venti", "trenta", "quaranta", "cinquanta", "sessanta", "settanta", "ottanta", "novanta"];
  const below100 = (x) => {
    if (x < 20) return units[x];
    const t = tens[Math.floor(x / 10)], u = x % 10;
    if (u === 0) return t;
    if (u === 1 || u === 8) return t.slice(0, -1) + units[u]; // ventuno, ventotto
    if (u === 3) return t + "tré";                             // ventitré
    return t + units[u];
  };
  const below1000 = (x) => {
    if (x < 100) return below100(x);
    const h = Math.floor(x / 100), r = x % 100;
    let s = h === 1 ? "cento" : units[h] + "cento";
    if (r === 0) return s;
    const rest = below100(r);
    if (rest.startsWith("o")) s = s.slice(0, -1); // centotto, centottanta
    return s + rest;
  };
  if (n < 1000) return below1000(n);
  const k = Math.floor(n / 1000), r = n % 1000;
  const head = k === 1 ? "mille" : below1000(k) + "mila";
  return r === 0 ? head : head + below1000(r);
}

const NUMBER_SECTIONS = [
  { title: "0 – 20", note: "Learn these cold; everything else is built from them.", rows: [...Array(21).keys()] },
  { title: "Tens", note: "Drop the final vowel before uno and otto: ventuno, ventotto. Add an accent on tre: ventitré.",
    rows: [20, 21, 22, 23, 28, 30, 40, 50, 60, 70, 80, 90] },
  { title: "Hundreds", note: "Cento never changes; just stick the rest on the end: centocinquanta.", rows: [100, 101, 108, 150, 200, 300, 500, 999] },
  { title: "Thousands", note: "Mille for one thousand, -mila for more: duemila, diecimila.", rows: [1000, 1500, 2000, 10000] },
];

const NUMBER_EXAMPLES = [
  { title: "Prices", note: "Euro + e + cents. One euro is 'un euro'. Cents alone are centesimi.", rows: [
    { label: "€0,80", it: "ottanta centesimi" },
    { label: "€1,20", it: "un euro e venti" },
    { label: "€2,50", it: "due euro e cinquanta" },
    { label: "€4,90", it: "quattro euro e novanta" },
    { label: "€15", it: "quindici euro" },
    { label: "€32,50", it: "trentadue euro e cinquanta" },
  ] },
  { title: "Time", note: "Hours are plural (le due) except one o'clock (l'una). 'e mezza' = half past, 'meno' = to.", rows: [
    { label: "1:00", it: "l'una" },
    { label: "2:00", it: "le due" },
    { label: "3:30", it: "le tre e mezza" },
    { label: "8:15", it: "le otto e un quarto" },
    { label: "8:45", it: "le nove meno un quarto" },
    { label: "12:00", it: "mezzogiorno" },
    { label: "20:30", it: "le otto e mezza di sera" },
    { label: "at 8", it: "alle otto" },
  ] },
  { title: "Quantities", note: "What you'll actually say at counters.", rows: [
    { label: "for 2", it: "per due" },
    { label: "2 tickets", it: "due biglietti" },
    { label: "100 g", it: "un etto" },
    { label: "200 g", it: "due etti" },
    { label: "half a kilo", it: "mezzo chilo" },
    { label: "a quarter (wine)", it: "un quarto" },
    { label: "half a litre", it: "mezzo litro" },
  ] },
];

// Strings that need recorded audio beyond PHRASES / CONVERSATIONS.
const AUDIO_EXTRA = [
  ...[...Array(101).keys()].map(numberToItalian),
  ...[200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 10000].map(numberToItalian),
  ...NUMBER_SECTIONS.flatMap((s) => s.rows.map(numberToItalian)),
  ...NUMBER_EXAMPLES.flatMap((s) => s.rows.map((r) => r.it)),
];
