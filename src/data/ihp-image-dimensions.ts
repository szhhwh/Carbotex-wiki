export type IhpImageDimensions = readonly [
  intrinsicWidth: number,
  intrinsicHeight: number,
];

// Hosted source dimensions for IHP figures whose legacy ratio values differed
// from the files that are currently published.
const IHP_IMAGE_DIMENSIONS: Record<string, IhpImageDimensions> = {
  "https://static.igem.wiki/teams/6147/wiki/20261020221919-1398-4.avif": [
    1706, 1279,
  ],
  "https://static.igem.wiki/teams/6147/wiki/20261020223345-1399-4.avif": [
    1279, 1706,
  ],
  "https://static.igem.wiki/teams/6147/wiki/certification.avif": [2000, 1414],
  "https://static.igem.wiki/teams/6147/wiki/fc2c9b46daadd10dde634f09106886cc.avif":
    [1067, 1354],
  "https://static.igem.wiki/teams/6147/wiki/ihp-2.avif": [4000, 3000],
  "https://static.igem.wiki/teams/6147/wiki/ihp-3-4-lab-safety-training.avif": [
    2048, 521,
  ],
  "https://static.igem.wiki/teams/6147/wiki/ihp-art-science-01-carbotex-musical-performance.avif":
    [1920, 1280],
  "https://static.igem.wiki/teams/6147/wiki/ihp-art-science-02-flute-duet-performance.avif":
    [1079, 614],
  "https://static.igem.wiki/teams/6147/wiki/ihp-art-science-03-professional-feedback.avif":
    [470, 331],
  "https://static.igem.wiki/teams/6147/wiki/ihp-bgi-data-translation-meeting.avif":
    [1079, 804],
  "https://static.igem.wiki/teams/6147/wiki/ihp-bgi-group-visit.avif": [
    1080, 797,
  ],
  "https://static.igem.wiki/teams/6147/wiki/ihp-ccic-2026-02-peer-exchange.webp":
    [1279, 1706],
  "https://static.igem.wiki/teams/6147/wiki/ihp-ccic-2026-04-poster-discussion.webp":
    [1440, 960],
  "https://static.igem.wiki/teams/6147/wiki/ihp-ccic-2026-06-carbotex-stage-presentation-dbtl.webp":
    [1920, 1280],
  "https://static.igem.wiki/teams/6147/wiki/ihp-ccic-2026-09-synbiopunk-challenge-second-place.webp":
    [1920, 1280],
  "https://static.igem.wiki/teams/6147/wiki/ihp-community-ouc-china-recruitment-exchange-01.webp":
    [1530, 1050],
  "https://static.igem.wiki/teams/6147/wiki/ihp-community-ouc-china-tianjin-exchange-01-meeting.webp":
    [1702, 1276],
  "https://static.igem.wiki/teams/6147/wiki/ihp-community-ouc-china-tianjin-exchange-05-lab-discussion.webp":
    [872, 620],
  "https://static.igem.wiki/teams/6147/wiki/ihp-follow-up-prof-guanglei-liu-01-metabolic-route-discussion.avif":
    [1702, 1276],
  "https://static.igem.wiki/teams/6147/wiki/ihp-grand-apic-2026-01-community-group-photo.webp":
    [2048, 1364],
  "https://static.igem.wiki/teams/6147/wiki/ihp-grand-apic-2026-02-carbotex-poster-exchange.webp":
    [1706, 1279],
  "https://static.igem.wiki/teams/6147/wiki/ihp-grand-apic-2026-03-responsible-research-session.webp":
    [936, 527],
  "https://static.igem.wiki/teams/6147/wiki/ihp-grand-apic-2026-04-biotechnology-industry-exchange.webp":
    [1706, 1279],
  "https://static.igem.wiki/teams/6147/wiki/ihp-green-carbon-qibebt-02-project-exchange-meeting.avif":
    [1706, 1279],
  "https://static.igem.wiki/teams/6147/wiki/ihp-green-carbon-qibebt-03-lignocellulose-bioconversion-tour.avif":
    [1706, 1279],
  "https://static.igem.wiki/teams/6147/wiki/ihp-green-carbon-qibebt-04-synthetic-biology-green-biomanufacturing-exhibit.avif":
    [1706, 1279],
  "https://static.igem.wiki/teams/6147/wiki/ihp-kinger-robot-automation-integration.avif":
    [1706, 1279],
  "https://static.igem.wiki/teams/6147/wiki/ihp-kinger-robot-entrance.avif": [
    1280, 1708,
  ],
  "https://static.igem.wiki/teams/6147/wiki/ihp-kinger-robot-factory-tour.avif":
    [1280, 1707],
  "https://static.igem.wiki/teams/6147/wiki/ihp-peer-community-dut-unconference-01-group-photo.avif":
    [1656, 1108],
  "https://static.igem.wiki/teams/6147/wiki/ihp-peer-community-jlu-fbh-from-teams-for-teams-01-multiteam-group-photo.avif":
    [2048, 1151],
  "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-agricultural-expert-planting-base-01.avif":
    [1706, 1279],
  "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-agricultural-expert-planting-base-02.avif":
    [1706, 1279],
  "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-agricultural-expert-planting-base-03.avif":
    [1279, 1706],
  "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-bright-moon-seaweed-01-group-photo.avif":
    [1706, 1279],
  "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-bright-moon-seaweed-02-material-discussion.avif":
    [1706, 1279],
  "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-dr-haotian-guo-01-ccic-feedback.avif":
    [1706, 1279],
  "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-dr-le-yu-01-discussion.avif":
    [1707, 1280],
  "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-dr-le-yu-02-group-photo.avif":
    [1707, 1280],
  "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-dr-nan-hao-01-discussion.avif":
    [1702, 1276],
  "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-dr-tao-ma-01-lab-discussion.avif":
    [1706, 1279],
  "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-dr-tao-ma-02-group-photo.avif":
    [2048, 1536],
  "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-farmers-cooperative-01.avif":
    [2048, 1536],
  "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-farmers-cooperative-02.avif":
    [2048, 1536],
  "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-farmers-cooperative-03.avif":
    [1536, 2048],
  "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-liu-ya-01-materials-perspective.avif":
    [1034, 841],
  "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-local-authority-01.avif":
    [1536, 2048],
  "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-local-authority-02.avif":
    [1536, 2048],
  "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-local-authority-03.avif":
    [1536, 2048],
  "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-national-oyster-science-technology-courtyard-01-site-visit.avif":
    [1920, 1280],
  "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-national-oyster-science-technology-courtyard-02-interview.avif":
    [1872, 1238],
  "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-prof-guanglei-liu-01-project-planning.avif":
    [1750, 845],
  "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-prof-guanglei-liu-02-online-discussion.avif":
    [1750, 845],
  "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-prof-qilin-yu-01-experimental-framework.avif":
    [1600, 1340],
  "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-prof-weihui-wu-01-carbon-allocation-discussion.avif":
    [1600, 1132],
  "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-prof-yajun-liu-01-gallery.avif":
    [1536, 1152],
  "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-prof-yajun-liu-02.avif":
    [2048, 1536],
  "https://static.igem.wiki/teams/6147/wiki/ihp-shenzhen-synthetic-biology-infrastructure.avif":
    [1706, 1279],
  "https://static.igem.wiki/teams/6147/wiki/ihp-sustainability-eva-sdgs-whole-system-perspective.avif":
    [1279, 1706],
  "https://static.igem.wiki/teams/6147/wiki/ihp-tsingtao-brewery-production-line-reliable-fermentation.avif":
    [1894, 1057],
  "https://static.igem.wiki/teams/6147/wiki/ihp-tsingtao-brewery-site-fermentation-scale-up.avif":
    [1080, 1153],
  "https://static.igem.wiki/teams/6147/wiki/ihp.avif": [1702, 1276],
  "https://static.igem.wiki/teams/6147/wiki/ihp.svg": [149, 150],
  "https://static.igem.wiki/teams/6147/wiki/ion-exchange-transparent-1.webp": [
    2048, 1150,
  ],
  "https://static.igem.wiki/teams/6147/wiki/jiang.avif": [1706, 1279],
  "https://static.igem.wiki/teams/6147/wiki/journey.avif": [2172, 724],
  "https://static.igem.wiki/teams/6147/wiki/meeting.avif": [4000, 3000],
  "https://static.igem.wiki/teams/6147/wiki/mishi1.webp": [1706, 1279],
  "https://static.igem.wiki/teams/6147/wiki/mishi2.webp": [1536, 2048],
  "https://static.igem.wiki/teams/6147/wiki/pingtai.avif": [1707, 1280],
  "https://static.igem.wiki/teams/6147/wiki/tianjin.avif": [1672, 941],
};

export function ihpImageDimensions(
  src: string,
): IhpImageDimensions | undefined {
  return IHP_IMAGE_DIMENSIONS[src];
}
