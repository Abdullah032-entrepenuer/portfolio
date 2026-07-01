const fs = require('fs');

const path = 'c:\\Users\\Lenovo\\Desktop\\New folder\\portfolio\\src\\components\\sections\\Vault.module.css';
let content = fs.readFileSync(path, 'utf8');

const replacements = [
  { search: /#111113/g, replace: 'var(--surface)' },
  { search: /rgba\(255,\s*255,\s*255,\s*0\.07\)/g, replace: 'var(--glass-border)' },
  { search: /rgba\(139,\s*92,\s*246,\s*0\.06\)/g, replace: 'var(--crimson-dim)' },
  { search: /rgba\(139,\s*92,\s*246,\s*0\.15\)/g, replace: 'var(--crimson-dim)' },
  { search: /rgba\(139,\s*92,\s*246,\s*0\.2\)/g, replace: 'var(--border-hover)' },
  { search: /rgba\(139,\s*92,\s*246,\s*0\.5\)/g, replace: 'var(--crimson-glow)' },
  { search: /rgba\(139,\s*92,\s*246,\s*0\.6\)/g, replace: 'var(--crimson-glow)' },
  { search: /#8B5CF6/gi, replace: 'var(--crimson)' },
  { search: /rgba\(200,\s*255,\s*0,\s*0\.04\)/g, replace: 'var(--mint-dim)' },
  { search: /rgba\(200,\s*255,\s*0,\s*0\.05\)/g, replace: 'var(--mint-dim)' },
  { search: /rgba\(200,\s*255,\s*0,\s*0\.06\)/g, replace: 'var(--mint-dim)' },
  { search: /rgba\(200,\s*255,\s*0,\s*0\.08\)/g, replace: 'var(--mint-dim)' },
  { search: /rgba\(200,\s*255,\s*0,\s*0\.1\)/g, replace: 'var(--mint-dim)' },
  { search: /rgba\(200,\s*255,\s*0,\s*0\.15\)/g, replace: 'var(--mint-dim)' },
  { search: /rgba\(200,\s*255,\s*0,\s*0\.2\)/g, replace: 'var(--border-hover)' },
  { search: /rgba\(200,\s*255,\s*0,\s*0\.25\)/g, replace: 'var(--mint-dim)' },
  { search: /rgba\(200,\s*255,\s*0,\s*0\.3\)/g, replace: 'var(--mint-dim)' },
  { search: /rgba\(200,\s*255,\s*0,\s*0\.5\)/g, replace: 'var(--mint-glow)' },
  { search: /#C8FF00/gi, replace: 'var(--mint)' },
  { search: /rgba\(255,\s*255,\s*255,\s*0\.1\)/g, replace: 'var(--border-hover)' },
  { search: /#0d0d0f/gi, replace: 'var(--void)' },
  { search: /#0a0a0b/gi, replace: 'var(--void)' },
  { search: /rgba\(255,\s*255,\s*255,\s*0\.03\)/g, replace: 'var(--glass-bg)' },
  { search: /rgba\(255,\s*255,\s*255,\s*0\.06\)/g, replace: 'var(--glass-bg-hover)' },
  { search: /rgba\(255,\s*255,\s*255,\s*0\.05\)/g, replace: 'var(--border)' },
  { search: /rgba\(255,\s*255,\s*255,\s*0\.04\)/g, replace: 'var(--text-ghost)' },
  { search: /rgba\(255,\s*255,\s*255,\s*0\.08\)/g, replace: 'var(--border)' },
  { search: /rgba\(255,\s*255,\s*255,\s*0\.12\)/g, replace: 'var(--border-hover)' },
  { search: /rgba\(255,\s*255,\s*255,\s*0\.14\)/g, replace: 'var(--border-hover)' },
  { search: /rgba\(255,\s*255,\s*255,\s*0\.2\)/g, replace: 'var(--text-muted)' },
];

for (const r of replacements) {
  content = content.replace(r.search, r.replace);
}

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated Vault.module.css');
