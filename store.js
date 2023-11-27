import { createStore } from 'zustand/vanilla';

// import { persist, createJSONStorage } from 'zustand/middleware'

const DEFAULT_STATS = {
  img: {
    width: 788,
    img: undefined,
    x: 0,
    y: 0
  },
  designer: 'Viv',
  artist: 'AI Comic Factory',
  classType: 'terran', // or tech
  type: 'white',
  cardType: 'Creature - Monkey Cleric',
  rank: '1', 
  value: '1/2',
  cost: [[1,0],[4,2]],
  name: 'Monk-ey',
  showSecondRuleset: false,
  ruleSet: '',
};


export const store = createStore((set, get) => ({
      stats: DEFAULT_STATS,
      setImage: (image) => {
        const stats = get().stats;
        stats.img.img = image
        set({ stats: stats });
      },
      setImageX: (x) => {
        const stats = get().stats;
        stats.img.x += x;
        set({ stats: stats });
      },
      setImageY: (y) => {
        const stats = get().stats;
        stats.img.y += y
        set({ stats: stats });
      },
      setImageWidth: (width) => {
        const stats = get().stats;
        stats.img.width += width
        set({ stats: stats });
      },
      updateType: (targetType) => {
        const stats = get().stats;
        stats.type = targetType;
        set({ stats: stats });
      },
      updateCardType: (targetCardType) => {
        const stats = get().stats;
        stats.cardType = targetCardType;
        set({ stats: stats });
      },
      updateRank: (rank) => {
        const stats = get().stats;
        stats.rank = rank;
        set({ stats: stats });
      },
      updateRules: (rules) => {
        const stats = get().stats;
        stats.rules = rules;
        set({ stats: stats });
      },
      updateValue: (value) => {
        const stats = get().stats;
        stats.value = value;
        set({ stats: stats });
      },
      updateCost: (cost) => {
        const stats = get().stats;
        stats.cost.push(cost);
        set({ stats: stats });
      },
      deleteCost: (cost) => {
        const stats = get().stats;
        stats.cost.pop();
        set({ stats: stats });
      },
      updateName: (name) => {
        const stats = get().stats;
        stats.name = name;
        set({ stats: stats });
      },
      updateDesigner: (name) => {
        const stats = get().stats;
        stats.designer = name;
        set({ stats: stats });
      },
      updateArtist: (name) => {
        const stats = get().stats;
        stats.artist = name;
        set({ stats: stats });
      },
      addSelect: (index, type) => {
        const stats = get().stats;
        let selectData;
        if (type==="trigger")selectData = triggerOptions[0];
        if (type==="target"){
          if (stats.target === "player") {
            selectData = targetPlayerOptions[0];
          } else {
            selectData = targetCardOptions[0];
          }
          
        }
        if (type==="action"){
          if (stats.target === "player") {
            selectData = actionPlayerOptions[0];
          } else {
            selectData = actionCardOptions[0];
          }
        }

        stats.rules[index][type].push(selectData);
        set({ stats: stats });
      },
      reset: () => {
        set({ cards: [DEFAULT_STATS] })
      },
    })
)


// export const store = createStore(
//   persist(
//     (set, get) => ({
//       cards: DEFAULT_CARD,
//       addACard: async (card) => {
//         const cards = await get().cards;
//         cards.push(card);
//         console.log(cards, card)
//         set({ cards: cards })
//       },
//       removeAll: () => {
//         set({ cards: [DEFAULT_CARD] })
//       },
//     }),
//     {
//       name: 'card-storage',
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// )

