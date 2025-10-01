# Vibe-coding paradise (??) workshop

Idag ska vi ägna oss åt att vibe-coda. Endast.
Uppgiften är att antingen välja någon av idéerna lite längre ner i readmen eller börja arbetet på ett projekt som ni tänkt att ni vill göra men inte riktigt vetat hur.
Ni får gärna se detta som en startpunkt för ett projekt ni kan arbeta med under hela kursens gång (vid sidan av kursen alltså).

Det finns några regler:

1. Ni får bara använda Gemini CLI
   - Se installationsinstruktioner [här](https://dev.to/auden/google-gemini-cli-tutorial-how-to-install-and-use-it-with-images-4phb)
   - Basically `npm install -g @google/gemini-cli`, navigera till projektmappen och skriv gemini i terminalen
   - Authentisera via ert google-konto
2. Fram till klockan 13
   - Försök titta så lite som möjligt på koden, lös alla problem via Gemini CLI.
   - Efter 13: kolla igenom koden, försök förstå vad det är som har hänt
3. En god idé är att spendera åtminstone första 30-60 minutrarna med att planera projektet och komma fram till vad det är man ska bygga.
4. Kom ihåg att commita ofta :)

## Kom igång

Utgå från något av projekten i detta repo eller kör:

**För next.js**

```bash
npx create-next-app@latest my-app --ts --tailwind --eslint --app --src-dir
```

**För vite**

```bash
npm create vite@latest my-app -- --template react-ts # React med typescript
npm install tailwindcss @tailwindcss/vite # Om ni vill använda tailwind
```

**Eller valfri setup enligt överenskommelse med AI**

## Generella tips:

- Använd de prompting-tekniker vi gick igenom igår för att få så mycket som möjligt ut av modellerna (gäller framförallt planerandet)
- Använd meta-prompting för att förbättra instruktionerna till kod-modellen
- Använd rollspels-prompting för att komma fram till idéer. "Du är en produktägare som ställer mig frågor om applikationen jag ska bygga..."
- Använd few-shot examples i din gemini.md fil för att guida modellen vid edge-cases

### Tips när ni jobbar med gemini:

- Skapa en specifikation - alltså:
  - Specificera vad det är ni bygger
  - Planera hur ni ska bygga det (låt modellen veta ramverk, eventuella problem som kan uppstå etc)
  - Gör en lista med saker som behöver implementeras i ordning
  - Bygg bit för bit med Gemini CLI
  - **Gör hela denna specifikationen med hjälp av AI, typ ChatGPT eller likn.**
- Använd en GEMINI.md fil för att beskriva hur ni vill att gemini ska strukturera koden
  - Code guides
    - Hur vill ni att den ska skriva kod? Kommentarer, säkerhetstänk, tester?
  - Style guides
    - Hur den ska tänka med styling (detta projekt använder tailwind) men här skulle ni kunna ge den ett färgschema, typografi etc.

### Projekt-idéer (om ni inte kommer på ett eget projekt)

- Bygg ett spel (bolla en idé med ChatGPT om ett spel), gör research, fundera på vad behövs? (Håll det kort)
- Bygg en trummaskin. Den ska ha minst 4 olika ljud som kan spelas upp (ex. kickdrum, snare, hihat, crash)
  - Förutom att bara kunna fungera: bygg ett tilltalande gränssnitt, lägg till funktionalitet som cutoff-filters, effekter som reverb, delay etc.
    - Om du känner att du inte vet så mycket om trummaskiner och vad som skulle kunna vara användbart, bolla med AI!
  - Tips: Använd Tone.js som ramverk för att spela upp ljud
- Bygg ett minimalt men fungerande Socialt nätverk
  - Användare ska kunna logga in, uppdatera sin profil, posta texter på sin profil.
  - Använd ex. MongoDB och Mongoose som ramverk. Lägg in er connection-string (med database-name) och visa den för modellen i .env
- Bygg en portfolio-sida
  - Bygg en portfolio åt en fiktiv person. Använd rollspelsprompting och be ChatGPT vara "beställaren"
  - Använd ChatGPT (eller annan bildgenereringsmodell) för att ta fram bildmaterial som ska visas i portfolion
  - Använd gärna animations-bibliotek som anime.js eller liknande för parallax-scroll eller spännande animationer.
