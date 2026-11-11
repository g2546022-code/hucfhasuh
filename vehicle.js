
/* HIACE CUSTOM LAB — detailed 2D vector illustration
   200-series HiAce / Super GL inspired. */
'use strict';

const state = {
  view: 'side',
  color: '#e8e7e2',
  colorName: 'パールホワイト',
  wheel: 'factory',
  tail: 'factory',
  fender: false,
  mudflap: false,
  lip: false,
  spoiler: false,
  sidestep: false
};

const svg = document.getElementById('vehicle');

function paintDefs() {
  return `
  <defs>
    <linearGradient id="bodyPaint" x1="0" y1="0" x2="0.08" y2="1">
      <stop offset="0" stop-color="${state.color}"/>
      <stop offset=".18" stop-color="${state.color}"/>
      <stop offset=".46" stop-color="${state.color}"/>
      <stop offset=".7" stop-color="#7b858e" stop-opacity=".15"/>
      <stop offset="1" stop-color="#111820" stop-opacity=".48"/>
    </linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2=".9" y2="1">
      <stop offset="0" stop-color="#a9c0d0"/>
      <stop offset=".26" stop-color="#657f92"/>
      <stop offset=".62" stop-color="#354b5d"/>
      <stop offset="1" stop-color="#1b2c3a"/>
    </linearGradient>
    <linearGradient id="glassFront" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#a7bfce"/>
      <stop offset=".45" stop-color="#637d90"/>
      <stop offset="1" stop-color="#263b4b"/>
    </linearGradient>
    <linearGradient id="tire" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#515960"/>
      <stop offset=".18" stop-color="#171c21"/>
      <stop offset=".68" stop-color="#080b0f"/>
      <stop offset="1" stop-color="#414951"/>
    </linearGradient>
    <linearGradient id="rim" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f2f5f6"/>
      <stop offset=".28" stop-color="#7f8b95"/>
      <stop offset=".56" stop-color="#303a44"/>
      <stop offset=".82" stop-color="#bec7cf"/>
      <stop offset="1" stop-color="#58636d"/>
    </linearGradient>
    <radialGradient id="dish" cx="38%" cy="32%" r="72%">
      <stop offset="0" stop-color="#f1f4f5"/>
      <stop offset=".55" stop-color="#aab4bc"/>
      <stop offset="1" stop-color="#424c56"/>
    </radialGradient>
    <linearGradient id="chrome" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fff"/>
      <stop offset=".22" stop-color="#687580"/>
      <stop offset=".48" stop-color="#f3f6f7"/>
      <stop offset=".72" stop-color="#64717c"/>
      <stop offset="1" stop-color="#fff"/>
    </linearGradient>
    <linearGradient id="bumper" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#68737d"/>
      <stop offset=".35" stop-color="#303943"/>
      <stop offset="1" stop-color="#10151b"/>
    </linearGradient>
    <linearGradient id="lamp" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fff9e8"/>
      <stop offset=".45" stop-color="#d8d8cf"/>
      <stop offset="1" stop-color="#8f999e"/>
    </linearGradient>
    <filter id="softShadow" x="-30%" y="-30%" width="160%" height="180%">
      <feGaussianBlur stdDeviation="12"/>
    </filter>
    <filter id="smallShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="3"/>
    </filter>
  </defs>`;
}

