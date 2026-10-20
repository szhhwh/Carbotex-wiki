interface NavbarArtworkProps {
  className?: string;
}

export function NavbarArtwork({ className }: NavbarArtworkProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 204 120"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M24 21C27 10 38 7 51 9C68 8 81 11 91 19C101 27 106 23 114 19C126 13 134 14 142 21C151 13 159 17 166 21C184 20 195 34 198 49C204 65 190 75 173 74C158 75 154 66 144 69C130 73 115 73 105 69C100 67 101 76 98 84C91 107 74 117 52 115C25 112 6 97 5 72C3 49 13 33 24 21Z"
        fill="#fff"
        stroke="#ffc647"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M29 29C33 19 46 17 58 20C78 20 92 35 92 56C94 77 84 101 63 106C43 111 23 99 17 82C10 63 17 42 29 29Z"
        fill="#fbf0dd"
      />
      <path
        d="M38 40C47 29 66 29 77 39C85 47 87 56 80 63C71 72 48 71 37 61C31 55 32 46 38 40Z"
        fill="#cba28d"
      />
      <path d="M35 57C44 48 65 49 80 60C73 70 48 72 37 62Z" fill="#a66f55" />
      <g fill="#d5aa89">
        <circle cx="52" cy="25" r="1.4" />
        <circle cx="62" cy="27" r="1.1" />
        <circle cx="32" cy="34" r="1" />
        <circle cx="86" cy="77" r="1" />
      </g>
      <g stroke="#ffc647" strokeWidth="1.25">
        <path
          d="M112 31C121 25 132 31 134 42C139 53 131 63 122 63C112 64 108 54 108 45C107 39 108 34 112 31Z"
          fill="#ffe7b6"
        />
        <path
          d="M149 29C158 28 164 36 164 44C164 52 156 57 148 53C140 50 138 41 142 35C144 31 146 29 149 29Z"
          fill="#9cd7ca"
        />
        <path
          d="M174 34C184 34 190 43 189 53C189 62 181 68 172 66C163 65 157 60 158 53C159 49 166 48 166 43C166 38 169 35 174 34Z"
          fill="#2f52a1"
        />
      </g>
      <g stroke="#fff" strokeWidth="1.8" strokeLinecap="round">
        <path d="M115 36L116 40M120 35L121 39M149 34L148 38M153 34L153 37M179 51L178 55M183 52L182 56" />
      </g>
      <path
        d="M141 60L146 58M139 65L143 63"
        stroke="#9cd7ca"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M167 40C169 38 171 38 172 39"
        stroke="#4c9bd7"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
