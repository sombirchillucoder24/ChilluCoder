// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      textColor: {
        skin: {
          base: 'var(--color-foreground)',
          muted: 'var(--color-muted)',
          accent: 'var(--color-accent)',
        },
      },
      backgroundColor: {
        skin: {
          base: 'var(--color-background)',
          muted: 'var(--color-muted)',
          accent: 'var(--color-accent)',
        },
      },
      borderColor: {
        skin: {
          base: 'var(--color-border)',
        },
      },
    },
  },
}