function wheelMarkup(cx, cy, r = 68) {
  const spokeLines = (count, width, color, inner = 14, outer = r - 11, offset = -Math.PI / 2) => {
    let output = '';
    for (let i = 0; i < count; i++) {
      const a = i * Math.PI * 2 / count + offset;
      const x1 = cx + Math.cos(a) * inner;
      const y1 = cy + Math.sin(a) * inner;
      const x2 = cx + Math.cos(a) * outer;
      const y2 = cy + Math.sin(a) * outer;
      output += `<path d="M${x1.toFixed(2)} ${y1.toFixed(2)} L${x2.toFixed(2)} ${y2.toFixed(2)}" stroke="${color}" stroke-width="${width}" stroke-linecap="round"/>`;
    }
    return output;
  };

  let face = '';

  if (state.wheel === 'factory') {
    face = `<circle cx="${cx}" cy="${cy}" r="${r-9}" fill="#424c56" stroke="#c8d0d6" stroke-width="3"/>
      ${spokeLines(8, 8, '#c5cdd4', 19, r-14)}
      <circle cx="${cx}" cy="${cy}" r="19" fill="#aab4bc" stroke="#e0e5e9" stroke-width="3"/>`;

  } else if (state.wheel === 'mesh') {
    face = `<circle cx="${cx}" cy="${cy}" r="${r-9}" fill="#252d36" stroke="#cbd2d8" stroke-width="3"/>`;
    for (let i = 0; i < 16; i++) {
      const a = i * Math.PI / 8;
      const x1 = cx + Math.cos(a) * 18;
      const y1 = cy + Math.sin(a) * 18;
      const x2 = cx + Math.cos(a + .18) * (r - 13);
      const y2 = cy + Math.sin(a + .18) * (r - 13);
      face += `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="#c9d1d8" stroke-width="3"/>`;
    }
    face += spokeLines(8, 3, '#f0f3f5', 13, r - 15) +
      `<circle cx="${cx}" cy="${cy}" r="15" fill="#9da8b2"/>`;

  } else if (state.wheel === 'dish') {
    face = `<circle cx="${cx}" cy="${cy}" r="${r-8}" fill="url(#dish)" stroke="#edf0f2" stroke-width="3"/>
      <circle cx="${cx}" cy="${cy}" r="${r-22}" fill="none" stroke="#727e88" stroke-width="2"/>
      <circle cx="${cx}" cy="${cy}" r="22" fill="#36414b" stroke="#d9dfe4" stroke-width="4"/>`;

  } else if (state.wheel === 'sixspoke') {
    face = `<circle cx="${cx}" cy="${cy}" r="${r-9}" fill="#303943" stroke="#d6dde2" stroke-width="3"/>
      ${spokeLines(6, 12, '#cdd5dc', 19, r-14)}
      <circle cx="${cx}" cy="${cy}" r="18" fill="#68747f" stroke="#e8ecef" stroke-width="3"/>`;

  } else if (state.wheel === 'offroad') {
    face = `<circle cx="${cx}" cy="${cy}" r="${r-9}" fill="#252e37" stroke="#aeb8c1" stroke-width="5" stroke-dasharray="8 5"/>
      ${spokeLines(8, 9, '#8996a1', 19, r-15)}
      <circle cx="${cx}" cy="${cy}" r="18" fill="#414c56" stroke="#d0d7dd" stroke-width="3"/>`;

  } else if (state.wheel === 'black') {
    face = `<circle cx="${cx}" cy="${cy}" r="${r-9}" fill="#11161c" stroke="#66727d" stroke-width="3"/>
      ${spokeLines(10, 6, '#4b5661', 19, r-14)}
      <circle cx="${cx}" cy="${cy}" r="17" fill="#87939e" stroke="#1e252d" stroke-width="4"/>`;

  } else if (state.wheel === 'steel') {
    face = `<circle cx="${cx}" cy="${cy}" r="${r-9}" fill="#aeb8c0" stroke="#edf0f2" stroke-width="3"/>
      ${spokeLines(10, 8, '#515d68', 19, r-14)}
      <circle cx="${cx}" cy="${cy}" r="18" fill="#d3d9de" stroke="#5a6671" stroke-width="3"/>`;

  } else {
    face = `<circle cx="${cx}" cy="${cy}" r="${r-9}" fill="url(#chrome)" stroke="#f4f6f7" stroke-width="3"/>
      ${spokeLines(8, 8, '#eef2f5', 19, r-14)}
      <circle cx="${cx}" cy="${cy}" r="18" fill="#e1e7eb" stroke="#64717c" stroke-width="3"/>`;
  }

  let tread = '';
  for (let i = 0; i < 24; i++) {
    const a = i * Math.PI * 2 / 24;
    const x1 = cx + Math.cos(a) * (r + 5);
    const y1 = cy + Math.sin(a) * (r + 5);
    const x2 = cx + Math.cos(a) * (r + 11);
    const y2 = cy + Math.sin(a) * (r + 11);
    tread += `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="#59616a" stroke-width="2"/>`;
  }

  let bolts = '';
  for (let i = 0; i < 5; i++) {
    const a = i * Math.PI * 2 / 5 - Math.PI / 2;
    bolts += `<circle cx="${(cx + Math.cos(a) * 29).toFixed(1)}" cy="${(cy + Math.sin(a) * 29).toFixed(1)}" r="3.2" fill="#303943" stroke="#dbe0e4" stroke-width="1.2"/>`;
  }

  return `<g>
    <circle cx="${cx}" cy="${cy}" r="${r+12}" fill="url(#tire)" stroke="#070a0e" stroke-width="5"/>
    <circle cx="${cx}" cy="${cy}" r="${r+7}" fill="none" stroke="#303840" stroke-width="3"/>
    ${tread}
    <circle cx="${cx}" cy="${cy}" r="${r+2}" fill="none" stroke="#78828b" stroke-width="2" opacity=".5"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#rim)" stroke="#141a20" stroke-width="3"/>
    ${face}${bolts}
    <circle cx="${cx}" cy="${cy}" r="${r-4}" fill="none" stroke="#f1f4f6" stroke-width="1.4" opacity=".28"/>
  </g>`;
}

