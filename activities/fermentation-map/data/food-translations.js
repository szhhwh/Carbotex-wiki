// English and Japanese text for the supplied food data, keyed by the Chinese
// name so `data/foods.js` stays the single source of truth.
export const FOOD_TEXT = {
  北京豆汁儿: {
    en: {
      name: "Beijing Douzhir (fermented mung bean drink)",
      desc: "Made from mung beans through soaking, grinding, settling and fermentation, douzhir has a distinctive sour aroma and is a traditional old-Beijing breakfast drink.",
      process:
        "Soak mung beans → grind to a slurry → settle → draw off the clear liquid → natural fermentation → heat and serve",
    },
    ja: {
      name: "北京豆汁児（ドゥージール）",
      desc: "緑豆を浸し、すりつぶし、沈殿させて発酵させた飲み物です。独特の酸味と香りがあり、古い北京の伝統的な朝食の飲み物です。",
      process:
        "緑豆を浸す→すりつぶす→沈殿させる→上澄みを取る→自然発酵→加熱して飲む",
    },
  },
  六必居酱菜: {
    en: {
      name: "Liubiju Pickles",
      desc: "Cucumber, radish and other vegetables are salted and fermented in flour paste and soybean paste, giving a savoury, crisp pickle that is a famous Beijing speciality.",
      process:
        "Wash vegetables → salt to draw out water → place in the paste crock → stir the crock repeatedly → ferment in the paste → finished product",
    },
    ja: {
      name: "六必居の醤菜",
      desc: "きゅうりや大根などの野菜を、小麦味噌と大豆味噌に漬けて発酵させた漬物です。塩味と香りがよく歯ごたえがあり、北京名物として知られています。",
      process:
        "野菜を洗う→塩漬けして水分を抜く→味噌樽に入れる→何度も撹拌する→味噌で発酵させる→完成",
    },
  },
  天津独流老醋: {
    en: {
      name: "Tianjin Duliu Aged Vinegar",
      desc: "Made from sorghum and wheat bran through alcoholic and acetic acid fermentation, this vinegar has a deep, mellow sourness and is a traditional Tianjin vinegar.",
      process:
        "Cook the raw materials → saccharify → alcoholic fermentation → acetic acid fermentation → age → finished product",
    },
    ja: {
      name: "天津独流老酢",
      desc: "高粱とふすまを原料に、アルコール発酵と酢酸発酵を経て造られます。酸味が深くまろやかで、天津の伝統的な名酢です。",
      process: "原料を蒸す→糖化→アルコール発酵→酢酸発酵→熟成→完成",
    },
  },
  天津冬菜: {
    en: {
      name: "Tianjin Winter Vegetable",
      desc: "Napa cabbage is salted and fermented with garlic paste, giving a savoury, lightly sour traditional Tianjin seasoning.",
      process:
        "Dry the cabbage → shred → salt → add garlic paste → seal in a jar → ferment",
    },
    ja: {
      name: "天津冬菜",
      desc: "白菜を塩とすりおろしニンニクで漬け込み、発酵させたものです。塩味とほのかな酸味があり、天津の伝統的な調味料です。",
      process:
        "白菜を干す→細切りにする→塩を加える→ニンニクを加える→甕に入れて密封→発酵",
    },
  },
  保定槐茂酱菜: {
    en: {
      name: "Baoding Huaimao Pickles",
      desc: "Several kinds of vegetables are salted and fermented in sweet flour paste, producing a pickle with a deep paste aroma that is a traditional speciality of Baoding, Hebei.",
      process:
        "Prepare vegetables → salt → desalt → place in sweet flour paste → stir the crock repeatedly → ferment in the paste",
    },
    ja: {
      name: "保定槐茂の醤菜",
      desc: "数種類の野菜を甘い小麦味噌に漬けて発酵させた漬物です。味噌の香りが豊かで、河北省保定の伝統的な名産品です。",
      process:
        "野菜を下処理する→塩漬け→塩抜き→甘い小麦味噌に漬ける→何度も撹拌する→味噌で発酵させる",
    },
  },
  承德杏仁露: {
    en: {
      name: "Chengde Apricot Kernel Drink",
      desc: "Apricot kernels are soaked, ground and broken down with enzymes, giving a smooth, nutritious drink.",
      process:
        "Soak apricot kernels → remove skins → grind → enzymatic hydrolysis → filter → blend → sterilise",
    },
    ja: {
      name: "承徳のアンズ仁ドリンク",
      desc: "アンズの仁を浸し、すりつぶし、酵素で分解して造る飲み物です。なめらかな口当たりで栄養が豊富です。",
      process: "アンズの仁を浸す→皮をむく→すりつぶす→酵素分解→ろ過→調合→殺菌",
    },
  },
  山西老陈醋: {
    en: {
      name: "Shanxi Aged Vinegar",
      desc: "Made mainly from sorghum through five steps — steaming, fermenting, smoking, leaching and ageing — this vinegar is fragrant and mellow, and is one of China's four famous vinegars.",
      process:
        "Steam sorghum → alcoholic fermentation → acetic acid fermentation → smoke the mash → leach the vinegar → age",
    },
    ja: {
      name: "山西老陳酢",
      desc: "高粱を主原料に、蒸す・発酵・燻す・ろ過・熟成の五工程を経て造られます。香りが豊かでまろやか、中国四大名酢の一つです。",
      process:
        "高粱を蒸す→アルコール発酵→酢酸発酵→もろみを燻す→酢をろ過する→熟成",
    },
  },
  山西面酱: {
    en: {
      name: "Shanxi Flour Paste",
      desc: "Wheat flour is inoculated with koji and fermented, producing a richly aromatic paste that is an important seasoning in Shanxi noodle dishes.",
      process:
        "Steam the flour → inoculate with koji → place in the crock → add brine → sun and dew → ferment to maturity",
    },
    ja: {
      name: "山西の小麦味噌",
      desc: "小麦粉を麹にして発酵させた味噌です。香りが豊かで、山西の麺料理にかかせない調味料です。",
      process:
        "小麦粉を蒸す→麹をつくる→甕に入れる→塩水を加える→日干しと夜露→発酵熟成",
    },
  },
  内蒙古酸奶: {
    en: {
      name: "Inner Mongolian Yoghurt",
      desc: "Fresh cow's milk is fermented with lactic acid bacteria, giving a sweet-and-sour drink that is traditional among Mongolian herders.",
      process:
        "Heat fresh milk → cool → inoculate with lactic acid bacteria → ferment at constant temperature → refrigerate",
    },
    ja: {
      name: "内モンゴルのヨーグルト",
      desc: "新鮮な牛乳を乳酸菌で発酵させた飲み物です。甘酸っぱく、モンゴル族の伝統的な飲み物です。",
      process: "新鮮な牛乳を温める→冷ます→乳酸菌を接種→一定温度で発酵→冷蔵",
    },
  },
  内蒙古奶豆腐: {
    en: {
      name: "Inner Mongolian Milk Tofu",
      desc: "Milk is fermented with lactic acid bacteria, then curdled and pressed into a dense food with a rich milky flavour, traditionally made by Mongolian herders.",
      process:
        "Fresh milk → lactic acid fermentation → curdle → cut into blocks → press out the whey → dry in the air",
    },
    ja: {
      name: "内モンゴルの乳豆腐",
      desc: "牛乳を乳酸発酵させて凝固させ、圧搾して固めた食品です。乳の香りが濃く、モンゴル族の伝統的な食品です。",
      process:
        "新鮮な牛乳→乳酸発酵→凝固→切り分ける→圧搾して水分を抜く→天日乾燥",
    },
  },
  马奶酒: {
    en: {
      name: "Mare's Milk Wine (airag)",
      desc: "Mare's milk is fermented naturally into a lightly sour drink with a wine-like aroma, traditional among Mongolian herders.",
      process:
        "Collect mare's milk → inoculate → stir and ferment → distil → finished product",
    },
    ja: {
      name: "馬乳酒（アイラグ）",
      desc: "馬乳を自然発酵させた飲み物です。ほのかな酸味と酒のような香りがあり、モンゴル族の伝統的な飲み物です。",
      process: "馬乳を集める→種菌を加える→撹拌して発酵→蒸留→完成",
    },
  },
  沈阳老龙口白酒: {
    en: {
      name: "Shenyang Laolongkou Baijiu",
      desc: "Made from sorghum by solid-state fermentation and distillation, this spirit is mellow and is a traditional Liaoning liquor.",
      process:
        "Steam sorghum → add koji → solid-state fermentation → distil → age",
    },
    ja: {
      name: "瀋陽老龍口白酒",
      desc: "高粱を原料に、固体発酵と蒸留で造られる蒸留酒です。香りがまろやかで、遼寧の伝統的な名酒です。",
      process: "高粱を蒸す→麹を加える→固体発酵→蒸留→熟成",
    },
  },
  辽宁大酱: {
    en: {
      name: "Liaoning Soybean Paste",
      desc: "Soybeans are inoculated with koji and fermented into a richly aromatic paste that is a key seasoning in north-eastern Chinese cooking.",
      process:
        "Boil soybeans → inoculate with koji → place in the crock → add brine → ferment → finished product",
    },
    ja: {
      name: "遼寧の大豆味噌",
      desc: "大豆を麹にして発酵させた味噌です。香りが豊かで、中国東北料理に欠かせない調味料です。",
      process: "大豆を煮る→麹をつくる→甕に入れる→塩水を加える→発酵→完成",
    },
  },
  吉林酸菜: {
    en: {
      name: "Jilin Pickled Cabbage",
      desc: "Napa cabbage is fermented naturally with lactic acid bacteria, giving a crisp, refreshingly sour vegetable that north-eastern families traditionally eat through the winter.",
      process:
        "Dry the cabbage → wash → place in the crock → add brine → weigh down with a stone → natural fermentation",
    },
    ja: {
      name: "吉林の酸菜",
      desc: "白菜を乳酸菌で自然発酵させた漬物です。歯ごたえがあり酸味がさわやかで、東北地方で冬に食べられる伝統的な野菜です。",
      process:
        "白菜を干す→洗う→甕に入れる→塩水を加える→石で重しをする→自然発酵",
    },
  },
  吉林人参酒: {
    en: {
      name: "Jilin Ginseng Wine",
      desc: "Ginseng is steeped in sorghum liquor and left to infuse and ferment, producing a tonic wine typical of Jilin.",
      process:
        "Wash the ginseng → slice → place in the liquor → seal and steep → age",
    },
    ja: {
      name: "吉林の人参酒",
      desc: "人参と高粱酒を原料に、漬け込んで発酵させた薬酒です。滋養強壮に良いとされ、吉林の名産です。",
      process: "人参を洗う→薄く切る→酒に入れる→密封して漬け込む→熟成",
    },
  },
  哈尔滨红肠: {
    en: {
      name: "Harbin Red Sausage",
      desc: "Pork is cured, stuffed into casings, smoked and fermented at low temperature, giving a distinctive sausage that is a Harbin speciality.",
      process:
        "Cure the pork → stuff into casings → smoke → ferment at low temperature → finished product",
    },
    ja: {
      name: "ハルビン紅腸",
      desc: "豚肉を塩漬けし、腸詰めにして燻製し、低温で発酵させたソーセージです。独特の風味があり、ハルビンの名物です。",
      process: "豚肉を塩漬け→腸に詰める→燻製→低温で発酵→完成",
    },
  },
  黑龙江酸菜: {
    en: {
      name: "Heilongjiang Pickled Cabbage",
      desc: "Napa cabbage is fermented with lactic acid bacteria, giving a pleasantly sour vegetable that is a traditional north-eastern food.",
      process:
        "Prepare the cabbage → place in the crock → add brine → seal → natural fermentation",
    },
    ja: {
      name: "黒竜江の酸菜",
      desc: "白菜を乳酸菌で発酵させた漬物です。酸味と香りがよく、東北地方の伝統的な食べ物です。",
      process: "白菜を下処理する→甕に入れる→塩水を加える→密封→自然発酵",
    },
  },
  上海黄酒: {
    en: {
      name: "Shanghai Yellow Rice Wine",
      desc: "Glutinous rice is fermented with rice koji, giving a mellow wine with a rich aroma that is traditional to Shanghai.",
      process:
        "Soak glutinous rice → steam → mix with koji → place in the crock → ferment → press → age",
    },
    ja: {
      name: "上海の黄酒",
      desc: "もち米を麹で発酵させた酒です。香りがまろやかで、上海の伝統的な名酒です。",
      process: "もち米を浸す→蒸す→麹を混ぜる→甕に入れる→発酵→圧搾→熟成",
    },
  },
  上海酱鸭: {
    en: {
      name: "Shanghai Soy-braised Duck",
      desc: "Duck is cured with soy sauce and spices, fermented and then braised, giving a rich soy aroma — a classic Shanghai dish.",
      process:
        "Prepare the duck → cure in soy sauce → braise → air-dry → finished product",
    },
    ja: {
      name: "上海の醤油鴨",
      desc: "鴨肉を醤油と香辛料で漬け込み、発酵させてから煮込んだ料理です。醤油の香りが豊かで、上海の伝統的な名菜です。",
      process: "鴨肉を下処理する→醤油に漬ける→煮込む→乾かす→完成",
    },
  },
  镇江香醋: {
    en: {
      name: "Zhenjiang Vinegar",
      desc: "Made from glutinous rice through alcoholic and acetic acid fermentation, this vinegar is sour without astringency and fragrant with a hint of sweetness — one of China's four famous vinegars.",
      process:
        "Steam glutinous rice → alcoholic fermentation → acetic acid fermentation → age → finished product",
    },
    ja: {
      name: "鎮江の香酢",
      desc: "もち米を原料に、アルコール発酵と酢酸発酵を経て造られます。酸味はあるのに渋くなく、香りよくほのかに甘い、中国四大名酢の一つです。",
      process: "もち米を蒸す→アルコール発酵→酢酸発酵→熟成→完成",
    },
  },
  南京盐水鸭: {
    en: {
      name: "Nanjing Salted Duck",
      desc: "Duck is salted and then braised in spiced brine, giving white skin and tender meat — a classic Nanjing dish.",
      process:
        "Prepare the duck → salt-cure → braise in brine → cool → finished product",
    },
    ja: {
      name: "南京の塩水鴨",
      desc: "鴨肉を塩漬けにし、香味入りの塩水で煮た料理です。皮は白く身はやわらかく、南京の伝統的な名菜です。",
      process: "鴨肉を下処理する→塩漬け→塩水で煮る→冷ます→完成",
    },
  },
  苏州豆腐乳: {
    en: {
      name: "Suzhou Fermented Bean Curd",
      desc: "Tofu is fermented with mucor mould and then salted, giving a smooth, savoury fermented bean curd that is a traditional Jiangsu seasoning.",
      process:
        "Cut the tofu into blocks → inoculate with mucor → ferment → salt-cure → add seasoning → seal and ferment",
    },
    ja: {
      name: "蘇州の豆腐乳",
      desc: "豆腐をクモノスカビで発酵させ、塩漬けにして熟成させたものです。塩味と香りがよくきめ細かく、江蘇の伝統的な調味料です。",
      process:
        "豆腐を切り分ける→クモノスカビを接種→発酵→塩漬け→調味料を加える→密封して発酵",
    },
  },
  绍兴黄酒: {
    en: {
      name: "Shaoxing Rice Wine",
      desc: "Made from glutinous rice fermented with rice koji, this mellow, full-bodied wine is the best-known Chinese yellow rice wine and is often called the finest wine of the East.",
      process:
        "Soak glutinous rice → steam → mix with koji → place in the crock → ferment → press → pasteurise → age",
    },
    ja: {
      name: "紹興の黄酒",
      desc: "もち米を麹で発酵させた酒です。香りがまろやかで中国の黄酒を代表し、「東洋の名酒の冠」とも称されます。",
      process: "もち米を浸す→蒸す→麹を混ぜる→甕に入れる→発酵→圧搾→火入れ→熟成",
    },
  },
  金华火腿: {
    en: {
      name: "Jinhua Ham",
      desc: "Made from the hind leg of the pig through salting, fermentation and air-drying, this ham is tender and is a traditional Zhejiang speciality.",
      process:
        "Prepare the leg → salt-cure → shape → ferment → air-dry → finished product",
    },
    ja: {
      name: "金華ハム",
      desc: "豚の後脚を塩漬けし、発酵させて乾燥させたハムです。身がやわらかく、浙江の伝統的な名産品です。",
      process: "豚脚を下処理する→塩漬け→形を整える→発酵→乾燥→完成",
    },
  },
  杭州酱鸭: {
    en: {
      name: "Hangzhou Soy-cured Duck",
      desc: "Duck is cured with soy sauce, fermented and air-dried, giving a strong soy aroma — a traditional Hangzhou dish.",
      process:
        "Prepare the duck → cure in soy sauce → air-dry → steam → finished product",
    },
    ja: {
      name: "杭州の醤油鴨",
      desc: "鴨肉を醤油で漬け込み、発酵させてから干した料理です。醤油の香りが豊かで、杭州の伝統的な名菜です。",
      process: "鴨肉を下処理する→醤油に漬ける→干す→蒸す→完成",
    },
  },
  徽州毛豆腐: {
    en: {
      name: "Huizhou Hairy Tofu",
      desc: "Tofu is fermented with mucor mould until its surface is covered in white mycelium, giving a distinctive texture — a traditional Huizhou delicacy.",
      process:
        "Cut the tofu into blocks → inoculate with mucor → ferment at constant temperature → white mould grows → pan-fry and eat",
    },
    ja: {
      name: "徽州の毛豆腐",
      desc: "豆腐をクモノスカビで発酵させ、表面を白い菌糸で覆わせたものです。独特の食感があり、徽州の伝統的な料理です。",
      process:
        "豆腐を切り分ける→クモノスカビを接種→定温で発酵→表面に白い菌糸が生える→焼いて食べる",
    },
  },
  安徽臭鳜鱼: {
    en: {
      name: "Anhui Stinky Mandarin Fish",
      desc: "Mandarin fish is salted and fermented, so it smells strong yet tastes savoury — a signature dish of Anhui cuisine.",
      process:
        "Prepare the mandarin fish → salt-cure → seal and ferment → cook",
    },
    ja: {
      name: "安徽の臭ケツギョ",
      desc: "ケツギョを塩漬けにして発酵させた料理です。匂いは強いですが味は香ばしく、徽菜を代表する名菜です。",
      process: "ケツギョを下処理する→塩漬け→密封して発酵→調理",
    },
  },
  福建老酒: {
    en: {
      name: "Fujian Aged Rice Wine",
      desc: "Glutinous rice is fermented with rice koji into a full-bodied wine with a rich aroma, traditional to Fujian.",
      process:
        "Soak glutinous rice → steam → mix with koji → place in the crock → ferment → press → age",
    },
    ja: {
      name: "福建の老酒",
      desc: "もち米を麹で発酵させた酒です。香りが豊かで、福建の伝統的な名酒です。",
      process: "もち米を浸す→蒸す→麹を混ぜる→甕に入れる→発酵→圧搾→熟成",
    },
  },
  福建红糟: {
    en: {
      name: "Fujian Red Rice Wine Lees",
      desc: "Made from glutinous rice and red yeast rice through fermentation, this bright red lees is an important seasoning in Fujian cooking.",
      process:
        "Steam glutinous rice → mix with red yeast rice → place in the crock → ferment → finished product",
    },
    ja: {
      name: "福建の紅麹",
      desc: "もち米と紅麹を原料に発酵させたものです。鮮やかな赤色で、福建料理の重要な調味料です。",
      process: "もち米を蒸す→紅麹を混ぜる→甕に入れる→発酵→完成",
    },
  },
  永春老醋: {
    en: {
      name: "Yongchun Aged Vinegar",
      desc: "Made from glutinous rice through alcoholic and acetic acid fermentation, this vinegar is fragrant and mellow, and is a traditional Fujian vinegar.",
      process:
        "Steam glutinous rice → alcoholic fermentation → acetic acid fermentation → age → finished product",
    },
    ja: {
      name: "永春の老酢",
      desc: "もち米を原料に、アルコール発酵と酢酸発酵を経て造られます。酸味と香りがまろやかで、福建の伝統的な名酢です。",
      process: "もち米を蒸す→アルコール発酵→酢酸発酵→熟成→完成",
    },
  },
  江西米粉: {
    en: {
      name: "Jiangxi Rice Noodles",
      desc: "Rice is soaked, ground, fermented and steamed into smooth rice noodles, a traditional Jiangxi staple.",
      process:
        "Soak the rice → grind to a slurry → ferment → steam → cut into strips → finished product",
    },
    ja: {
      name: "江西のライスヌードル",
      desc: "米を浸し、すりつぶし、発酵させて蒸した麺です。のどごしがよく、江西の伝統的な主食です。",
      process: "米を浸す→すりつぶす→発酵→蒸す→細長く切る→完成",
    },
  },
  江西腐乳: {
    en: {
      name: "Jiangxi Fermented Bean Curd",
      desc: "Tofu is fermented with mucor mould and then salted, giving a smooth, savoury fermented bean curd that is a traditional Jiangxi seasoning.",
      process:
        "Cut the tofu into blocks → inoculate with mucor → ferment → salt-cure → seal and ferment",
    },
    ja: {
      name: "江西の豆腐乳",
      desc: "豆腐をクモノスカビで発酵させ、塩漬けにして熟成させたものです。塩味と香りがよくきめ細かく、江西の伝統的な調味料です。",
      process: "豆腐を切り分ける→クモノスカビを接種→発酵→塩漬け→密封して発酵",
    },
  },
  山东煎饼: {
    en: {
      name: "Shandong Millet Pancake",
      desc: "Millet and maize are soaked, ground, fermented and cooked into a thin, crisp pancake, a traditional Shandong staple.",
      process:
        "Soak the grains → grind to a batter → ferment → spread thin on the griddle → finished product",
    },
    ja: {
      name: "山東の煎餅",
      desc: "粟やトウモロコシを浸し、すりつぶし、発酵させて薄く焼いた食べ物です。薄くて香ばしく、山東の伝統的な主食です。",
      process: "穀物を浸す→すりつぶす→発酵→薄く広げて焼く→完成",
    },
  },
  山东大酱: {
    en: {
      name: "Shandong Soybean Paste",
      desc: "Soybeans are inoculated with koji and fermented into an aromatic paste, a key seasoning in Shandong cooking.",
      process:
        "Boil soybeans → inoculate with koji → place in the crock → add brine → ferment → finished product",
    },
    ja: {
      name: "山東の大豆味噌",
      desc: "大豆を麹にして発酵させた味噌です。香りが豊かで、山東料理に欠かせない調味料です。",
      process: "大豆を煮る→麹をつくる→甕に入れる→塩水を加える→発酵→完成",
    },
  },
  青岛啤酒: {
    en: {
      name: "Tsingtao Beer",
      desc: "Made from barley malt through mashing and fermentation, this crisp, refreshing beer is a Qingdao speciality.",
      process:
        "Mash the malt → boil → add hops → cool → ferment → filter → bottle",
    },
    ja: {
      name: "青島ビール",
      desc: "大麦麦芽を原料に、糖化と発酵を経て造られるビールです。すっきりとした爽やかな味わいで、青島の名物です。",
      process: "麦芽を糖化→煮沸→ホップを加える→冷却→発酵→ろ過→瓶詰め",
    },
  },
  河南烩面: {
    en: {
      name: "Henan Braised Noodles",
      desc: "Wheat dough is kneaded, rested, fermented and pulled by hand into springy noodles, a traditional Henan dish.",
      process: "Mix the dough → rest → ferment → pull the noodles → boil",
    },
    ja: {
      name: "河南の燴面",
      desc: "小麦粉の生地をこね、寝かせ、発酵させて手でのばした麺です。コシがあり、河南の伝統的な麺料理です。",
      process: "生地をこねる→寝かせる→発酵→手でのばす→ゆでる",
    },
  },
  河南酱豆: {
    en: {
      name: "Henan Fermented Soybeans",
      desc: "Soybeans are inoculated with koji and fermented into an aromatic paste, a traditional Henan seasoning.",
      process:
        "Boil soybeans → inoculate with koji → place in the crock → add brine → ferment → finished product",
    },
    ja: {
      name: "河南の醤豆",
      desc: "大豆を麹にして発酵させたものです。香りが豊かで、河南の伝統的な調味料です。",
      process: "大豆を煮る→麹をつくる→甕に入れる→塩水を加える→発酵→完成",
    },
  },
  武汉热干面: {
    en: {
      name: "Wuhan Hot Dry Noodles",
      desc: "Wheat flour is mixed with alkaline water, rested, fermented and tossed into springy noodles, a famous Wuhan snack.",
      process:
        "Mix flour with alkaline water → rest → ferment → toss the noodles → serve with sesame sauce",
    },
    ja: {
      name: "武漢の熱干面",
      desc: "小麦粉にかん水を加えてこね、寝かせ、発酵させて作る麺です。コシがあり、武漢を代表する名物麺です。",
      process:
        "小麦粉にかん水を加えてこねる→寝かせる→発酵→麺をほぐす→ごまだれで和えて食べる",
    },
  },
  湖北孝感米酒: {
    en: {
      name: "Xiaogan Rice Wine",
      desc: "Glutinous rice is fermented with rice koji into a sweet, fragrant drink traditional to Hubei.",
      process:
        "Soak glutinous rice → steam → mix with koji → place in the crock → ferment → finished product",
    },
    ja: {
      name: "孝感の米酒",
      desc: "もち米を麹で発酵させた飲み物です。甘く香りよく、湖北の伝統的な飲み物です。",
      process: "もち米を浸す→蒸す→麹を混ぜる→甕に入れる→発酵→完成",
    },
  },
  湖南剁椒: {
    en: {
      name: "Hunan Chopped Chilli",
      desc: "Fresh chillies are chopped, salted and fermented, giving a hot, sour, fragrant seasoning essential to Hunan cooking.",
      process:
        "Wash the chillies → chop → add salt → pack into a jar → seal → natural fermentation",
    },
    ja: {
      name: "湖南の刻み唐辛子",
      desc: "唐辛子を刻み、塩を加えて漬け込み発酵させたものです。酸味と辛み、香りがよく、湘菜に欠かせない調味料です。",
      process: "唐辛子を洗う→刻む→塩を加える→甕に詰める→密封→自然発酵",
    },
  },
  湖南臭豆腐: {
    en: {
      name: "Hunan Stinky Tofu",
      desc: "Tofu is steeped in fermented brine and left to ferment, then fried so that it is crisp outside and soft inside — a classic Changsha snack.",
      process:
        "Cut the tofu into blocks → steep in brine → ferment → deep-fry → season",
    },
    ja: {
      name: "湖南の臭豆腐",
      desc: "豆腐を発酵させた漬け汁に浸して熟成させ、油で揚げたものです。外はカリッと中はやわらかく、長沙を代表する名物小吃です。",
      process: "豆腐を切り分ける→漬け汁に浸す→発酵→油で揚げる→味付け",
    },
  },
  湖南腊肉: {
    en: {
      name: "Hunan Cured Pork",
      desc: "Pork is salted, air-dried, smoked and fermented, giving a rich cured aroma typical of Hunan.",
      process: "Salt the pork → air-dry → smoke → ferment → finished product",
    },
    ja: {
      name: "湖南の腊肉",
      desc: "豚肉を塩漬けし、干して燻製にし、発酵させたものです。燻した香りが豊かで、湖南の伝統的な食品です。",
      process: "豚肉を塩漬け→干す→燻製→発酵→完成",
    },
  },
  广东双皮奶: {
    en: {
      name: "Guangdong Double-skin Milk Pudding",
      desc: "Milk is heated, cooled and set, then steamed with egg white into a silky pudding, a traditional Guangdong dessert.",
      process:
        "Heat the milk → cool → form a skin → add egg white → steam → finished product",
    },
    ja: {
      name: "広東の双皮奶",
      desc: "牛乳を温めて冷まし、膜を張らせてから卵白を加えて蒸したプリンです。なめらかな口当たりで、広東の伝統的なデザートです。",
      process: "牛乳を温める→冷ます→膜を張らせる→卵白を加える→蒸す→完成",
    },
  },
  广东腐乳: {
    en: {
      name: "Guangdong Fermented Bean Curd",
      desc: "Tofu is fermented with mucor mould and then salted, giving a smooth, savoury fermented bean curd used widely in Guangdong cooking.",
      process:
        "Cut the tofu into blocks → inoculate with mucor → ferment → salt-cure → seal and ferment",
    },
    ja: {
      name: "広東の豆腐乳",
      desc: "豆腐をクモノスカビで発酵させ、塩漬けにして熟成させたものです。塩味と香りがよく、広東料理の重要な調味料です。",
      process: "豆腐を切り分ける→クモノスカビを接種→発酵→塩漬け→密封して発酵",
    },
  },
  广东米酒: {
    en: {
      name: "Guangdong Rice Wine",
      desc: "Rice is fermented with rice koji into a clear, fragrant wine traditional to Guangdong.",
      process:
        "Soak the rice → steam → mix with koji → place in the crock → ferment → distil → finished product",
    },
    ja: {
      name: "広東の米酒",
      desc: "米を麹で発酵させた酒です。香りがすっきりとしており、広東の伝統的な名酒です。",
      process: "米を浸す→蒸す→麹を混ぜる→甕に入れる→発酵→蒸留→完成",
    },
  },
  广西螺蛳粉: {
    en: {
      name: "Guangxi Luosifen (snail rice noodles)",
      desc: "Rice noodles are served in a broth made with fermented sour bamboo shoots, giving a hot, sour, savoury bowl that is a Liuzhou speciality.",
      process:
        "Salt the bamboo shoots → ferment → simmer the broth → cook the noodles → add toppings",
    },
    ja: {
      name: "広西の螺蛳粉",
      desc: "米粉と発酵させた酸筍を使った料理です。酸味と辛み、うま味が重なり、柳州市の名物小吃です。",
      process: "酸筍を漬ける→発酵→スープを煮出す→麺をゆでる→具をのせる",
    },
  },
  广西酸嘢: {
    en: {
      name: "Guangxi Suanye (pickled fruit and vegetables)",
      desc: "Fruit and vegetables are salted and pickled with vinegar, giving a tangy, appetite-whetting snack typical of Guangxi.",
      process:
        "Wash the produce → cut into pieces → add salt → add vinegar → pickle → ferment",
    },
    ja: {
      name: "広西の酸嘢",
      desc: "さまざまな果物と野菜を塩と酢で漬けて発酵させたものです。酸味があり食欲をそそる、広西の伝統的な小吃です。",
      process: "果物と野菜を洗う→切り分ける→塩を加える→酢を加える→漬ける→発酵",
    },
  },
  海南椰子酒: {
    en: {
      name: "Hainan Coconut Wine",
      desc: "Coconut sap is fermented and distilled into a richly aromatic spirit typical of Hainan.",
      process:
        "Tap the coconut sap → ferment → distil → age → finished product",
    },
    ja: {
      name: "海南のココナッツ酒",
      desc: "ヤシの樹液を発酵させ、蒸留した酒です。ココナッツの香りが豊かで、海南の名物です。",
      process: "ヤシの樹液を採る→発酵→蒸留→熟成→完成",
    },
  },
  海南鱼露: {
    en: {
      name: "Hainan Fish Sauce",
      desc: "Small fish are salted and left to ferment naturally, then filtered into a deeply savoury sauce, a traditional Hainan seasoning.",
      process:
        "Wash the small fish → add salt → pack into a jar → seal → natural fermentation → filter",
    },
    ja: {
      name: "海南の魚醤",
      desc: "小魚を塩漬けにして自然発酵させ、ろ過した調味料です。うま味が濃く、海南の伝統的な調味料です。",
      process: "小魚を洗う→塩を加える→甕に詰める→密封→自然発酵→ろ過",
    },
  },
  重庆火锅底料: {
    en: {
      name: "Chongqing Hot Pot Base",
      desc: "Chillies, Sichuan pepper and fermented broad bean paste are cooked into the base of a hot, numbing Chongqing hot pot.",
      process:
        "Prepare the chillies → ferment the broad bean paste → stir-fry → simmer → finished product",
    },
    ja: {
      name: "重慶火鍋の素",
      desc: "唐辛子、花椒、豆板醤を炒め合わせて作る火鍋の素です。辛く痺れる味わいは重慶火鍋の要です。",
      process: "唐辛子を下処理する→豆板醤を発酵させる→炒める→煮込む→完成",
    },
  },
  重庆泡菜: {
    en: {
      name: "Chongqing Pickles",
      desc: "Vegetables are salted and fermented in brine, giving a hot, sour, crisp pickle traditional to Chongqing.",
      process:
        "Wash the vegetables → cut into pieces → pack into a jar → add brine → seal → natural fermentation",
    },
    ja: {
      name: "重慶の漬物",
      desc: "各種の野菜を塩水に漬けて発酵させた漬物です。辛く酸味があり歯ごたえよく、重慶の伝統的な小菜です。",
      process: "野菜を洗う→切り分ける→甕に入れる→塩水を加える→密封→自然発酵",
    },
  },
  四川豆瓣酱: {
    en: {
      name: "Sichuan Broad Bean Chilli Paste",
      desc: "Broad beans and chillies are inoculated with koji and fermented into a rich paste that is the soul of Sichuan cooking.",
      process:
        "Boil the broad beans → inoculate with koji → add chillies → place in the crock → ferment → stir the crock → finished product",
    },
    ja: {
      name: "四川の豆板醤",
      desc: "そら豆と唐辛子を麹で発酵させた調味料です。香りが豊かで、四川料理の要となる調味料です。",
      process:
        "そら豆を煮る→麹をつくる→唐辛子を加える→甕に入れる→発酵→撹拌→完成",
    },
  },
  四川泡菜: {
    en: {
      name: "Sichuan Pickles",
      desc: "Vegetables are salted and fermented in brine, giving a hot, sour, crisp pickle that is an essential side dish in Sichuan cooking.",
      process:
        "Wash the vegetables → cut into pieces → pack into a jar → add brine → seal → natural fermentation",
    },
    ja: {
      name: "四川の漬物",
      desc: "各種の野菜を塩水に漬けて発酵させた漬物です。辛く酸味があり歯ごたえよく、四川料理に欠かせない付け合わせです。",
      process: "野菜を洗う→切り分ける→甕に入れる→塩水を加える→密封→自然発酵",
    },
  },
  四川醪糟: {
    en: {
      name: "Sichuan Fermented Glutinous Rice",
      desc: "Glutinous rice is fermented with rice koji into a sweet, fragrant dessert, traditionally served in Sichuan.",
      process:
        "Soak glutinous rice → steam → mix with koji → place in the crock → ferment → finished product",
    },
    ja: {
      name: "四川の醪糟",
      desc: "もち米を麹で発酵させた甘いデザートです。香りがよく、四川の伝統的な甘味です。",
      process: "もち米を浸す→蒸す→麹を混ぜる→甕に入れる→発酵→完成",
    },
  },
  贵州酸汤: {
    en: {
      name: "Guizhou Sour Soup",
      desc: "Tomatoes and chillies are fermented into a hot, sour, fragrant soup base traditional to the Miao people of Guizhou.",
      process:
        "Wash the tomatoes and chillies → chop → add salt → pack into a jar → seal → natural fermentation",
    },
    ja: {
      name: "貴州の酸湯",
      desc: "トマトと唐辛子を発酵させたスープの素です。酸味と辛み、香りがよく、貴州のミャオ族に伝わる伝統的な味です。",
      process: "トマトと唐辛子を洗う→刻む→塩を加える→甕に詰める→密封→自然発酵",
    },
  },
  贵州茅台酒: {
    en: {
      name: "Guizhou Moutai",
      desc: "Made from sorghum through repeated fermentation and distillation, this spirit has a pronounced sauce-like aroma and is China's best-known baijiu.",
      process:
        "Steam sorghum → add koji → ferment repeatedly → distil repeatedly → age → blend",
    },
    ja: {
      name: "貴州の茅台酒",
      desc: "高粱を原料に、何度も発酵と蒸留を繰り返して造られる蒸留酒です。香りが際立ち、中国を代表する白酒です。",
      process: "高粱を蒸す→麹を加える→何度も発酵→何度も蒸留→熟成→調合",
    },
  },
  贵州酸菜: {
    en: {
      name: "Guizhou Pickled Greens",
      desc: "Leafy greens are fermented with lactic acid bacteria, giving a pleasantly sour vegetable traditional to Guizhou.",
      process:
        "Wash the greens → pack into a jar → add brine → seal → natural fermentation",
    },
    ja: {
      name: "貴州の酸菜",
      desc: "青菜を乳酸菌で発酵させた漬物です。酸味と香りがよく、貴州の伝統的な食べ物です。",
      process: "青菜を洗う→甕に入れる→塩水を加える→密封→自然発酵",
    },
  },
  云南乳扇: {
    en: {
      name: "Yunnan Rushan (dried milk fan)",
      desc: "Cow's milk is fermented with lactic acid, curdled and stretched into thin sheets, a traditional food of the Bai people of Yunnan.",
      process:
        "Heat the milk → add acid → curdle → stretch → dry → finished product",
    },
    ja: {
      name: "雲南の乳扇",
      desc: "牛乳を乳酸発酵させて凝固させ、引き伸ばして薄く干したものです。乳の香りが濃く、雲南のペー族の伝統的な食品です。",
      process: "牛乳を温める→酸を加える→凝固させる→引き伸ばす→干す→完成",
    },
  },
  云南普洱茶: {
    en: {
      name: "Yunnan Pu'er Tea",
      desc: "Tea leaves are pile-fermented, giving a deep, mellow aged aroma — a famous traditional Yunnan tea.",
      process: "Fix the leaves → roll → pile-ferment → ferment → dry → age",
    },
    ja: {
      name: "雲南のプーアル茶",
      desc: "茶葉を堆積発酵させたお茶です。熟成した深い香りがあり、雲南の伝統的な名茶です。",
      process: "茶葉を殺青する→揉捻→堆積発酵→発酵→乾燥→熟成",
    },
  },
  云南酸木瓜: {
    en: {
      name: "Yunnan Sour Papaya",
      desc: "Papaya is salted and fermented into a tangy, appetite-whetting snack traditional to Yunnan.",
      process:
        "Wash the papaya → cut into pieces → add salt → pickle → ferment → finished product",
    },
    ja: {
      name: "雲南の酸パパイア",
      desc: "パパイアを塩漬けにして発酵させたものです。酸味があり食欲をそそる、雲南の伝統的な小吃です。",
      process: "パパイアを洗う→切り分ける→塩を加える→漬ける→発酵→完成",
    },
  },
  西藏酥油茶: {
    en: {
      name: "Tibetan Butter Tea",
      desc: "Butter and tea are churned together into a rich, warming drink that is traditional in Xizang.",
      process:
        "Boil the tea → add butter → add salt → churn → finished product",
    },
    ja: {
      name: "チベットのバター茶",
      desc: "バターと茶葉を攪拌して作る飲み物です。香りが濃くまろやかで、チベット族の伝統的な飲み物です。",
      process: "茶葉を煮出す→バターを加える→塩を加える→攪拌する→完成",
    },
  },
  西藏青稞酒: {
    en: {
      name: "Tibetan Highland Barley Wine",
      desc: "Highland barley is fermented with a starter culture into a lightly sweet wine, traditional in Xizang.",
      process:
        "Steam the barley → mix with the starter → place in the crock → ferment → filter → finished product",
    },
    ja: {
      name: "チベットの青稞酒",
      desc: "ハダカムギを麹で発酵させた酒です。香りがよくほのかに甘く、チベット族の伝統的な飲み物です。",
      process: "ハダカムギを蒸す→麹を混ぜる→甕に入れる→発酵→ろ過→完成",
    },
  },
  陕西老陈醋: {
    en: {
      name: "Shaanxi Aged Vinegar",
      desc: "Made from sorghum through alcoholic and acetic acid fermentation, this vinegar is fragrant and strongly sour, a traditional Shaanxi vinegar.",
      process:
        "Steam sorghum → alcoholic fermentation → acetic acid fermentation → age → finished product",
    },
    ja: {
      name: "陝西の老陳酢",
      desc: "高粱を原料に、アルコール発酵と酢酸発酵を経て造られます。酸味と香りが強く、陝西の伝統的な名酢です。",
      process: "高粱を蒸す→アルコール発酵→酢酸発酵→熟成→完成",
    },
  },
  陕西浆水: {
    en: {
      name: "Shaanxi Jiangshui (fermented vegetable broth)",
      desc: "Celery and cabbage are fermented with lactic acid bacteria into a light, sour broth used as a Shaanxi seasoning.",
      process:
        "Wash the vegetables → cut into lengths → place in the crock → add noodle cooking water → natural fermentation",
    },
    ja: {
      name: "陝西の漿水",
      desc: "セロリと白菜を乳酸菌で発酵させた、さっぱりと酸味のある漬け汁です。陝西の伝統的な調味料です。",
      process: "野菜を洗う→切りそろえる→甕に入れる→麺のゆで汁を加える→自然発酵",
    },
  },
  甘肃浆水面: {
    en: {
      name: "Gansu Jiangshui Noodles",
      desc: "Celery is fermented into jiangshui broth, which is then poured over cooked noodles for a light, sour Gansu dish.",
      process:
        "Ferment the celery → make the jiangshui broth → cook the noodles → add the broth → season",
    },
    ja: {
      name: "甘粛の漿水麺",
      desc: "セロリを乳酸発酵させて漿水を作り、ゆでた麺に加えた料理です。さっぱりと酸味があり、甘粛の伝統的な麺料理です。",
      process: "セロリを発酵→漿水を作る→麺をゆでる→漿水を加える→味付け",
    },
  },
  甘肃酸奶: {
    en: {
      name: "Gansu Yoghurt",
      desc: "Fresh milk is fermented with lactic acid bacteria into a sweet-and-sour drink traditional in Gansu.",
      process:
        "Heat fresh milk → cool → inoculate with lactic acid bacteria → ferment at constant temperature → refrigerate",
    },
    ja: {
      name: "甘粛のヨーグルト",
      desc: "牛乳を乳酸菌で発酵させた飲み物です。甘酸っぱく、甘粛の伝統的な飲み物です。",
      process: "牛乳を温める→冷ます→乳酸菌を接種→定温で発酵→冷蔵",
    },
  },
  青海酸奶: {
    en: {
      name: "Qinghai Yoghurt",
      desc: "Yak milk is fermented with lactic acid bacteria into a thick, full-bodied drink traditional in Qinghai.",
      process:
        "Heat the yak milk → cool → inoculate with lactic acid bacteria → ferment at constant temperature → refrigerate",
    },
    ja: {
      name: "青海のヨーグルト",
      desc: "ヤクの乳を乳酸菌で発酵させた飲み物です。濃厚でコクがあり、青海の伝統的な飲み物です。",
      process: "ヤクの乳を温める→冷ます→乳酸菌を接種→定温で発酵→冷蔵",
    },
  },
  青海青稞酒: {
    en: {
      name: "Qinghai Highland Barley Wine",
      desc: "Highland barley is fermented with a starter culture into a clear, fragrant spirit traditional in Qinghai.",
      process:
        "Steam the barley → mix with the starter → place in the crock → ferment → distil → finished product",
    },
    ja: {
      name: "青海の青稞酒",
      desc: "ハダカムギを麹で発酵させた酒です。香りがすっきりとしており、青海の伝統的な飲み物です。",
      process: "ハダカムギを蒸す→麹を混ぜる→甕に入れる→発酵→蒸留→完成",
    },
  },
  宁夏枸杞酒: {
    en: {
      name: "Ningxia Goji Berry Wine",
      desc: "Goji berries are steeped in baijiu and left to infuse and ferment, producing a tonic wine typical of Ningxia.",
      process:
        "Wash the goji berries → place in the liquor → seal and steep → age → finished product",
    },
    ja: {
      name: "寧夏のクコ酒",
      desc: "クコの実と白酒を原料に、漬け込んで発酵させた薬酒です。滋養に良いとされ、寧夏の名産です。",
      process: "クコの実を洗う→酒に入れる→密封して漬け込む→熟成→完成",
    },
  },
  宁夏酸奶: {
    en: {
      name: "Ningxia Yoghurt",
      desc: "Fresh milk is fermented with lactic acid bacteria into a sweet-and-sour drink traditional in Ningxia.",
      process:
        "Heat fresh milk → cool → inoculate with lactic acid bacteria → ferment at constant temperature → refrigerate",
    },
    ja: {
      name: "寧夏のヨーグルト",
      desc: "牛乳を乳酸菌で発酵させた飲み物です。甘酸っぱく、寧夏の伝統的な飲み物です。",
      process: "牛乳を温める→冷ます→乳酸菌を接種→定温で発酵→冷蔵",
    },
  },
  新疆酸奶: {
    en: {
      name: "Xinjiang Yoghurt",
      desc: "Fresh milk is fermented with lactic acid bacteria into a rich, sweet-and-sour drink traditional in Xinjiang.",
      process:
        "Heat fresh milk → cool → inoculate with lactic acid bacteria → ferment at constant temperature → refrigerate",
    },
    ja: {
      name: "新疆のヨーグルト",
      desc: "牛乳を乳酸菌で発酵させた飲み物です。酸味とコクが濃く、新疆の伝統的な飲み物です。",
      process: "牛乳を温める→冷ます→乳酸菌を接種→定温で発酵→冷蔵",
    },
  },
  新疆馕: {
    en: {
      name: "Xinjiang Naan",
      desc: "Wheat dough is fermented, shaped and baked against the wall of a tandoor, giving bread that is crisp outside and soft inside.",
      process:
        "Mix the dough → ferment → shape → press onto the tandoor wall → bake → finished product",
    },
    ja: {
      name: "新疆のナン",
      desc: "小麦粉の生地を発酵させて成形し、窯の内壁に貼り付けて焼いたパンです。外はカリッと中はふんわりしています。",
      process: "生地をこねる→発酵→成形→窯の内壁に貼る→焼く→完成",
    },
  },
  新疆马奶酒: {
    en: {
      name: "Xinjiang Mare's Milk Wine",
      desc: "Mare's milk is fermented naturally into a lightly sour drink with a wine-like aroma, traditional among the Kazakh people of Xinjiang.",
      process:
        "Collect mare's milk → inoculate → stir and ferment → finished product",
    },
    ja: {
      name: "新疆の馬乳酒",
      desc: "馬乳を自然発酵させた飲み物です。ほのかな酸味と酒のような香りがあり、新疆のカザフ族の伝統的な飲み物です。",
      process: "馬乳を集める→種菌を加える→撹拌して発酵→完成",
    },
  },
  台湾豆腐乳: {
    en: {
      name: "Taiwanese Fermented Bean Curd",
      desc: "Tofu is fermented with mucor mould and then salted, giving a smooth, savoury fermented bean curd traditional in Taiwan.",
      process:
        "Cut the tofu into blocks → inoculate with mucor → ferment → salt-cure → seal and ferment",
    },
    ja: {
      name: "台湾の豆腐乳",
      desc: "豆腐をクモノスカビで発酵させ、塩漬けにして熟成させたものです。塩味と香りがよくきめ細かく、台湾の伝統的な調味料です。",
      process: "豆腐を切り分ける→クモノスカビを接種→発酵→塩漬け→密封して発酵",
    },
  },
  台湾米酒: {
    en: {
      name: "Taiwanese Rice Wine",
      desc: "Rice is fermented with rice koji into a clear, fragrant wine traditional in Taiwan.",
      process:
        "Soak the rice → steam → mix with koji → place in the crock → ferment → distil → finished product",
    },
    ja: {
      name: "台湾の米酒",
      desc: "米を麹で発酵させた酒です。香りがすっきりとしており、台湾の伝統的な名酒です。",
      process: "米を浸す→蒸す→麹を混ぜる→甕に入れる→発酵→蒸留→完成",
    },
  },
  香港腐乳: {
    en: {
      name: "Hong Kong Fermented Bean Curd",
      desc: "Tofu is fermented with mucor mould and then salted, giving a smooth, savoury fermented bean curd traditional in Hong Kong.",
      process:
        "Cut the tofu into blocks → inoculate with mucor → ferment → salt-cure → seal and ferment",
    },
    ja: {
      name: "香港の腐乳",
      desc: "豆腐をクモノスカビで発酵させ、塩漬けにして熟成させたものです。塩味と香りがよくきめ細かく、香港の伝統的な調味料です。",
      process: "豆腐を切り分ける→クモノスカビを接種→発酵→塩漬け→密封して発酵",
    },
  },
  香港酱油: {
    en: {
      name: "Hong Kong Soy Sauce",
      desc: "Soybeans are inoculated with koji and fermented, then pressed into an aromatic soy sauce traditional in Hong Kong.",
      process:
        "Boil soybeans → inoculate with koji → place in the crock → add brine → ferment → press → finished product",
    },
    ja: {
      name: "香港の醤油",
      desc: "大豆を麹にして発酵させ、圧搾して造る醤油です。香りが豊かで、香港の伝統的な調味料です。",
      process: "大豆を煮る→麹をつくる→甕に入れる→塩水を加える→発酵→圧搾→完成",
    },
  },
  澳门腐乳: {
    en: {
      name: "Macao Fermented Bean Curd",
      desc: "Tofu is fermented with mucor mould and then salted, giving a smooth, savoury fermented bean curd traditional in Macao.",
      process:
        "Cut the tofu into blocks → inoculate with mucor → ferment → salt-cure → seal and ferment",
    },
    ja: {
      name: "マカオの腐乳",
      desc: "豆腐をクモノスカビで発酵させ、塩漬けにして熟成させたものです。塩味と香りがよくきめ細かく、マカオの伝統的な調味料です。",
      process: "豆腐を切り分ける→クモノスカビを接種→発酵→塩漬け→密封して発酵",
    },
  },
  澳门米酒: {
    en: {
      name: "Macao Rice Wine",
      desc: "Rice is fermented with rice koji into a clear, fragrant wine traditional in Macao.",
      process:
        "Soak the rice → steam → mix with koji → place in the crock → ferment → distil → finished product",
    },
    ja: {
      name: "マカオの米酒",
      desc: "米を麹で発酵させた酒です。香りがすっきりとしており、マカオの伝統的な飲み物です。",
      process: "米を浸す→蒸す→麹を混ぜる→甕に入れる→発酵→蒸留→完成",
    },
  },
};
