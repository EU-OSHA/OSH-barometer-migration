// Enforcement Capacity Sub menus
export const workAccidents = [
    {
        url: "non-fatal-work-accidents",
        literalTab: "310"
    },
    { 
        url:"fatal-work-accidents",
        literalTab: "311"
    }
]

export const oshCulture = [
    {
        url: "health-and-safety-discussed",
        literalTab: "20664",
        chartType: [
            {title: "22129", chart: "20091", chartIndicator: "358", sector: ["14"], answers: ["97", "98", "99"], legend: "20570"}
        ]
    },
    { 
        url:"action-plan-to-prevent-stress",
        literalTab: "20665",
        chartType: [
            {title: "457", chart: "20092", chartIndicator: "328", sector: ["14"], answers: ["1", "2"], legend: "20571"}
        ]
    },
    { 
        url:"procedure-against-bullying",
        literalTab: "20666",
        chartType: [
            {title: "458", chart: "20093", chartIndicator: "329", sector: ["14"], answers: ["1", "2"], legend: "20572"}
        ]
    },
    { 
        url:"procedures-to-deal-with-threats",
        literalTab: "20667",
        chartType: [
            {title: "22132", chart: "20094", chartIndicator: "330", sector: ["14"], answers: ["1", "2"], legend: "20573"}
        ]
    },
    { 
        url:"measures-to-reduce-work-pressure",
        literalTab: "20668",
        chartType: [
            {title: "22133", chart: "20095", chartIndicator: "331", sector: ["14"], answers: ["1", "2"], legend: "20574"}
        ]
    },
    { 
        url:"use-of-personal-protective-equipment",
        literalTab: "320",
        chartType: [
            {title: "22126", chart: "20038", chartIndicator: "63", sector: ["14"], answers: ["6", "7", "32"], legend: "20575"}
        ]
    },
    { 
        url:"information-about-risks",
        literalTab: "321",
        chartType: [
            {title: "22127", chart: "20039", chartIndicator: "64", sector: ["14"], answers: ["8", "9"], legend: "20576"}
        ]
    }
]

export const overallOpinion = [
    { 
        url:"job-satisfaction",
        literalTab: "322",
        chartType: [
            {title: "22134", chart: "20040", chartIndicator: "65", sector: ["14"], answers: ['10','11','12','13'], legend: "20580"}
        ],
        indicator:"65"
    },
    { 
        url:"health-at-risk",
        literalTab: "323",
        indicator:"66"
    }
]

export const mentalRisk = [
    { 
        url:"time-pressure",
        literalTab: "340",
        chartType: [
            {type: "esener", title: "22136" , chart: "20096", chartIndicator: "323", sector: ["14"], answers: ["1", "2"], legend: "20585"},
            {type: "ewcs", title: "22179", chart: "20073", chartIndicator: "83", sector: ["14"], answers: ["14", "15", "16"], legend: "20584"}
        ]
    },
    {
        url:"poor-communication",
        literalTab: "341",
        chartType: [
            {type: "esener", title: "22137", chart: "20097", chartIndicator: "324", sector: ["14"], answers: ["1", "2"], legend: "20587"},
            {type: "ewcs", title: "22180", chart: "20074", chartIndicator: "84", sector: ["14"], answers: ["17"], legend: "20586"}
        ]
    },
    {
        url:"influence",
        literalTab: "342", 
        chartType: [{type: "ewcs", chart:"20075", title: "22181", chartIndicator: "85", sector: null, answers: ["18", "19", "20"], legend: "20588"}]
    },
    {
        url:"fear-of-job-loss",
        literalTab: "343",
        chartType: [
            {type: "esener", title: "22139", chart: "20098", chartIndicator: "325", sector: ["14"], answers: ["1", "2"], legend: "20591"},
            {type: "ewcs", title: "22182", chart: "20076", chartIndicator: "86", sector: ["14"], answers: ["21", "22", "23"], legend: "20590"}
        ]
    },
    {
        url:"difficult-clients",
        literalTab: "344",
        chartType: [
            {type: "esener", title: "22140", chart: "20099", chartIndicator: "326", sector: ["14"], answers: ["1", "2"], legend: "20593"},
            {type: "ewcs", title: "22183", chart: "20077", chartIndicator: "87", sector: ["14"], answers: ["14", "15", "16"], legend: "20592"}
        ]
    },
    {
        url:"working-hours",
        literalTab: "345",
        chartType: [
            {type: "esener", title: "22141", chart: "20100", chartIndicator: "327", sector: ["14"], answers: ["1", "2"], legend: "20595"},
            {type: "ewcs", title: "22184", chart: "20078", chartIndicator: "88", sector: ["14"], answers: ["24", "25"], legend: "20594"}
        ]
    },
    {
        url:"discrimination",
        literalTab: "346",
        chartType: [
            {type: "ewcs", title:"22185", chart: "20079", chartIndicator: "89", sector: ["14"], answers: ["1","2"], legend: "20596"}
        ]
    }
]