function tailShape(x, y, w, h, horizontal = false) {
  const palettes = {
    factory: ['#a52029', '#e2ddd2', '#812027'],
    clear: ['#dce5e9', '#f8f8f2', '#bdcbd3'],
    smoke: ['#343d46', '#8b969e', '#252d35'],
    led: ['#b71f2b', '#f5e9e6', '#9d1723'],
    redclear: ['#c52d35', '#f1d8d1', '#a91f29']
  };
  const p = palettes[state.tail] || palettes.factory;

  if (horizontal) {
    return `<g>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="#111820" stroke="#090d12" stroke-width="4"/>
      <rect x="${x+4}" y="${y+4}" width="${w-8}" height="${h-8}" rx="3" fill="${p[0]}"/>
      <path d="M${x+6} ${y+h*.38} H${x+w-6}" stroke="${p[1]}" stroke-width="${h*.18}"/>
      <path d="M${x+6} ${y+h*.68} H${x+w-6}" stroke="${p[2]}" stroke-width="${h*.13}"/>
      ${state.tail === 'led' ? `<path d="M${x+12} ${y+6} V${y+h-6} M${x+w-12} ${y+6} V${y+h-6}" stroke="#fff" stroke-width="3"/>` : ''}
      <path d="M${x+6} ${y+5} H${x+w-6}" stroke="#fff" stroke-width="2" opacity=".3"/>
    </g>`;
  }

  return `<g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#111820" stroke="#080c11" stroke-width="4"/>
    <rect x="${x+4}" y="${y+4}" width="${w-8}" height="${h-8}" rx="4" fill="${p[0]}"/>
    <path d="M${x+5} ${y+h*.34} H${x+w-5}" stroke="${p[1]}" stroke-width="${w*.24}"/>
    <path d="M${x+5} ${y+h*.69} H${x+w-5}" stroke="${p[2]}" stroke-width="${w*.2}"/>
    ${state.tail === 'led' ? `<path d="M${x+8} ${y+9} V${y+h-9} M${x+w-8} ${y+9} V${y+h-9}" stroke="#fff" stroke-width="3"/>` : ''}
    <path d="M${x+6} ${y+6} V${y+h-6}" stroke="#fff" stroke-width="2" opacity=".24"/>
  </g>`;
}

