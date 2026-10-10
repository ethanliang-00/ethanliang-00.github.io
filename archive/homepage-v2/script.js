const workRail = document.querySelector('.work-rail');
const workCard = workRail.querySelector('.work-card');

document.querySelectorAll('.rail-arrow').forEach((button) => {
  button.addEventListener('click', () => {
    const direction = button.dataset.direction === 'next' ? 1 : -1;
    workRail.scrollBy({ left: direction * (workCard.getBoundingClientRect().width + 18), behavior: 'smooth' });
  });
});

const demoStage = document.querySelector('.demo-stage');
const demoPoster = demoStage.querySelector('img');
const demoPlay = demoStage.querySelector('.demo-play');
const demoOptions = [...document.querySelectorAll('.demo-option')];
const demoDetails = document.querySelector('.demo-description');
let activeDemo = demoOptions[0];

function unloadCurrentVideo() {
  const video = demoStage.querySelector('video');
  if (!video) return;
  video.pause();
  video.removeAttribute('src');
  video.load();
  video.remove();
}

demoOptions.forEach((option, index) => {
  option.addEventListener('click', () => {
    if (option === activeDemo) return;
    unloadCurrentVideo();
    activeDemo.classList.remove('is-active');
    activeDemo.setAttribute('aria-pressed', 'false');
    activeDemo = option;
    activeDemo.classList.add('is-active');
    activeDemo.setAttribute('aria-pressed', 'true');
    demoPoster.src = option.dataset.poster;
    demoPoster.alt = option.dataset.alt;
    demoPoster.hidden = false;
    demoPlay.hidden = false;
    demoStage.querySelector('.demo-stage-label').textContent = `PROJECT FILM / ${String(index + 1).padStart(2, '0')}`;
    demoDetails.querySelector('.demo-kicker').textContent = option.dataset.category;
    demoDetails.querySelector('h3').textContent = option.dataset.title;
    demoDetails.querySelector('p').textContent = option.dataset.description;
    demoDetails.querySelector('.demo-duration').textContent = option.dataset.duration;
  });
});

demoPlay.addEventListener('click', () => {
  const video = document.createElement('video');
  video.controls = true;
  video.preload = 'none';
  video.playsInline = true;
  video.poster = demoPoster.src;
  video.setAttribute('aria-label', `${activeDemo.dataset.title} video`);
  video.src = activeDemo.dataset.video;
  demoStage.appendChild(video);
  demoPoster.hidden = true;
  demoPlay.hidden = true;
  video.play().catch(() => {});
});
