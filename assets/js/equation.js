const CALCULATIONS = [
    {
        "Probe": "PR",
        "Tissue": "Liver",
        "Dimension": "Length",
        "Variable 1": 0.897,
        "Variable 2": 0.039460,
        "Variable 3": 0
    },
    {
        "Probe": "PR",
        "Tissue": "Liver",
        "Dimension": "Height",
        "Variable 1": 0.7691,
        "Variable 2": 0.02011,
        "Variable 3": 0
    },
    {
        "Probe": "PR",
        "Tissue": "Liver",
        "Dimension": "Offset",
        "Variable 1": 0.1337,
        "Variable 2": 0.004165,
        "Variable 3": 0
    },
    {
        "Probe": "PR",
        "Tissue": "Kidney",
        "Dimension": "Length",
        "Variable 1": 0.8762,
        "Variable 2": 0.03805,
        "Variable 3": 0
    },
    {
        "Probe": "PR",
        "Tissue": "Kidney",
        "Dimension": "Height",
        "Variable 1": 0.6996,
        "Variable 2": 0.0223,
        "Variable 3": 0
    },
    {
        "Probe": "PR",
        "Tissue": "Kidney",
        "Dimension": "Offset",
        "Variable 1": 0.1571,
        "Variable 2": 0.00378,
        "Variable 3": 0
    },
    {
        "Probe": "PR",
        "Tissue": "Lung",
        "Dimension": "Length",
        "Variable 1": 0.6782,
        "Variable 2": 0.03845,
        "Variable 3": 0
    },
    {
        "Probe": "PR",
        "Tissue": "Lung",
        "Dimension": "Height",
        "Variable 1": 0.4649,
        "Variable 2": 0.01847,
        "Variable 3": 0
    },
    {
        "Probe": "PR",
        "Tissue": "Lung",
        "Dimension": "Offset",
        "Variable 1": 0.068,
        "Variable 2": 0.003762,
        "Variable 3": 0
    },
    {
        "Probe": "PR-XT",
        "Tissue": "Liver",
        "Dimension": "Length",
        "Variable 1": 0.8031,
        "Variable 2": 0.03982,
        "Variable 3": 0
    },
    {
        "Probe": "PR-XT",
        "Tissue": "Liver",
        "Dimension": "Height",
        "Variable 1": 0.7686,
        "Variable 2": 0.02157,
        "Variable 3": 0
    },
    {
        "Probe": "PR-XT",
        "Tissue": "Liver",
        "Dimension": "Offset",
        "Variable 1": 0.1067,
        "Variable 2": 0.004139,
        "Variable 3": 0
    },
    {
        "Probe": "PR-XT",
        "Tissue": "Kidney",
        "Dimension": "Length",
        "Variable 1": 0.7939,
        "Variable 2": 0.03755,
        "Variable 3": 0
    },
    {
        "Probe": "PR-XT",
        "Tissue": "Kidney",
        "Dimension": "Height",
        "Variable 1": 0.6638,
        "Variable 2": 0.02194,
        "Variable 3": 0
    },
    {
        "Probe": "PR-XT",
        "Tissue": "Kidney",
        "Dimension": "Offset",
        "Variable 1": 0.1617,
        "Variable 2": 0.00315,
        "Variable 3": 0
    },
    {
        "Probe": "LK",
        "Tissue": "Liver",
        "Dimension": "Length",
        "Variable 1": 1.1177,
        "Variable 2": 0.02654,
        "Variable 3": 0
    },
    {
        "Probe": "LK",
        "Tissue": "Liver",
        "Dimension": "Height",
        "Variable 1": 0.9341,
        "Variable 2": 0.012288,
        "Variable 3": 0
    },
    {
        "Probe": "LK",
        "Tissue": "Liver",
        "Dimension": "Offset",
        "Variable 1": 0.413,
        "Variable 2": 0.010584,
        "Variable 3": -2
    },
    {
        "Probe": "LK",
        "Tissue": "Kidney",
        "Dimension": "Length",
        "Variable 1": 1.1582,
        "Variable 2": 0.02351,
        "Variable 3": 0
    },
    {
        "Probe": "LK",
        "Tissue": "Kidney",
        "Dimension": "Height",
        "Variable 1": 0.8629,
        "Variable 2": 0.012213,
        "Variable 3": 0
    },
    {
        "Probe": "LK",
        "Tissue": "Kidney",
        "Dimension": "Offset",
        "Variable 1": 0.6185,
        "Variable 2": 0.00729,
        "Variable 3": -2
    },
    {
        "Probe": "LK",
        "Tissue": "Lung",
        "Dimension": "Length",
        "Variable 1": 1.1377,
        "Variable 2": 0.03103,
        "Variable 3": 0
    },
    {
        "Probe": "LK",
        "Tissue": "Lung",
        "Dimension": "Height",
        "Variable 1": 0.7469,
        "Variable 2": 0.01385,
        "Variable 3": 0
    },
    {
        "Probe": "LK",
        "Tissue": "Lung",
        "Dimension": "Offset",
        "Variable 1": 0.39,
        "Variable 2": 0.00995,
        "Variable 3": -2
    },
    {
        "Probe": "LK-XT",
        "Tissue": "Liver",
        "Dimension": "Length",
        "Variable 1": 1.1896,
        "Variable 2": 0.024405,
        "Variable 3": 0
    },
    {
        "Probe": "LK-XT",
        "Tissue": "Liver",
        "Dimension": "Height",
        "Variable 1": 0.916,
        "Variable 2": 0.01339,
        "Variable 3": 0
    },
    {
        "Probe": "LK-XT",
        "Tissue": "Liver",
        "Dimension": "Offset",
        "Variable 1": 0.4462,
        "Variable 2": 0.00832,
        "Variable 3": -2
    },
    {
        "Probe": "LK-XT",
        "Tissue": "Kidney",
        "Dimension": "Length",
        "Variable 1": 1.0139,
        "Variable 2": 0.02254,
        "Variable 3": 0
    },
    {
        "Probe": "LK-XT",
        "Tissue": "Kidney",
        "Dimension": "Height",
        "Variable 1": 0.7766,
        "Variable 2": 0.01315,
        "Variable 3": 0
    },
    {
        "Probe": "LK-XT",
        "Tissue": "Kidney",
        "Dimension": "Offset",
        "Variable 1": 0.4118,
        "Variable 2": 0.01012,
        "Variable 3": -2
    },
    {
        "Probe": "SR",
        "Tissue": "Liver",
        "Dimension": "Length",
        "Variable 1": 1.1861,
        "Variable 2": 0.02564,
        "Variable 3": 0
    },
    {
        "Probe": "SR",
        "Tissue": "Liver",
        "Dimension": "Height",
        "Variable 1": 0.9224,
        "Variable 2": 0.015121,
        "Variable 3": 0
    },
    {
        "Probe": "SR",
        "Tissue": "Liver",
        "Dimension": "Offset",
        "Variable 1": 0.4693,
        "Variable 2": 0.00853,
        "Variable 3": -2
    },
    {
        "Probe": "SR",
        "Tissue": "Kidney",
        "Dimension": "Length",
        "Variable 1": 1.1678,
        "Variable 2": 0.02365,
        "Variable 3": 0
    },
    {
        "Probe": "SR",
        "Tissue": "Kidney",
        "Dimension": "Height",
        "Variable 1": 0.7901,
        "Variable 2": 0.013141,
        "Variable 3": 0
    },
    {
        "Probe": "SR",
        "Tissue": "Kidney",
        "Dimension": "Offset",
        "Variable 1": 0.5624,
        "Variable 2": 0.00684,
        "Variable 3": -2
    },
    {
        "Probe": "LN",
        "Tissue": "Lung",
        "Dimension": "Length",
        "Variable 1": 1.181,
        "Variable 2": 0.02963,
        "Variable 3": 0
    },
    {
        "Probe": "LN",
        "Tissue": "Lung",
        "Dimension": "Height",
        "Variable 1": 0.7403,
        "Variable 2": 0.01308,
        "Variable 3": 0
    },
    {
        "Probe": "LN",
        "Tissue": "Lung",
        "Dimension": "Offset",
        "Variable 1": 0.4313,
        "Variable 2": 0.00743,
        "Variable 3": -2
    },
    {
        "Probe": "PRS15",
        "Tissue": "Liver",
        "Dimension": "Length",
        "Variable 1": 0.8728,
        "Variable 2": 0.03245,
        "Variable 3": 0
    },
    {
        "Probe": "PRS15",
        "Tissue": "Liver",
        "Dimension": "Height",
        "Variable 1": 0.8085,
        "Variable 2": 0.01971,
        "Variable 3": 0
    },
    {
        "Probe": "PRS15",
        "Tissue": "Liver",
        "Dimension": "Offset",
        "Variable 1": 0.1087,
        "Variable 2": 0.003783,
        "Variable 3": 0
    },
    {
        "Probe": "PRS15",
        "Tissue": "Kidney",
        "Dimension": "Length",
        "Variable 1": 0.7903,
        "Variable 2": 0.0313,
        "Variable 3": 0
    },
    {
        "Probe": "PRS15",
        "Tissue": "Kidney",
        "Dimension": "Height",
        "Variable 1": 0.6347,
        "Variable 2": 0.01775,
        "Variable 3": 0
    },
    {
        "Probe": "PRS15",
        "Tissue": "Kidney",
        "Dimension": "Offset",
        "Variable 1": 0.1003,
        "Variable 2": 0.003666,
        "Variable 3": 0
    }
];

