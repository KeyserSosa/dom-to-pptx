/**
 * Slide Transitions logic for dom-to-pptx.
 */

const P14_NS = 'xmlns:p14="http://schemas.microsoft.com/office/powerpoint/2010/main"';
const P15_NS = 'xmlns:p15="http://schemas.microsoft.com/office/powerpoint/2012/main"';

const VALID_TRANSITIONS = new Set([
  'fade', 'push', 'wipe', 'strips', 'split', 'reveal', 'cut',
  'randomBar', 'circle', 'flash', 'ripple', 'curtains', 'peelOff'
]);

/**
 * Parses slide transitions from DOM classes on a container.
 * Looks for classes like:
 * - slide-transition-{name} (e.g. slide-transition-push)
 * - transition-dir-{direction} (e.g. transition-dir-u)
 * - transition-dur-{durationMs} (e.g. transition-dur-1500)
 */
export function extractTransitionFromElement(el) {
  let transitionName = null;
  const options = { dir: null, orient: null, dur: null };

  for (const className of el.classList) {
    if (className.startsWith('slide-transition-')) {
      const name = className.replace('slide-transition-', '');
      if (VALID_TRANSITIONS.has(name)) {
        transitionName = name;
      }
    } else if (className.startsWith('transition-dir-')) {
      options.dir = className.replace('transition-dir-', ''); // u, d, l, r, in, out
    } else if (className.startsWith('transition-orient-')) {
      options.orient = className.replace('transition-orient-', ''); // horz, vert
    } else if (className.startsWith('transition-dur-')) {
      const durMatch = className.match(/^transition-dur-(\d+)$/);
      if (durMatch) {
        options.dur = parseInt(durMatch[1], 10);
      }
    }
  }

  return transitionName ? { name: transitionName, ...options } : null;
}

/**
 * Generates the PPTX XML <p:transition> node for a given transition type.
 */
export function getTransitionXml(transitionData) {
  if (!transitionData) return '';
  
  const { name, dir, orient, dur } = transitionData;
  
  // Default PowerPoint speeds
  let spd = 'med';
  let innerXml = '';
  
  const durAttr = dur ? ` p14:dur="${dur}"` : '';
  const baseTag = `<p:transition spd="${spd}"${durAttr ? ` ${P14_NS}${durAttr}` : ''}>`;
  
  switch (name) {
    case 'fade':
      innerXml = '<p:fade/>';
      break;
    case 'push':
      innerXml = `<p:push${dir ? ` dir="${dir}"` : ''}/>`;
      break;
    case 'wipe':
      innerXml = `<p:wipe${dir ? ` dir="${dir}"` : ''}/>`;
      break;
    case 'strips':
      innerXml = `<p:strips${dir ? ` dir="${dir}"` : ''}/>`;
      break;
    case 'split':
      innerXml = `<p:split${orient ? ` orient="${orient}"` : ''}${dir ? ` dir="${dir}"` : ''}/>`;
      break;
    case 'reveal':
      innerXml = `<p14:reveal${dir ? ` dir="${dir}"` : ''}/>`;
      return `<p:transition spd="${spd}" ${P14_NS}${durAttr}>${innerXml}</p:transition>`;
    case 'cut':
      return `<p:transition${durAttr ? ` ${P14_NS}${durAttr}` : ''}><p:cut/></p:transition>`;
    case 'randomBar':
      innerXml = `<p:randomBar${dir ? ` dir="${dir}"` : ''}/>`;
      break;
    case 'circle':
      innerXml = '<p:circle/>';
      break;
    case 'flash':
      innerXml = '<p14:flash/>';
      return `<p:transition spd="${spd}" ${P14_NS}${durAttr}>${innerXml}</p:transition>`;
    case 'ripple':
      innerXml = '<p14:ripple/>';
      return `<p:transition spd="${spd}" ${P14_NS}${durAttr}>${innerXml}</p:transition>`;
    case 'curtains':
      innerXml = `<p15:prstTrans prst="curtains"/>`;
      return `<p:transition spd="${spd}" ${P14_NS} ${P15_NS}${durAttr}>${innerXml}</p:transition>`;
    case 'peelOff':
      innerXml = `<p15:prstTrans prst="peelOff"/>`;
      return `<p:transition spd="${spd}" ${P14_NS} ${P15_NS}${durAttr}>${innerXml}</p:transition>`;
    default:
      return '';
  }

  return `${baseTag}${innerXml}</p:transition>`;
}