export const physicalRiskTabs = [
    { 
        literalTab: "20654",
        url: "vibrations-loud-noise-and-temperature",
        chartType: [
            {type: "esener", chart:"20049", title: "20654", chartIndicator: null, sector: null, answers: null, legend: null}
        ]
    },
    { 
        literalTab: "20655",
        url: "exposure-to-dangerous-substances",
        subTabs: [
        {
            literalTab: "328",
            url: "smoke-powder-or-dust",
            chartType: [{type: "ewcs", chart:"20053", title: "22143", chartIndicator: "71", sector: null, answers: ["26", "27"], legend: "20598"}]
        },
        {
            literalTab: "329",
            url: "vapours", 
            chartType: [{type: "ewcs", chart:"20054", title: "22144", chartIndicator: "72", sector: null, answers: ["26", "27"], legend: "20599"}]
        },
        {
            literalTab: "330",
            url: "chemical-products", 
            chartType: [{type: "ewcs", chart:"20055", title: "22145", chartIndicator: "73", sector: null, answers: ["26", "27"], legend: "20600"}]
        },
        {
            literalTab: "331",
            url: "infectious-materials", 
            chartType: [{type: "ewcs", chart:"20056", title: "22146", chartIndicator: "74", sector: null, answers: ["26", "27"], legend: "20601"}]
        }]
    },
    { 
        literalTab: "20656",
        url: "ergonomic-risks",
        chartType: [
            {type: "esener", chart:"20101", title: "20656", chartIndicator: null, sector: null, answers: null, legend: null},
            {type: "ewcs", chart:"20080", title: "20656", chartIndicator: null, sector: null, answers: null, legend: null}
        ]
    }
]

export const preventionInCompanies = [
    {
        url:"risk-assessment",
        literalTab: "20679",
        chartType: [
            {type: "sector", chart:"20102", title: "720", chartIndicator: "304", sector: ["2","3","4","5","6","7","18","14"], size: null, answers: ["1"], legend: "20603"},
            {type: "establishment size", chart:"20102", title: "720", chartIndicator: "304", sector: null, "size":["7","8","14","10","11"], answers: ["1"], legend: "20602"}
        ]
    },
    {
        url:"internal-or-external-ra",
        literalTab: "20680", 
        chartType: [{type: "ewcs", chart:"20103", title: "22148", chartIndicator: "305", sector: ["14"], answers: ["28", "29", "30"], legend: "20604"}]
    },
    {
        url:"evaluated-aspects-in-risk-assessments",
        literalTab: "20681", 
        chartType: [{type: "ewcs", chart:"", title: "20681", chartIndicator: "", sector: null, answers: ["1", "2"], legend: "20605"}]
    },
    {
        url:"training-in-osh",
        literalTab: "20682", 
        chartType: [{type: "ewcs", chart:"20104", title: "22149", chartIndicator: "360", sector: ["14"], answers: ["1", "2", "71"], legend: "20606"}]
    },
    {
        url:"employees-participation-in-prevention",
        literalTab: "20683", 
        chartType: [
            {type: "sector", chart:"20105", title: "22149", chartIndicator: "353", sector: ["2","3","4","5","6","7","18","14"], answers: ["1"], legend: "20607"},
            {type: "establishment size", chart:"20105", title: "22150", chartIndicator: "353", sector: null, "size":["7","8","14","10","11"], answers: ["1"], legend: "20608"}
        ]
    },
]

export const workerInvolvementTabs = [
    { 
        literalTab: "22015", 
        chartType: [
            {type: "esener", chart:"20106", title: "22015", chartIndicator: null, sector: null, answers: null, legend: null},
            {type: "ewcs", chart:"20069", title: "22015", chartIndicator: null, sector: null, answers: null, legend: null}
        ]
    }
]

export const enforcementCapacityTabs = [
    {
        literalTab: '20692',
        url: 'establishments-inspected',
        chartType: [{
            title: '20692', subTitle: '20693', chart: '20107', chartIndicator: '285', sector: ['14'], answers: ['1', '2']
        }]
    },
    {
        literalTab: '333',
        url: 'authority',
        indicator: '76'
        // page: 'STRATEGY_ENFOR_CAPACITY'
    },
    {
        literalTab: '334',
        url: 'scope-of-the-labor-inspection',
        indicator: '77'
        // page: 'STRATEGY_ENFOR_CAPACITY'
    },
    {
        literalTab: '335',
        url: 'inspector-powers',
        indicator: '78'
        // page: 'STRATEGY_ENFOR_CAPACITY'
    },
    {
        literalTab: '336',
        url: 'strategy-plan',
        indicator: '79'
        // page: 'STRATEGY_ENFOR_CAPACITY'
    }
]