const MULTI_PROBES = [
    {
        "Probe": "PR",
        "Count": 2,
        "Length": 5.8,
        "Height": 4.6,
        "Offset": 0,
        "Time": 10,
        "Power": 65
    },
    {
        "Probe": "PR",
        "Count": 3,
        "Length": 6.5,
        "Height": 5.3,
        "Offset": 0,
        "Time": 10,
        "Power": 65
    },
    {
        "Probe": "PR-XT",
        "Count": 2,
        "Length": 5.6,
        "Height": 4.7,
        "Offset": 0,
        "Time": 10,
        "Power": 65
    },
    {
        "Probe": "PR-XT",
        "Count": 3,
        "Length": 6.0,
        "Height": 5.2,
        "Offset": 0,
        "Time": 10,
        "Power": 65
    },
    {
        "Probe": "PRS15",
        "Count": 2,
        "Length": 5.6,
        "Height": 4.4,
        "Offset": 0,
        "Time": 10,
        "Power": 80
    },
    {
        "Probe": "PRS15",
        "Count": 3,
        "Length": 6.2,
        "Height": 4.9,
        "Offset": 0,
        "Time": 10,
        "Power": 80
    },
    {
        "Probe": "LK",
        "Count": 2,
        "Length": 6.4,
        "Height": 4.8,
        "Offset": 0,
        "Time": 10,
        "Power": 95
    },
    {
        "Probe": "LK",
        "Count": 3,
        "Length": 6.4,
        "Height": 5.0,
        "Offset": 0,
        "Time": 10,
        "Power": 65
    },
    {
        "Probe": "LK-XT",
        "Count": 2,
        "Length": 6.8,
        "Height": 4.9,
        "Offset": 0,
        "Time": 10,
        "Power": 95
    },
    {
        "Probe": "LK-XT",
        "Count": 3,
        "Length": 6.5,
        "Height": 5.3,
        "Offset": 0,
        "Time": 10,
        "Power": 65
    },
    {
        "Probe": "SR",
        "Count": 2,
        "Length": 6.6,
        "Height": 5.1,
        "Offset": 0,
        "Time": 10,
        "Power": 95
    },
    {
        "Probe": "SR",
        "Count": 3,
        "Length": 6.3,
        "Height": 5.2,
        "Offset": 0,
        "Time": 10,
        "Power": 65
    },
];