function mirror(x, y, flip = false) {
  return `<g transform="translate(${x} ${y}) ${flip ? 'scale(-1 1)' : ''}">
    <path d="M0 8 L20 16 L23 36" fill="none" stroke="#202832" stroke-width="9" stroke-linecap="round"/>
    <path d="M8 0 Q35 -5 44 9 L42 35 Q26 44 7 29Z" fill="#202832" stroke="#080d12" stroke-width="4"/>
    <path d="M14 5 Q31 1 38 11 L36 23 Q24 29 12 22Z" fill="#71899a" stroke="#9eabb6" stroke-width="2"/>
    <path d="M14 7 Q28 2 36 10" fill="none" stroke="#e9f0f4" stroke-width="2" opacity=".45"/>
  </g>`;
}

function sideView() {
  return `
  <ellipse cx="600" cy="599" rx="493" ry="30" fill="#020508" opacity=".62" filter="url(#softShadow)"/>
  ${wheelMarkup(319, 512, 68)}
  ${wheelMarkup(890, 512, 68)}

  <path d="M112 518 L112 309 Q112 278 137 255 L225 181 Q251 158 291 158 H1001 Q1044 158 1067 194 L1092 243 Q1103 265 1103 292 V518 H1001 A111 111 0 0 0 779 518 H430 A111 111 0 0 0 208 518 Z"
    fill="url(#bodyPaint)" stroke="#080d13" stroke-width="9" stroke-linejoin="round"/>

  <path d="M126 300 L228 194 Q250 176 281 176 L296 176 L296 334 H126Z"
    fill="url(#glass)" stroke="#192631" stroke-width="8" stroke-linejoin="round"/>
  <path d="M143 291 L236 201 Q252 188 269 187" fill="none" stroke="#edf4f7" stroke-width="6" opacity=".23"/>
  <path d="M309 176 H445 V334 H309Z" fill="url(#glass)" stroke="#192631" stroke-width="8"/>
  <path d="M459 176 H617 V334 H459Z" fill="url(#glass)" stroke="#192631" stroke-width="8"/>
  <path d="M631 176 H790 V334 H631Z" fill="url(#glass)" stroke="#192631" stroke-width="8"/>
  <path d="M804 176 H986 Q1008 176 1021 202 L1071 283 V334 H804Z" fill="url(#glass)" stroke="#192631" stroke-width="8"/>

  <path d="M150 286 L238 198 M326 188 H426 M477 188 H595 M649 188 H767 M825 188 H970"
    fill="none" stroke="#f4f7f9" stroke-width="5" opacity=".2"/>
  <path d="M321 204 L431 204 M471 204 L602 204 M644 204 L777 204 M817 204 L975 204"
    stroke="#bed0dc" stroke-width="2" opacity=".12"/>

  <path d="M299 159 L299 492 M449 166 L449 482 M620 166 L620 480 M799 166 L799 482 M1034 214 L1034 488"
    fill="none" stroke="#454f58" stroke-width="3" opacity=".8"/>
  <path d="M303 167 L303 490 M453 174 L453 478 M624 174 L624 478 M803 174 L803 478"
    fill="none" stroke="#fff" stroke-width="1.5" opacity=".18"/>

  <path d="M349 365 H397 Q402 365 402 371 V378 H349Z M671 365 H719 Q724 365 724 371 V378 H671Z"
    fill="#303942" stroke="#161d24" stroke-width="3"/>
  <path d="M352 366 H397 M674 366 H719" stroke="#d6dde2" stroke-width="2" opacity=".55"/>
  <path d="M468 351 H786" stroke="#515c66" stroke-width="3" opacity=".58"/>
  <path d="M468 355 H786" stroke="#e2e7ea" stroke-width="1.4" opacity=".18"/>

  ${mirror(270, 278, false)}
  <path d="M118 444 H1088" stroke="#fff" stroke-width="2" opacity=".17"/>
  <path d="M116 465 H1090" stroke="#111820" stroke-width="9" opacity=".42"/>
  <path d="M120 471 H1080" stroke="#9da8b0" stroke-width="2" opacity=".25"/>

  <path d="M112 309 L132 302 L145 334 L133 397 L112 408Z" fill="url(#bumper)" stroke="#0a0e13" stroke-width="5"/>
  <path d="M115 322 Q128 316 143 321 L137 355 Q126 361 115 354Z" fill="url(#lamp)" stroke="#252d35" stroke-width="4"/>
  <path d="M119 326 L136 326 M117 337 L135 337 M116 347 L133 347" stroke="#a0a8a9" stroke-width="2" opacity=".65"/>
  <path d="M114 372 L137 367 L134 383 L113 389Z" fill="#d5b36e" stroke="#252d35" stroke-width="3"/>
  <path d="M106 408 H143 V474 H106Z" fill="url(#bumper)" stroke="#080d13" stroke-width="5"/>

  ${tailShape(1060, 367, 30, 103)}
  <path d="M1080 474 H1100 V518 H1070Z" fill="url(#bumper)" stroke="#080d13" stroke-width="4"/>

  <path d="M112 486 H1100 V520 H112Z" fill="url(#bumper)" stroke="#0a0e13" stroke-width="5"/>
  <path d="M120 492 H1080" stroke="#bac2c9" stroke-width="2" opacity=".28"/>
  ${state.sidestep ? `<path d="M423 510 H790 L815 535 H401Z" fill="#141b22" stroke="#070b10" stroke-width="4"/><path d="M430 518 H798" stroke="#88949f" stroke-width="3"/>` : ''}
  ${state.lip ? `<path d="M106 505 L156 531 H1043 L1104 505 L1084 546 H127Z" fill="#10171e" stroke="#070b10" stroke-width="5"/>` : ''}
  ${state.spoiler ? `<path d="M964 154 L1051 154 L1090 181 L1076 194 L981 177Z" fill="#151b22" stroke="#080d12" stroke-width="4"/><path d="M976 159 L1050 159" stroke="#687580" stroke-width="2"/>` : ''}

  <path d="M213 518 A106 106 0 0 1 425 518 M784 518 A106 106 0 0 1 996 518"
    fill="none" stroke="#171e25" stroke-width="9" opacity=".95"/>
  ${state.fender ? `<g fill="none" stroke="#11171e" stroke-width="18"><path d="M204 518 A115 115 0 0 1 434 518"/><path d="M775 518 A115 115 0 0 1 1005 518"/></g><g fill="none" stroke="#606b75" stroke-width="2" opacity=".75"><path d="M216 511 A103 103 0 0 1 422 511"/><path d="M787 511 A103 103 0 0 1 993 511"/></g>` : ''}
  ${state.mudflap ? `<path d="M203 495 L211 575 Q213 582 222 582 H255 L248 495Z M774 495 L782 575 Q784 582 793 582 H826 L819 495Z" fill="#10161d" stroke="#070b10" stroke-width="4"/><path d="M217 570 H253 M788 570 H824" stroke="#737e88" stroke-width="2"/>` : ''}

  <path d="M280 160 H1000 Q1034 160 1054 185" fill="none" stroke="#fff" stroke-width="5" opacity=".35"/>
  <path d="M154 262 L226 196 Q253 169 292 168 H997" fill="none" stroke="#fff" stroke-width="2" opacity=".18"/>
  <path d="M140 481 H1060" stroke="#fff" stroke-width="2" opacity=".13"/>
  `;
}

