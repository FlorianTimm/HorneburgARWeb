const fs = require('fs').promises;
const path = require('path');

const root = path.resolve(__dirname, '..');
const artifacts = path.join(root, 'public', 'artifacts');
const referenceDirs = ['xtra_large', 'medium'];
const targetDirs = ['large', 'small'];

function getPrefix(name) {
  const m = name.match(/^(\d+)(?:[_\-\s]|$)/);
  return m ? m[1] : null;
}

async function buildReferenceMap() {
  const map = new Map();
  for (const dir of referenceDirs) {
    const p = path.join(artifacts, dir);
    let files = [];
    try {
      files = await fs.readdir(p);
    } catch (e) {
      continue;
    }
    files.sort();
    for (const f of files) {
      const pref = getPrefix(f);
      if (!pref) continue;
      if (!map.has(pref)) map.set(pref, []);
      map.get(pref).push(f);
    }
  }
  return map;
}

async function renameInDir(dir, refMap) {
  const p = path.join(artifacts, dir);
  const files = (await fs.readdir(p)).sort();
  // group by prefix
  const groups = new Map();
  for (const f of files) {
    const pref = getPrefix(f) || 'x';
    if (!groups.has(pref)) groups.set(pref, []);
    groups.get(pref).push(f);
  }

  const ops = [];
  for (const [pref, groupFiles] of groups) {
    const refs = refMap.get(pref);
    if (!refs || refs.length === 0) {
      console.warn(`No reference names for prefix ${pref}, skipping ${dir}/${pref}`);
      continue;
    }
    // sort to have stable order
    groupFiles.sort();
    for (let i = 0; i < groupFiles.length; i++) {
      const src = groupFiles[i];
      const refName = refs[i] || refs[0];
      const dst = refName;
      if (src === dst) continue;
      const srcPath = path.join(p, src);
      const dstPath = path.join(p, dst);
      ops.push({srcPath, dstPath, src, dst});
    }
  }

  // perform renames, but check for conflicts
  for (const op of ops) {
    try {
      // if destination exists, skip
      try {
        await fs.access(op.dstPath);
        console.warn(`Target exists, skipping: ${op.dst}`);
        continue;
      } catch (e) {
        // not exists, ok
      }
      await fs.rename(op.srcPath, op.dstPath);
      console.log(`Renamed ${op.src} -> ${op.dst}`);
    } catch (e) {
      console.error(`Failed to rename ${op.src} -> ${op.dst}:`, e.message);
    }
  }
}

(async () => {
  try {
    const refMap = await buildReferenceMap();
    for (const dir of targetDirs) {
      console.log('\nProcessing', dir);
      await renameInDir(dir, refMap);
    }
    console.log('\nDone.');
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
