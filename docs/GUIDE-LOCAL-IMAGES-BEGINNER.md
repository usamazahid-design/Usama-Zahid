# How to Put Your Own Pictures on Your Website (For Absolute Beginners)

This guide is written for someone who has **never coded before**. It explains
every single step, including which button to click and what to type. You cannot
break anything by following these steps — at worst the picture doesn't show up
and you just try again.

You will need to touch exactly **2 things**:

1. A **folder** (like a drawer) where you drop your picture file.
2. One **text file** where you tell the website the picture's name.

That's it. Let's go.

---

## Before you start: know your 3 folders

Your whole website lives in one big folder on your computer:

```
D:\usama Zahid Work\Web Dev\UZ\usama zahid
```

Inside it there are folders inside folders, like drawers inside a desk. Here are
the 3 you need to know:

| Folder | What it is | You will... |
| ------ | ---------- | ----------- |
| `public\images\portfolio` | Where pictures for your work projects live | **Drop your picture here** |
| `public\images` | Where other site pictures live (logo, your photo) | Just look at it (not needed) |
| `lib` | Where the website's "text instructions" live | **Edit one file here** |

Now, the whole job, in one sentence:

> **Drop the picture file into `public\images\portfolio`, then type its name into
> the file `lib\portfolio-data.ts`.**

---

## Step 1 — Open the project folder (Windows Explorer)

1. Press the `Windows` key (the key with the Windows logo).
2. Type `Run` and press `Enter`. A small box opens.
3. In the box, type exactly:
   ```
   D:\usama Zahid Work\Web Dev\UZ\usama zahid
   ```
4. Press `Enter`.

A window opens showing the project's files and folders. This is your website's
"desk drawer".

> **Alternative way:** open the folder `This PC` (or `My Computer`), open `D:`,
> then click into `usama Zahid Work` → `Web Dev` → `UZ` → `usama zahid`.

---

## Step 2 — Find the "portfolio" folder

You need to open this chain of folders one by one:

```
public  →  images  →  portfolio
```

1. In the window from Step 1, double-click the folder named `public`.
2. Inside it, double-click the folder named `images`.
3. Inside that, double-click the folder named `portfolio`.

You are now in the right folder. It is **empty right now** (0 files). That is
normal — you are about to put your first picture in it.

> **Do not close this window.** You'll need it in a moment.

---

## Step 3 — Get a picture ready (format and name)

Your picture can be a **PNG**, **JPG**, **WebP**, or **AVIF** file. Any normal
screenshot or design export works.

### The name of your picture file — IMPORTANT RULES

The name must follow these rules, or the website won't find it:

| Rule | Bad example | Good example |
| ---- | ----------- | ------------ |
| Use only lowercase letters, numbers, `-` (dash) | `My Picture.png` | `my-picture.png` |
| No spaces | `my picture.png` | `my-picture.png` |
| No special symbols (&, %, #, é, ü) | `pic#1.jpg` | `pic-1.jpg` |
| Keep the ending (`.png`, `.jpg`, `.webp`) | `photo` | `photo.webp` |
| Short and simple | `neuraldesk-homescreen-final-v3-fixed.png` | `neuraldesk-hero.png` |

**Rule of thumb:** only lowercase letters, numbers, and dashes. Nothing else.

> **One more thing:** give the file a name that is easy to type, because you will
> type it again in Step 6.

---

## Step 4 — Copy the picture into the `portfolio` folder

1. Find your picture file on your computer (wherever it is now).
2. **Copy it** (right-click the file → `Copy`, or press `Ctrl + C`).
3. Click inside the `portfolio` window from Step 2 (make sure it's the front window).
4. **Paste it** (right-click empty space → `Paste`, or press `Ctrl + V`).

The picture now appears inside `public\images\portfolio`. For example, if you
copied a file called `neuraldesk-hero.png`, you should now see it listed there.

To double-check: look at the white address bar at the top of the window. It
should show:

```
...\usama zahid\public\images\portfolio
```

And you should see your picture's name in the list of files.

---

## Step 5 — Open the "instructions" file (the data file)

Now we tell the website about your picture. The website reads its instructions
from a file called `portfolio-data.ts`.

1. Open the project window again (the window that shows `public`, `lib`, `app`, …).
   If you closed it, repeat Step 1.
2. Double-click the folder named `lib`.
3. Inside it you will see a file named `portfolio-data.ts`. **Double-click it.**

> **Which program opens it?** On most computers this file opens in a text editor
> (like Notepad, VS Code, or similar) automatically. Any of those is fine. If it
> asks you which program to use, choose **Notepad** (the basic one is fine).

The file is long. Don't panic — you are only going to look at one small part of it.

---

## Step 6 — Understand the ONE sentence that matters

Search this sentence in the file (press `Ctrl + F`, then paste):

```
src: '/images/usamazahidPic.webp',
```

When you find it, you're looking at the exact place where the website stores a
picture's path. Here is what that sentence means, piece by piece:

```
src:  '/images/usamazahidPic.webp',
 │     └───┬────┘ └──────┬─────┘
 │         │             │
 "source"  │             │
 (the      │             the picture's FILE NAME + ending
 picture's │
 location) │
           the folder path, starting with / (required!)
```

- `/images/`  →  "look inside the `images` folder"
- `usamazahidPic.webp`  →  "and use the file called `usamazahidPic.webp`"

That's the whole trick. The website reads this one line and knows which picture
to show. **The `src` line is just "folder path + file name".**

---

## Step 7 — Change that ONE line to your picture

Now you replace the old file name with your own. You only change the part after
`/images/`, keeping the `/images/` part and the quote marks.

**Your picture lives in the `portfolio` folder**, so the path must include
`/images/portfolio/`:

| Your picture file is… | You write in `src` |
| --------------------- | ------------------ |
| `neuraldesk-hero.png` (inside `portfolio`) | `/images/portfolio/neuraldesk-hero.png` |
| `cadence-home.png` (inside `portfolio`) | `/images/portfolio/cadence-home.png` |
| `my-work.webp` (inside `portfolio`) | `/images/portfolio/my-work.webp` |

So, if your picture is called `neuraldesk-hero.png`, you change the line from:

```ts
src: '/images/usamazahidPic.webp',
```

to:

```ts
src: '/images/portfolio/neuraldesk-hero.png',
```

**How to do the change:**

1. Click right before the first `'` (single quote) on that line.
2. Hold `Ctrl + Shift` and press `→` (right arrow) a few times until the whole
   path `'/images/usamazahidPic.webp'` is selected (highlighted).
3. Press `Delete` on your keyboard (the selected text disappears).
4. Type your new path, **including the two quote marks**:
   ```
   '/images/portfolio/neuraldesk-hero.png'
   ```
5. **Save the file** (`Ctrl + S`). Saving is essential — if you don't save,
   nothing changes.

> **The three things that MUST match exactly (copy-paste is safest):**
> 1. The file name must be **exactly** the same as the file you put in the folder
>    (including the ending, e.g. `.png`). `neuraldesk-hero.PNG` is NOT the same as
>    `neuraldesk-hero.png`.
> 2. The path must **start with** `/images/portfolio/`.
> 3. It must be wrapped in single quotes `'…'` and end with a comma `,`.

---

## Step 8 — Rebuild the website (make it official)

Changing the text file alone is not enough. Your website is a "baking" process:
you changed the recipe, now you must bake again. This is called a **build**.

1. Open the project window (Step 1) and click into the **address bar** at the top.
2. Type `cmd` and press `Enter`. A black window (Command Prompt) opens, already
   in the right folder.
3. Type exactly:
   ```
   npx next build
   ```
4. Press `Enter` and wait. You will see lines of text fly by, ending with a table
   of your pages and the word `(Static)` / `(SSG)`. That means it worked.

> If you prefer, you can instead open your editor and run the build there — but
> the `cmd` method above always works on Windows.

---

## Step 9 — Check that your picture actually made it

The build copies everything from `public` into a folder called `out` (your
finished website). Let's confirm your picture was copied too.

In the black window from Step 8, type:

```
out\images\portfolio
```

Press `Enter`. You should see your picture's file name listed. If you see it, the
website WILL show it. Done!

---

## Step 10 — See it on the website

1. In the black window, type:
   ```
   npx serve out
   ```
2. Press `Enter`. It prints a web address like `http://localhost:3000`.
3. Open your browser, go to that address, and open a project page, for example:
   ```
   http://localhost:3000/portfolio/stealth-humanizer-ai-app/
   ```

Your picture should now appear where the old one was.

---

## If it's STILL not showing — check these, in this order

### 1. Did you SAVE the file?
- Open `portfolio-data.ts`, press `Ctrl + S`, then rebuild (Step 8). This is the
  #1 cause.

### 2. Is the file name EXACTLY the same?
Compare what you typed in `src` with the actual file in the folder. Look closely:
- Capital letters count: `Hero.png` ≠ `hero.png`.
- The ending counts: `pic.jpg` ≠ `pic.png`.
- Hidden spaces count: `hero .png` (with a space) is a different file.

### 3. Does the path start with `/images/portfolio/`?
It must look like `/images/portfolio/yourfile.png`. Missing the leading `/` is a
classic mistake — for example `images/portfolio/yourfile.png` (no leading slash)
**breaks** on project pages.

### 4. Did you rebuild AFTER adding the picture?
The picture must be copied by the build. Open the black window and run:
```
out\images\portfolio
```
If your file is not listed there, repeat Step 4 (copy the file) and Step 8 (build).

### 5. Is the folder spelled `portfolio`?
Not `porfolio`, not `portfoliio`. Check the window's address bar.

### 6. Still stuck?
Do these two things and send the results:
- Open the black window and type: `dir out\images\portfolio`
- Show the exact `src:` line you wrote in `portfolio-data.ts`

---

## The one-paragraph summary

1. Put your picture in the folder `public\images\portfolio`.
2. In the file `lib\portfolio-data.ts`, set a line like
   `src: '/images/portfolio/your-picture.png',` — path starts with
   `/images/portfolio/`, then the exact file name, in single quotes, ending with
   a comma.
3. Run `npx next build` to rebuild, then check `out\images\portfolio`.

Two places, one rebuild. That's the whole system.

---

## Plain-English glossary

| Word | What it means |
| ---- | ------------- |
| **Folder / directory** | A "drawer" that holds files. Same thing. |
| **Path** | The directions to a file, e.g. `public\images\portfolio`. |
| **`src`** | The place in the code that says "this is where the picture comes from". |
| **Build** | The process that turns your files into the finished website (the `out` folder). |
| **`out` folder** | The finished website. Whatever is here is what people see. |
| **Slash** | The character `/`. MUST be there, at the front: `/images/...`. |
| **Rebuild** | Running the build again after a change, so the change shows up. |
| **Extension** | The ending of a file name: `.png`, `.jpg`, `.webp`. It must match. |