function frontView() {
  const headlight = (x, flip = false) => `<g transform="translate(${x} 0) ${flip ? 'scale(-1 1)' : ''}">
    <path d="M0 337 Q28 315 99 323 L112 392 Q75 405 13 391Z" fill="#151d25" stroke="#080d12" stroke-width="6"/>
    <path d="M9 340 Q36 327 91 332 L101 383 Q63 392 19 382Z" fill="url(#lamp)" stroke="#9aa4ab" stroke-width="2"/>
    <path d="M17 346 Q48 335 87 339 M20 360 H94 M22 373 H96" fill="none" stroke="#a1a9ab" stroke-width="3" opacity=".75"/>
    <path d="M89 334 L101 382" stroke="#fff" stroke-width="4" opacity=".35"/>
    </g>`;

  return `
  <ellipse cx="600" cy="601" rx="300" ry="28" fill="#020508" opacity=".58" filter="url(#softShadow)"/>
  ${wheelMarkup(340, 545, 68)}${wheelMarkup(860, 545, 68)}

  <path d="M261 554 L261 215 Q261 166 309 143 Q371 113 600 113 Q829 113 891 143 Q939 166 939 215 V554 Q939 582 908 589 H292 Q261 582 261 554Z"
    fill="url(#bodyPaint)" stroke="#080d13" stroke-width="10"/>
  <path d="M300 160 Q364 133 600 133 Q836 133 900 160 L923 316 H277Z"
    fill="url(#glassFront)" stroke="#192631" stroke-width="10"/>
  <path d="M318 166 Q395 145 520 143 M680 143 Q805 145 882 166" fill="none" stroke="#f3f7f9" stroke-width="6" opacity=".23"/>
  <path d="M600 140 V310" stroke="#263846" stroke-width="5" opacity=".75"/>
  <path d="M306 303 H894" stroke="#d6e0e6" stroke-width="3" opacity=".18"/>

  ${mirror(242, 268, false)}${mirror(958, 268, true)}

  <path d="M278 318 Q600 341 922 318 L926 382 Q600 405 274 382Z"
    fill="url(#bodyPaint)" stroke="#121920" stroke-width="5"/>
  <path d="M294 329 Q600 350 906 329" fill="none" stroke="#fff" stroke-width="3" opacity=".28"/>

  ${headlight(280, false)}${headlight(920, true)}

  <path d="M386 397 Q600 409 814 397 L800 489 H400Z"
    fill="#171e26" stroke="#080d13" stroke-width="7"/>
  <path d="M407 416 H793 M403 439 H797 M400 462 H800"
    stroke="#68737d" stroke-width="7"/>
  <path d="M408 415 H792" stroke="#c8d0d7" stroke-width="2" opacity=".35"/>
  <path d="M560 399 Q600 389 640 399 L633 425 H567Z" fill="#aeb9c2" stroke="#303943" stroke-width="3"/>
  <ellipse cx="600" cy="408" rx="13" ry="8" fill="#26313b" stroke="#e1e6e9" stroke-width="2"/>

  <path d="M270 490 Q600 523 930 490 L930 555 Q930 582 905 588 H295 Q270 582 270 555Z"
    fill="url(#bumper)" stroke="#080d13" stroke-width="8"/>
  <path d="M288 517 Q600 543 912 517" fill="none" stroke="#aab4bd" stroke-width="3" opacity=".32"/>
  <path d="M294 526 Q328 518 363 530 L359 558 Q324 564 291 551Z" fill="#1a222b" stroke="#090e13" stroke-width="4"/>
  <path d="M906 526 Q872 518 837 530 L841 558 Q876 564 909 551Z" fill="#1a222b" stroke="#090e13" stroke-width="4"/>
  <ellipse cx="328" cy="542" rx="18" ry="9" fill="#d6d8d0" stroke="#606a72" stroke-width="3"/>
  <ellipse cx="872" cy="542" rx="18" ry="9" fill="#d6d8d0" stroke="#606a72" stroke-width="3"/>
  <path d="M280 570 H920" stroke="#0b1016" stroke-width="9"/>
  <rect x="535" y="545" width="130" height="30" rx="4" fill="#171d24" stroke="#65717c" stroke-width="2"/>

  ${state.fender ? `<path d="M247 560 A94 94 0 0 1 433 560 M767 560 A94 94 0 0 1 953 560" fill="none" stroke="#11171e" stroke-width="19"/>` : ''}
  ${state.lip ? `<path d="M264 571 Q600 607 936 571 L912 610 H288Z" fill="#10161d" stroke="#06090d" stroke-width="5"/>` : ''}
  ${state.spoiler ? `<path d="M296 145 Q600 105 904 145 L888 162 Q600 128 312 162Z" fill="#171d24" stroke="#070c11" stroke-width="4"/>` : ''}
  ${state.mudflap ? `<path d="M285 550 L280 612 H331 L328 558 M915 550 L920 612 H869 L872 558" fill="#111820" stroke="#06090d" stroke-width="4"/>` : ''}
  `;
}

