# IronVale SMP — Website

A premium, static, multi-page website for the IronVale Minecraft Survival SMP.
Pure HTML5 / CSS3 / vanilla JS — no build step, no React. Open `index.html` in a browser and everything works.

## Structure

```
index.html            Homepage — hero, server status, join preview, features, about preview, mascots, socials
about.html             Story, vision, goals
join.html              Java + Bedrock join instructions, troubleshooting
rules.html              Server rules
servers.html           Server list (IronVale SMP live, others "coming soon")
private-server.html    Creator private servers info + Discord link
team.html               Team roster (roles, ready for names/avatars)
store.html               Store — coming soon
gifts.html                Gifts & rewards — coming soon
gallery.html             Screenshot/artwork gallery
contact.html             Contact form (front-end only) + Discord/YouTube links
css/style.css            Full design system (colors, type, components, animations)
js/main.js                Loader, nav, particles, reveal-on-scroll, copy-IP, toast, status stub
images/                    Logo, promo art, and mascot skin images
```

## Notes on images

This build ships with your uploaded logo, promo artwork, and two character skin
images, used as the primary branding and recurring mascot art. It does **not**
include AI-generated landscape/character-render artwork (mountains, castles,
custom posed renders, etc.) — that requires an image-generation tool this
build didn't have access to. Decorative atmosphere (embers, glow, skyline
silhouette) is done with CSS/SVG instead. If you get real screenshots or
commissioned art later, drop them into `images/` and swap the `<img>` sources.

## Connecting a live server status API

`js/main.js` has a `fetchServerStatus()` function with a placeholder implementation
and a commented example for wiring up a real API such as:

- https://api.mcstatus.io
- https://api.mcsrvstat.us

Replace the placeholder object with a real `fetch()` call to show live
online/offline state, player count, ping, and version on the homepage status
panel.

## Contact form

`contact.html` includes a front-end-only form (no backend). Wire it up to a
service like Formspree, EmailJS, or your own endpoint to actually receive
messages — right now submitting just shows a confirmation toast.

## Customizing

- Colors, fonts, spacing: `css/style.css` (`:root` at the top has every color/token).
- Nav links, footer, page content: edit directly in each `.html` file, or
  regenerate the simpler inner pages with `build_pages.py` if you want to
  script further changes.