const MAX_POWERS = {
    'PR': 65,
    'PR-XT': 65,
    'LK': 140,
    'LK-XT': 140,
    'SR': 140,
    'LN': 140,
    'PRS15': 80
};

const POWER_TIME_LIMIT = {
    'PR': { 30: 5, 35: 3, 40: 3, 45: 3, 50: 0 },
    'PR-XT': { 30: 5, 35: 3, 40: 3, 45: 3, 50: 0 },
    'LN': { 40: 5, 45: 5, 50: 5, 55: 5, 60: 3, 65: 3, 70: 3, 75: 3, 80: 3, 85: 3, 90: 3, 95: 3, 100: 0 },
    'LK': { 40: 5, 45: 5, 50: 5, 55: 5, 60: 3, 65: 3, 70: 3, 75: 3, 80: 3, 85: 3, 90: 3, 95: 3, 100: 0 },
    'LK-XT': { 40: 5, 45: 5, 50: 5, 55: 5, 60: 3, 65: 3, 70: 3, 75: 3, 80: 3, 85: 3, 90: 3, 95: 3, 100: 0 },
    'SR': { 40: 5, 45: 5, 50: 5, 55: 5, 60: 3, 65: 3, 70: 3, 75: 3, 80: 3, 85: 3, 90: 3, 95: 3, 100: 0 },
    'PRS15': { 40: 3, 45: 3, 50: 3, 55: 3, 60: 0 }
};