function rearView() {
  return `
  <ellipse cx="600" cy="601" rx="300" ry="28" fill="#020508" opacity=".58" filter="url(#softShadow)"/>
  ${wheelMarkup(340, 547, 68)}${wheelMarkup(860, 547, 68)}
  <path d="M261 553 V177 Q261 124 310 124 H890 Q939 124 939 177 V553 Q939 582 908 589 H292 Q261 582 261 553Z"
    fill="url(#bodyPaint)" stroke="#080d13" stroke-width="10"/>

  <path d="M327 158 Q327 148 342 148 H858 Q873 148 873 158 V391 H327Z"
    fill="url(#glass)" stroke="#192631" stroke-width="10"/>
  <path d="M600 151 V387" stroke="#263845" stroke-width="6"/>
  <path d="M347 169 H572 M629 169 H853" stroke="#eef4f7" stroke-width="5" opacity=".21"/>
  <path d="M342 175 L342 374 M858 175 L858 374" stroke="#e1e8ed" stroke-width="2" opacity=".12"/>
  <path d="M360 182 L360 368 M840 182 L840 368" stroke="#263440" stroke-width="2" opacity=".6"/>

  <path d="M690 359 Q744 348 793 357" stroke="#151d25" stroke-width="8" stroke-linecap="round"/>
  <path d="M691 358 L783 347" stroke="#8996a0" stroke-width="2"/>
  <rect x="546" y="127" width="108" height="10" rx="4" fill="#a5232b" stroke="#111820" stroke-width="3"/>

  <path d="M600 394 V492" stroke="#454f59" stroke-width="4"/>
  <path d="M571 407 H592 V420 H571Z M608 407 H629 V420 H608Z" fill="#303a44" stroke="#161d24" stroke-width="3"/>
  <path d="M576 408 H591 M613 408 H628" stroke="#dbe1e5" stroke-width="1.5" opacity=".55"/>
  <path d="M279 398 H921 V481 H279Z" fill="url(#bodyPaint)" stroke="#3c4650" stroke-width="3"/>

  ${tailShape(274, 393, 56, 139)}
  ${tailShape(870, 393, 56, 139)}

  <rect x="481" y="434" width="238" height="49" rx="4" fill="#dce0e2" stroke="#202832" stroke-width="4"/>
  <text x="600" y="465" text-anchor="middle" font-size="21" letter-spacing="7" font-weight="700" fill="#46525d">HIACE</text>
  <path d="M497 491 H703" stroke="#6a7680" stroke-width="3" opacity=".45"/>
  <rect x="551" y="500" width="98" height="26" rx="4" fill="#131a21" stroke="#4c5863" stroke-width="2"/>

  <path d="M270 520 H930 V557 Q930 582 905 589 H295 Q270 582 270 557Z"
    fill="url(#bumper)" stroke="#080d13" stroke-width="8"/>
  <path d="M286 535 H914" stroke="#b2bbc2" stroke-width="3" opacity=".32"/>
  <path d="M285 550 H915" stroke="#080d13" stroke-width="7"/>
  <rect x="297" y="535" width="57" height="20" rx="5" fill="#b8c2c8" stroke="#27313a" stroke-width="3"/>
  <rect x="846" y="535" width="57" height="20" rx="5" fill="#b8c2c8" stroke="#27313a" stroke-width="3"/>

  ${state.fender ? `<path d="M247 559 A94 94 0 0 1 433 559 M767 559 A94 94 0 0 1 953 559" fill="none" stroke="#11171e" stroke-width="19"/>` : ''}
  ${state.lip ? `<path d="M264 571 H936 L912 610 H288Z" fill="#10161d" stroke="#06090d" stroke-width="5"/>` : ''}
  ${state.spoiler ? `<path d="M242 143 H958 L938 120 H262Z" fill="#171d24" stroke="#070c11" stroke-width="4"/>` : ''}
  ${state.mudflap ? `<path d="M284 548 L280 612 H331 L328 557 M916 548 L920 612 H869 L872 557" fill="#111820" stroke="#06090d" stroke-width="4"/>` : ''}
  `;
}

function render() {
  svg.innerHTML = paintDefs() + (
    state.view === 'side' ? sideView() :
    state.view === 'front' ? frontView() : rearView()
  );

  document.getElementById('viewName').textContent =
    `${state.view.toUpperCase()} VIEW`;

  document.querySelectorAll('.view-tab').forEach(button => {
    button.classList.toggle('active', button.dataset.view === state.view);
  });
}

function selectOption(containerId, key, event) {
  const button = event.target.closest('button[data-value]');
  if (!button) return;

  state[key] = button.dataset.value;

  document.querySelectorAll(`#${containerId} button`).forEach(item => {
    item.classList.toggle('selected', item === button);
  });

  render();
}

document.querySelectorAll('.view-tab').forEach(button => {
  button.addEventListener('click', () => {
    state.view = button.dataset.view;
    render();
  });
});

document.getElementById('wheelOptions').addEventListener('click', event => {
  selectOption('wheelOptions', 'wheel', event);
});

document.getElementById('tailOptions').addEventListener('click', event => {
  selectOption('tailOptions', 'tail', event);
});

document.getElementById('bodyColor').addEventListener('input', event => {
  state.color = event.target.value;
  state.colorName = 'カスタムカラー';

  document.getElementById('colorName').textContent = state.colorName;
  document.getElementById('colorPreview').style.background = state.color;

  document.querySelectorAll('.swatch').forEach(item => {
    item.classList.remove('active');
  });

  render();
});

document.getElementById('swatches').addEventListener('click', event => {
  const button = event.target.closest('.swatch');
  if (!button) return;

  state.color = button.dataset.color;
  state.colorName = button.dataset.name;

  document.getElementById('bodyColor').value = state.color;
  document.getElementById('colorName').textContent = state.colorName;
  document.getElementById('colorPreview').style.background = state.color;

  document.querySelectorAll('.swatch').forEach(item => {
    item.classList.toggle('active', item === button);
  });

  render();
});

['fender', 'mudflap', 'lip', 'spoiler', 'sidestep'].forEach(key => {
  document.getElementById(key).addEventListener('change', event => {
    state[key] = event.target.checked;
    render();
  });
});

document.getElementById('reset').addEventListener('click', () => {
  Object.assign(state, {
    view: 'side',
    color: '#e8e7e2',
    colorName: 'パールホワイト',
    wheel: 'factory',
    tail: 'factory',
    fender: false,
    mudflap: false,
    lip: false,
    spoiler: false,
    sidestep: false
  });

  document.getElementById('bodyColor').value = state.color;
  document.getElementById('colorName').textContent = state.colorName;
  document.getElementById('colorPreview').style.background = state.color;

  document.querySelectorAll('.swatch').forEach(item => {
    item.classList.toggle('active', item.dataset.color === state.color);
  });

  document.querySelectorAll('#wheelOptions button').forEach(item => {
    item.classList.toggle('selected', item.dataset.value === 'factory');
  });

  document.querySelectorAll('#tailOptions button').forEach(item => {
    item.classList.toggle('selected', item.dataset.value === 'factory');
  });

  ['fender', 'mudflap', 'lip', 'spoiler', 'sidestep'].forEach(key => {
    document.getElementById(key).checked = false;
  });

  render();
});

render();
