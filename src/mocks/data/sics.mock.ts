import { SIC, SICApiResponse } from '@/features/submissions/types'

/**
 * Mock data for SICs
 */
export const mockSICsData: SIC[] = [
  {
    sicCode: 111,
    riskCode: 1,
    description: '111 1 Farming, Wheat',
  },
  {
    sicCode: 112,
    riskCode: 1,
    description: '112 1 Farming, Rice',
  },
  {
    sicCode: 115,
    riskCode: 1,
    description: '115 1 Farming, Corn',
  },
  {
    sicCode: 116,
    riskCode: 1,
    description: '116 1 Farming, Soybeans',
  },
  {
    sicCode: 119,
    riskCode: 1,
    description: '119 1 Farming, Cash Grains, NEC',
  },
  {
    sicCode: 131,
    riskCode: 1,
    description: '131 1 Farming, Cotton',
  },
  {
    sicCode: 132,
    riskCode: 1,
    description: '132 1 Farming, Tobacco',
  },
  {
    sicCode: 133,
    riskCode: 1,
    description: '133 1 Farming, Sugarcane and Sugar Beets',
  },
  {
    sicCode: 134,
    riskCode: 1,
    description: '134 1 Farming, Irish Potatoes',
  },
  {
    sicCode: 139,
    riskCode: 1,
    description: '139 1 Farming, Field Crops, Except Cash Grains, NEC',
  },
  {
    sicCode: 161,
    riskCode: 1,
    description: '161 1 Farming, Vegetables and Melons',
  },
  {
    sicCode: 171,
    riskCode: 1,
    description: '171 1 Farming, Berry Crops',
  },
  {
    sicCode: 172,
    riskCode: 1,
    description: '172 1 Farming, Grapes',
  },
  {
    sicCode: 173,
    riskCode: 1,
    description: '173 1 Farming, Tree Nuts',
  },
  {
    sicCode: 174,
    riskCode: 1,
    description: '174 1 Farming, Citrus Fruits',
  },
  {
    sicCode: 175,
    riskCode: 1,
    description: '175 1 Farming, Deciduous Tree Fruits',
  },
  {
    sicCode: 179,
    riskCode: 1,
    description: '179 1 Farming, Fruits and Tree Nuts, NEC',
  },
  {
    sicCode: 181,
    riskCode: 1,
    description: '181 1 Farming, Christmas Trees',
  },
  {
    sicCode: 181,
    riskCode: 2,
    description: '181 2 Ornamental Floriculture and Nursery Products',
  },
  {
    sicCode: 182,
    riskCode: 1,
    description: '182 1 Farming, in Greenhouses',
  },
  {
    sicCode: 182,
    riskCode: 2,
    description: '182 2 OBSP Only - Agricultural - Cannabis',
  },
  {
    sicCode: 191,
    riskCode: 1,
    description: '191 1 General Farms, Primarily Crop',
  },
  {
    sicCode: 191,
    riskCode: 2,
    description:
      '191 2 Farming Sod - more than 160 acres but not more than 500',
  },
  {
    sicCode: 191,
    riskCode: 3,
    description: '191 3 Farming Sod - not more than 160 acres',
  },
  {
    sicCode: 191,
    riskCode: 4,
    description: '191 4 Farming Sod - more than 500 acres',
  },
  {
    sicCode: 191,
    riskCode: 5,
    description: '191 5 E&S Group only - Agricultural - Crop',
  },
  {
    sicCode: 211,
    riskCode: 1,
    description: '211 1 Beef Cattle Feedlot Stockyards',
  },
  {
    sicCode: 212,
    riskCode: 1,
    description: '212 1 Beef Cattle, Except Feedlots',
  },
  {
    sicCode: 213,
    riskCode: 1,
    description: '213 1 Farming, Hogs',
  },
  {
    sicCode: 214,
    riskCode: 1,
    description: '214 1 Farming, Sheep and Goats',
  },
  {
    sicCode: 219,
    riskCode: 1,
    description: '219 1 General Livestock,  Except Dairy and Poultry',
  },
  {
    sicCode: 241,
    riskCode: 1,
    description: '241 1 Dairy Farms',
  },
  {
    sicCode: 241,
    riskCode: 2,
    description: '241 2 E&S Group only - Agricultural - Animal',
  },
  {
    sicCode: 251,
    riskCode: 1,
    description: '251 1 Broiler, Fryers, and Roaster Chickens',
  },
  {
    sicCode: 252,
    riskCode: 1,
    description: '252 1 Chicken Eggs',
  },
  {
    sicCode: 253,
    riskCode: 1,
    description: '253 1 Turkey and Turkey Eggs',
  },
  {
    sicCode: 254,
    riskCode: 1,
    description: '254 1 Poultry Hatcheries',
  },
  {
    sicCode: 259,
    riskCode: 1,
    description: '259 1 Poultry and Eggs, NEC',
  },
  {
    sicCode: 271,
    riskCode: 1,
    description: '271 1 Fur-Bearing Animals and Rabbits',
  },
  {
    sicCode: 272,
    riskCode: 1,
    description: '272 1 Horses and Other Equines',
  },
  {
    sicCode: 273,
    riskCode: 1,
    description: '273 1 Animal Aquaculture',
  },
  {
    sicCode: 279,
    riskCode: 1,
    description: '279 1 Animal Specialties, NEC',
  },
  {
    sicCode: 291,
    riskCode: 1,
    description: '291 1 General farms, primarily animals',
  },
  {
    sicCode: 711,
    riskCode: 1,
    description: '711 1 Soil Preparation Services',
  },
  {
    sicCode: 721,
    riskCode: 1,
    description: '721 1 Crop Planting, Cultivating, and Protecting',
  },
  {
    sicCode: 721,
    riskCode: 2,
    description: '721 2 Crop Spraying by Contractors',
  },
  {
    sicCode: 721,
    riskCode: 3,
    description: '721 3 Orchards and Vineyards--operation by contractors',
  },
  {
    sicCode: 721,
    riskCode: 4,
    description: '721 4 ABC Program Only-Aerial AG Operations (Crop Dusting)',
  },
  {
    sicCode: 722,
    riskCode: 1,
    description: '722 1 Crop Harvesting, Primarily by Machine',
  },
  {
    sicCode: 723,
    riskCode: 1,
    description: '723 1 Grain Elevator Operations',
  },
  {
    sicCode: 723,
    riskCode: 2,
    description: '723 2 Vegetable and Fruit Packing',
  },
  {
    sicCode: 723,
    riskCode: 3,
    description: '723 3 Seed Processors',
  },
  {
    sicCode: 724,
    riskCode: 1,
    description: '724 1 Cotton Gin Operations',
  },
  {
    sicCode: 724,
    riskCode: 2,
    description:
      '724 2 Cotton Gin Operations--other than those performed for a fee per bale',
  },
  {
    sicCode: 741,
    riskCode: 1,
    description: '741 1 Veterinary Services - Livestock',
  },
  {
    sicCode: 742,
    riskCode: 1,
    description: '742 1 Veterinary Services - Non-livestock',
  },
  {
    sicCode: 751,
    riskCode: 1,
    description: '751 1 Livestock Services, Except Veterinary',
  },
  {
    sicCode: 751,
    riskCode: 2,
    description: '751 2 Artificial Insemination Businesses',
  },
  {
    sicCode: 752,
    riskCode: 1,
    description: '752 1 Animal specialty services - Non Livestock',
  },
  {
    sicCode: 752,
    riskCode: 2,
    description: '752 2 Dog Obedience Schools / Pet Training',
  },
  {
    sicCode: 752,
    riskCode: 3,
    description: '752 3 Kennels--breeding, boarding or sales',
  },
  {
    sicCode: 752,
    riskCode: 4,
    description: '752 4 Pet Grooming Services',
  },
  {
    sicCode: 752,
    riskCode: 5,
    description: '752 5 Pet Sitters',
  },
  {
    sicCode: 752,
    riskCode: 6,
    description: '752 6 Animal Shelters',
  },
  {
    sicCode: 752,
    riskCode: 7,
    description: '752 7 Breeding Farms - Horses',
  },
  {
    sicCode: 752,
    riskCode: 8,
    description: '752 8 Pet Care (except Veterinary) Services, NEC',
  },
  {
    sicCode: 752,
    riskCode: 9,
    description: '752 9 Breeding Farms - Ratite Birds',
  },
  {
    sicCode: 752,
    riskCode: 10,
    description: '752 10 Breeding Farms - Small Animals',
  },
  {
    sicCode: 752,
    riskCode: 11,
    description: '752 11 Support Activities for Animal Production, NEC',
  },
  {
    sicCode: 761,
    riskCode: 1,
    description: '761 1 Fruit or Vegetable Harvesting Contractors',
  },
  {
    sicCode: 762,
    riskCode: 1,
    description: '762 1 Farm Management Services',
  },
  {
    sicCode: 781,
    riskCode: 1,
    description: '781 1 Landscape Contractors',
  },
  {
    sicCode: 781,
    riskCode: 2,
    description:
      '781 2 Construction @vantage - PIM use only - monoline property and/or inland marine only - Landscape Contractors',
  },
  {
    sicCode: 781,
    riskCode: 3,
    description:
      '781 3 Energy Program Only - Construction @vantage - Landscape Contractors',
  },
  {
    sicCode: 782,
    riskCode: 1,
    description: '782 1 Lawn Care Services with chemical application',
  },
  {
    sicCode: 782,
    riskCode: 2,
    description: '782 2 Lawn Care Services w/o chemical application',
  },
  {
    sicCode: 782,
    riskCode: 3,
    description:
      '782 3 Construction @vantage - PIM use only - monoline property and/or inland marine only - Lawn and Garden Services',
  },
  {
    sicCode: 782,
    riskCode: 4,
    description:
      '782 4 Energy Program Only - Construction @vantage - Lawn and Garden Services',
  },
  {
    sicCode: 783,
    riskCode: 1,
    description: '783 1 Ornamental Shrub and Tree Services',
  },
  {
    sicCode: 783,
    riskCode: 2,
    description: '783 2 Utility Line Tree Services',
  },
  {
    sicCode: 783,
    riskCode: 3,
    description:
      '783 3 Construction @vantage - PIM use only - monoline property and/or inland marine only - Ornamental Shrub and Tree Services',
  },
  {
    sicCode: 783,
    riskCode: 4,
    description:
      '783 4 Energy Program Only - Construction @vantage - Ornamental Shrub and Tree Services',
  },
  {
    sicCode: 811,
    riskCode: 1,
    description: '811 1 Timber Tracts',
  },
  {
    sicCode: 831,
    riskCode: 1,
    description: '831 1 Forest Nurseries and Gathering of Forest Products',
  },
  {
    sicCode: 831,
    riskCode: 2,
    description: '831 2 Maple Syrup Producers',
  },
  {
    sicCode: 851,
    riskCode: 1,
    description: '851 1 Forestry Service',
  },
  {
    sicCode: 851,
    riskCode: 2,
    description: '851 2 ABC Program Only-Forestry Service (Fire Fighting)',
  },
  {
    sicCode: 912,
    riskCode: 1,
    description: '912 1 Fish, Finfish',
  },
  {
    sicCode: 913,
    riskCode: 1,
    description: '913 1 Fish, Shellfish',
  },
  {
    sicCode: 919,
    riskCode: 1,
    description: '919 1 Miscellaneous Marine Products',
  },
  {
    sicCode: 921,
    riskCode: 1,
    description: '921 1 Aquaculture Operations',
  },
  {
    sicCode: 921,
    riskCode: 2,
    description: '921 2 Fish Hatcheries and Preserves',
  },
  {
    sicCode: 971,
    riskCode: 1,
    description: '971 1 Hunting and Trapping, and Game Propagation',
  },
  {
    sicCode: 1011,
    riskCode: 1,
    description: '1011 1 Mining, Iron Ores',
  },
  {
    sicCode: 1021,
    riskCode: 1,
    description: '1021 1 Mining, Copper Ores',
  },
  {
    sicCode: 1031,
    riskCode: 1,
    description: '1031 1 Mining, Lead and Zinc Ores',
  },
  {
    sicCode: 1041,
    riskCode: 1,
    description: '1041 1 Mining, Gold Ores',
  },
  {
    sicCode: 1044,
    riskCode: 1,
    description: '1044 1 Mining, Silver Ores',
  },
  {
    sicCode: 1061,
    riskCode: 1,
    description: '1061 1 Mining, Ferroalloy Ores, Except Vanadium',
  },
  {
    sicCode: 1081,
    riskCode: 1,
    description: '1081 1 Metal Mining Services',
  },
  {
    sicCode: 1094,
    riskCode: 1,
    description: '1094 1 Mining, Uranium-Radium-Vanadium Ores',
  },
  {
    sicCode: 1094,
    riskCode: 2,
    description:
      '1094 2 Energy Program Only - Mining, Uranium-Radium-Vanadium Ores',
  },
  {
    sicCode: 1099,
    riskCode: 1,
    description: '1099 1 Miscellaneous Metal Ores, Mining, NEC',
  },
  {
    sicCode: 1221,
    riskCode: 1,
    description: '1221 1 Bituminous Coal and Lignite Surface Mining',
  },
  {
    sicCode: 1222,
    riskCode: 1,
    description: '1222 1 Bituminous Coal Underground Mining',
  },
  {
    sicCode: 1231,
    riskCode: 1,
    description: '1231 1 Anthracite Mining',
  },
  {
    sicCode: 1241,
    riskCode: 1,
    description: '1241 1 Coal Mining Services',
  },
  {
    sicCode: 1311,
    riskCode: 1,
    description: '1311 1 Oil Distributing-Oil Terminals & LPG Tank Farms',
  },
  {
    sicCode: 1311,
    riskCode: 2,
    description: '1311 2 Oil or Gas Lease Operations',
  },
  {
    sicCode: 1311,
    riskCode: 10,
    description: '1311 10 Energy Program Only - Field Properties',
  },
  {
    sicCode: 1311,
    riskCode: 20,
    description: '1311 20 Energy Program Only - Crude Petroleum & Natural Gas',
  },
  {
    sicCode: 1321,
    riskCode: 1,
    description: '1321 1 Natural Gas Liquids',
  },
  {
    sicCode: 1321,
    riskCode: 10,
    description: '1321 10 Energy Program Only - Natural Gas Liquids',
  },
  {
    sicCode: 1381,
    riskCode: 1,
    description: '1381 1 Drilling Oil and Gas Wells',
  },
  {
    sicCode: 1381,
    riskCode: 10,
    description: '1381 10 Energy Program Only - Drilling Oil and Gas Wells',
  },
  {
    sicCode: 1382,
    riskCode: 1,
    description: '1382 1 Oil and Gas Field Exploration Services',
  },
  {
    sicCode: 1382,
    riskCode: 10,
    description:
      '1382 10 Energy Program Only - Oil and Gas Field Exploration Services',
  },
  {
    sicCode: 1389,
    riskCode: 1,
    description: '1389 1 Oil and Gas Field Services, NEC',
  },
  {
    sicCode: 1389,
    riskCode: 10,
    description:
      '1389 10 Energy Program Only - Oil and Gas Field Services, NEC',
  },
  {
    sicCode: 1411,
    riskCode: 1,
    description: '1411 1 Dimension Stone',
  },
  {
    sicCode: 1422,
    riskCode: 1,
    description: '1422 1 Crushed and Broken Limestone',
  },
  {
    sicCode: 1423,
    riskCode: 1,
    description: '1423 1 Crushed and Broken Granite',
  },
  {
    sicCode: 1429,
    riskCode: 1,
    description: '1429 1 Crushed and Broken Stone, NEC',
  },
  {
    sicCode: 1442,
    riskCode: 1,
    description: '1442 1 Construction Sand and Gravel',
  },
  {
    sicCode: 1446,
    riskCode: 1,
    description:
      '1446 1 Industrial Sand Operations Processing for uses other than construction',
  },
  {
    sicCode: 1455,
    riskCode: 1,
    description: '1455 1 Kaolin and Ball Clay',
  },
  {
    sicCode: 1459,
    riskCode: 1,
    description: '1459 1 Clay, Ceramic, and Refractory Minerals, NEC',
  },
  {
    sicCode: 1474,
    riskCode: 1,
    description: '1474 1 Potash, Soda, and Borate Minerals',
  },
  {
    sicCode: 1475,
    riskCode: 1,
    description: '1475 1 Phosphate Rock',
  },
  {
    sicCode: 1479,
    riskCode: 1,
    description: '1479 1 Chemical and Fertilizer Mineral Mining, NEC',
  },
  {
    sicCode: 1481,
    riskCode: 1,
    description: '1481 1 Nonmetallic Minerals Services Except Fuels',
  },
  {
    sicCode: 1499,
    riskCode: 1,
    description: '1499 1 Miscellaneous Nonmetallic Minerals, Except Fuels',
  },
  {
    sicCode: 1521,
    riskCode: 1,
    description: '1521 1 Single-family housing construction - NEC',
  },
  {
    sicCode: 1521,
    riskCode: 2,
    description: '1521 2 Single-family housing construction - Model Homes',
  },
  {
    sicCode: 1521,
    riskCode: 3,
    description:
      '1521 3 Construction @vantage - PIM use only - monoline property and/or inland marine only - Single Family Housing Construction',
  },
  {
    sicCode: 1521,
    riskCode: 4,
    description:
      "1521 4 Construction @vantage - PIM use only - Builder's Risk only - Single Family Homes $500,000 or less in value. ",
  },
  {
    sicCode: 1521,
    riskCode: 5,
    description:
      "1521 5 Construction @vantage - PIM use only - Builder's Risk only - Single Family Homes $501,000 to $1,000,000 in value. ",
  },
  {
    sicCode: 1521,
    riskCode: 6,
    description:
      "1521 6 Construction @vantage - PIM use only - Builder's Risk only - Single Family Homes more than $1,000,000 in value.",
  },
  {
    sicCode: 1521,
    riskCode: 7,
    description: '1521 7 E&S Group only - Fire and Water Restoration',
  },
  {
    sicCode: 1521,
    riskCode: 8,
    description: '1521 8 E&S Group only - General Construction - Residential',
  },
  {
    sicCode: 1521,
    riskCode: 9,
    description:
      '1521 9 Energy Program Only - Construction @vantage - Single Family Housing Construction',
  },
  {
    sicCode: 1521,
    riskCode: 10,
    description:
      "1521 10 Energy Program Only - Construction @vantage - Builder's Risk Only - Single Family Homes $500,000 or less in value",
  },
  {
    sicCode: 1521,
    riskCode: 11,
    description:
      "1521 11 Energy Program Only - Construction @vantage - Builder's Risk Only - Single Family Homes $501,000 to $1,000,000 in value",
  },
  {
    sicCode: 1521,
    riskCode: 12,
    description:
      "1521 12 Energy Program Only - Construction @vantage - Builder's Risk Only - Single Family Homes more than $1,000,000 in value",
  },
  {
    sicCode: 1521,
    riskCode: 13,
    description:
      '1521 13 E&S Group only - Non-Environmental Contractors Duct Cleaning',
  },
  {
    sicCode: 1521,
    riskCode: 14,
    description:
      '1521 14 E&S Group only - Remodeling - Non-Environmental Contractors - (No fire/water restoration)',
  },
  {
    sicCode: 1521,
    riskCode: 15,
    description:
      '1521 15 E&S Group only - Non-Environmental Contractors - Siding Installation',
  },
  {
    sicCode: 1521,
    riskCode: 16,
    description:
      '1521 16 E&S Group only - Non-Environmental Contractors - Water Extraction and Drying',
  },
  {
    sicCode: 1521,
    riskCode: 17,
    description: '1521 17 E&S Group only - Weatherization',
  },
  {
    sicCode: 1522,
    riskCode: 1,
    description:
      '1522 1 Construction of residential property not exceeding three stories in height, Other Than Single-Family',
  },
  {
    sicCode: 1522,
    riskCode: 2,
    description:
      '1522 2 Construction of residential property exceeding three stories in height, Other Than Single-Family',
  },
  {
    sicCode: 1522,
    riskCode: 3,
    description: '1522 3 Prefabricated Residential Building Erection',
  },
  {
    sicCode: 1522,
    riskCode: 4,
    description:
      '1522 4 Construction @vantage - PIM use only - monoline property and/or inland marine only - Residential Buildings, Other than Single Family',
  },
  {
    sicCode: 1522,
    riskCode: 5,
    description:
      "1522 5 Construction @vantage - PIM use only - Builder's Risk only - Residential Buildings, Other than Single Family ",
  },
  {
    sicCode: 1522,
    riskCode: 6,
    description:
      '1522 6 Energy Program Only - Construction @vantage - Residential Buildings, Other than Single Family',
  },
  {
    sicCode: 1522,
    riskCode: 7,
    description:
      "1522 7 Energy Program Only - Construction @vantage - Builder's Risk Only - Residential Buildings - Other than Single Family",
  },
  {
    sicCode: 1531,
    riskCode: 1,
    description: '1531 1 Operative Builders',
  },
  {
    sicCode: 1531,
    riskCode: 2,
    description:
      '1531 2 Construction @vantage - PIM use only - monoline property and/or inland marine only - Operative Builders',
  },
  {
    sicCode: 1531,
    riskCode: 3,
    description:
      '1531 3 Energy Program Only - Construction @vantage - Operative Builders',
  },
  {
    sicCode: 1541,
    riskCode: 1,
    description:
      '1541 1 Contractors - sub-contracted work - in connection with construction, reconstruction, repair or erection of buildings--for industrial use',
  },
  {
    sicCode: 1541,
    riskCode: 2,
    description:
      '1541 2 Contractors--Executive Supervisors or Executive Superintendents for Industrial Construction',
  },
  {
    sicCode: 1541,
    riskCode: 3,
    description:
      '1541 3 Construction @vantage - PIM use only - monoline property and/or inland marine only - General Contractors - Industrial Buildings and Warehouses',
  },
  {
    sicCode: 1541,
    riskCode: 4,
    description:
      "1541 4 Construction @vantage - PIM use only - Builder's Risk only - Industrial Buildings or Warehouses $10,000,000 or less in value.",
  },
  {
    sicCode: 1541,
    riskCode: 5,
    description:
      "1541 5 Construction @vantage - PIM use only - Builder's Risk only - Industrial Buildings or Warehouses $10,000,001 to $50,000,000 in value. ",
  },
  {
    sicCode: 1541,
    riskCode: 6,
    description:
      "1541 6 Construction @vantage - PIM use only - Builder's Risk only - Industrial Buildings or Warehouses more than $50,000,000 in value. ",
  },
  {
    sicCode: 1541,
    riskCode: 7,
    description: '1541 7 E&S Group only - Industrial Cleaning / Vac Truck',
  },
  {
    sicCode: 1541,
    riskCode: 8,
    description:
      '1541 8 Energy Program Only - Construction @vantage only - General Contractors - Industrial Buildings and Warehouses',
  },
  {
    sicCode: 1541,
    riskCode: 9,
    description:
      "1541 9 Energy Program Only - Construction @vantage - Builder's Risk Only - Industrial Buildings or Warehouses $10,000,000 or less in value0301",
  },
  {
    sicCode: 1541,
    riskCode: 10,
    description:
      "1541 10 Energy Program Only - Construction @vantage - Builder's Risk Only - Industrial Buildings or Warehouses $10,000,001 to $50,000,000 in value",
  },
  {
    sicCode: 1541,
    riskCode: 11,
    description:
      "1541 11 Energy Program Only - Construction @vantage - Builder's Risk Only - Industrial Buildings or Warehouses more than $50,000,000 in value",
  },
  {
    sicCode: 1542,
    riskCode: 1,
    description:
      '1542 1 General Contractors-Nonresidential Buildings, Other than Industrial Buildings and Warehouses',
  },
  {
    sicCode: 1542,
    riskCode: 2,
    description: '1542 2 Greenhouse Erection',
  },
  {
    sicCode: 1542,
    riskCode: 3,
    description: '1542 3 Renovating--outside surfaces of buildings',
  },
  {
    sicCode: 1542,
    riskCode: 4,
    description:
      '1542 4 Construction @vantage - PIM use only - monoline property and/or inland marine only - General Contractors - Other than Industrial Buildings and Warehouses',
  },
  {
    sicCode: 1542,
    riskCode: 5,
    description:
      "1542 5 Construction @vantage - PIM use only - Builder's Risk only - Other than Industrial Buildings or Warehouses $10,000,000 or less in value. ",
  },
  {
    sicCode: 1542,
    riskCode: 6,
    description:
      "1542 6 Construction @vantage - PIM use only - Builder's Risk only - Other than Industrial Buildings or Warehouses $10,000,001 to $50,000,000 in value. ",
  },
  {
    sicCode: 1542,
    riskCode: 7,
    description:
      "1542 7 Construction @vantage - PIM use only - Builder's Risk only - Other than Industrial Buildings or Warehouses more than $50,000,000 in value. ",
  },
  {
    sicCode: 1542,
    riskCode: 8,
    description: '1542 8 E&S Group only - Service Station Contracting',
  },
  {
    sicCode: 1542,
    riskCode: 9,
    description: '1542 9 E&S Group only - Excavation/Grading',
  },
  {
    sicCode: 1542,
    riskCode: 10,
    description: '1542 10 E&S Group only - General Construction - Commercial',
  },
  {
    sicCode: 1542,
    riskCode: 11,
    description: '1542 11 E&S Group only - Landscaping',
  },
  {
    sicCode: 1542,
    riskCode: 12,
    description: '1542 12 E&S Group only - Masonry/Concrete',
  },
  {
    sicCode: 1542,
    riskCode: 13,
    description: '1542 13 E&S Group only - Non-Environmental - NEC',
  },
  {
    sicCode: 1542,
    riskCode: 14,
    description: '1542 14 E&S Group only - Painting',
  },
  {
    sicCode: 1542,
    riskCode: 15,
    description: '1542 15 E&S Group only - Roofing',
  },
  {
    sicCode: 1542,
    riskCode: 16,
    description: '1542 16 E&S Group only - Street and Road',
  },
  {
    sicCode: 1542,
    riskCode: 17,
    description:
      '1542 17 Energy Program Only - Construction @vantage - General Contractors - Other than Industrial Buildings and Warehouses',
  },
  {
    sicCode: 1542,
    riskCode: 18,
    description:
      "1542 18 Energy Program Only - Construction @vantage - Builder's Risk Only - Other than Industrial Buildings or Warehouses $10,000,000 or less in value",
  },
  {
    sicCode: 1542,
    riskCode: 19,
    description:
      "1542 19 Energy Program Only - Construction @vantage - Builder's Risk Only - Other than Industrial Buildings or Warehouses $10,000,001 to $50,000,000 in value",
  },
  {
    sicCode: 1542,
    riskCode: 20,
    description:
      "1542 20 Energy Program Only - Construction @vantage - Builder's Risk Only - Other than Industrial Buildings or Warehouses more than$50,000,000 in value",
  },
  {
    sicCode: 1542,
    riskCode: 21,
    description:
      '1542 21 E&S Group only - Non-Environmental Contractors Appliance Installation or Repair',
  },
  {
    sicCode: 1542,
    riskCode: 22,
    description:
      '1542 22 E&S Group only - Non-Environmental Contractors Cellular Tower Installation',
  },
  {
    sicCode: 1542,
    riskCode: 23,
    description:
      '1542 23 E&S Group only - Non-Environmental Contractors Debris Removal',
  },
  {
    sicCode: 1542,
    riskCode: 24,
    description:
      '1542 24 E&S Group only - Non-Environmental Contractors Construction Supervision - Project Management ',
  },
  {
    sicCode: 1542,
    riskCode: 25,
    description:
      '1542 25 E&S Group only - Non-Environmental Contractors - Waterproofing',
  },
  {
    sicCode: 1542,
    riskCode: 26,
    description:
      '1542 26 E&S Group only - Non-Environmental Contractors - Crane and Rigging',
  },
  {
    sicCode: 1542,
    riskCode: 27,
    description:
      '1542 27 E&S Group only - Non-Environmental Contractors - Millwright mechanical equipment maintenance',
  },
  {
    sicCode: 1611,
    riskCode: 1,
    description:
      '1611 1 Highway and Street Construction, Except Elevated Highways',
  },
  {
    sicCode: 1611,
    riskCode: 2,
    description:
      '1611 2 Street or Road Paving or Repaving, Surfacing or Resurfacing or Scraping',
  },
  {
    sicCode: 1611,
    riskCode: 3,
    description:
      '1611 3 Construction @vantage - PIM use only - monoline property and/or inland marine only - Highway and Street Construction, except Elevated Highways',
  },
  {
    sicCode: 1611,
    riskCode: 4,
    description:
      '1611 4 Energy Program Only - Construction @vantage - Highway and Street Construction, except Elevated Highways',
  },
  {
    sicCode: 1622,
    riskCode: 1,
    description:
      '1622 1 Bridge or Elevated Highway Construction and Repair -- concrete',
  },
  {
    sicCode: 1622,
    riskCode: 2,
    description:
      '1622 2 Bridge or Elevated Highway Construction and Repair -- iron or steel',
  },
  {
    sicCode: 1622,
    riskCode: 3,
    description: '1622 3 Tunneling construction and repair',
  },
  {
    sicCode: 1622,
    riskCode: 4,
    description:
      '1622 4 Contractors- Sub Work- in connection with bridge, tunnel, elevated street or highway construction or repair - not otherwise classified',
  },
  {
    sicCode: 1622,
    riskCode: 5,
    description:
      '1622 5 Construction @vantage - PIM use only - monoline property and/or inland marine only - Bridge, Tunnel, and Elevated Highway Construction',
  },
  {
    sicCode: 1622,
    riskCode: 6,
    description:
      '1622 6 Energy Program Only - Construction @vantage - Bridge, Tunnel, and Elevated Highway Construction',
  },
  {
    sicCode: 1623,
    riskCode: 1,
    description:
      '1623 1 Water, Sewer, Pipeline, and Communications and Power Line Construction - NEC',
  },
  {
    sicCode: 1623,
    riskCode: 3,
    description: '1623 3 Electric Light or Power Line Construction-',
  },
  {
    sicCode: 1623,
    riskCode: 4,
    description: '1623 4 Gas Mains or Connections Construction',
  },
  {
    sicCode: 1623,
    riskCode: 5,
    description: '1623 5 Pipeline Construction-- gas',
  },
  {
    sicCode: 1623,
    riskCode: 6,
    description: '1623 6 Pipeline Construction-- oil',
  },
  {
    sicCode: 1623,
    riskCode: 7,
    description: '1623 7 Pipeline Construction-- other than Oil or GAS',
  },
  {
    sicCode: 1623,
    riskCode: 9,
    description: '1623 9 Sewer Mains or Connections Construction',
  },
  {
    sicCode: 1623,
    riskCode: 10,
    description: '1623 10 Steam Mains or Connections Construction',
  },
  {
    sicCode: 1623,
    riskCode: 11,
    description:
      '1623 11 Telephone, Telegraph or Cable Television Line Construction',
  },
  {
    sicCode: 1623,
    riskCode: 12,
    description: '1623 12 Water Mains or Connections Construction',
  },
  {
    sicCode: 1623,
    riskCode: 13,
    description:
      '1623 13 Construction @vantage - PIM use only - monoline property and/or inland marine only - Water, Sewer, Pipeline, and Communications and Power Line Construction.',
  },
  {
    sicCode: 1623,
    riskCode: 14,
    description: '1623 14 E&S Group only - Pipeline Construction',
  },
  {
    sicCode: 1623,
    riskCode: 15,
    description: '1623 15 E&S Group only - Sewer and Water Main',
  },
  {
    sicCode: 1623,
    riskCode: 16,
    description:
      '1623 16 Energy Program Only - Construciton @vantage - Water, Sewer, Pipeline, and Communications and Power Line Construction.',
  },
  {
    sicCode: 1623,
    riskCode: 17,
    description: '1623 17 E&S Group only - Utility Installation',
  },
  {
    sicCode: 1623,
    riskCode: 20,
    description:
      '1623 20 Energy Program Only - Water, Sewer, Pipeline, and Communications & Power Line Construction, NEC',
  },
  {
    sicCode: 1629,
    riskCode: 1,
    description:
      '1629 1 Airport Runway or Warning Apron--paving or repaving, surfacing, resurfacing or scraping',
  },
  {
    sicCode: 1629,
    riskCode: 2,
    description: '1629 2 Heavy Construction, NEC',
  },
  {
    sicCode: 1629,
    riskCode: 3,
    description: '1629 3 Blasting Operations',
  },
  {
    sicCode: 1629,
    riskCode: 4,
    description: '1629 4 Caisson or Cofferdam Work--foundations for buildings',
  },
  {
    sicCode: 1629,
    riskCode: 5,
    description:
      '1629 5 Caisson or Cofferdam Work--not foundations for buildings',
  },
  {
    sicCode: 1629,
    riskCode: 6,
    description:
      '1629 6 Contractors --subcontracted work in heavy construction or heavy reconstruction in connection with repair or erection of buildings',
  },
  {
    sicCode: 1629,
    riskCode: 7,
    description: '1629 7 Dam or Reservoir Construction',
  },
  {
    sicCode: 1629,
    riskCode: 8,
    description: '1629 8 Dike, Levee or Revetment Construction',
  },
  {
    sicCode: 1629,
    riskCode: 9,
    description: '1629 9 Dredging',
  },
  {
    sicCode: 1629,
    riskCode: 10,
    description: '1629 10 Hazardous Material Contractors',
  },
  {
    sicCode: 1629,
    riskCode: 11,
    description: '1629 11 Irrigation or Drainage System Construction',
  },
  {
    sicCode: 1629,
    riskCode: 12,
    description: '1629 12 Jetty or Breakwater Construction',
  },
  {
    sicCode: 1629,
    riskCode: 13,
    description:
      '1629 13 Oil Rig or Derrick Erecting or Dismantling--wood or metal',
  },
  {
    sicCode: 1629,
    riskCode: 14,
    description: '1629 14 Pile Driving-- building foundation only',
  },
  {
    sicCode: 1629,
    riskCode: 15,
    description: '1629 15 Pile Driving-- NEC',
  },
  {
    sicCode: 1629,
    riskCode: 16,
    description: '1629 16 Pile Driving-- sonic method',
  },
  {
    sicCode: 1629,
    riskCode: 17,
    description: '1629 17 Railroad Construction',
  },
  {
    sicCode: 1629,
    riskCode: 18,
    description: '1629 18 Subway Construction',
  },
  {
    sicCode: 1629,
    riskCode: 19,
    description:
      '1629 19 Construction @vantage - PIM use only - monoline property and/or inland marine only - Heavy Construction, NEC',
  },
  {
    sicCode: 1629,
    riskCode: 20,
    description: '1629 20 Energy Program Only - Plant Construction',
  },
  {
    sicCode: 1629,
    riskCode: 21,
    description:
      '1629 21 Energy Program Only - Construction @vantage - Heavy Construction NEC',
  },
  {
    sicCode: 1629,
    riskCode: 30,
    description: '1629 30 Energy Program Only - Oilfield Construction',
  },
  {
    sicCode: 1629,
    riskCode: 40,
    description: '1629 40 Energy Program Only - Heavy Construction, NEC',
  },
  {
    sicCode: 1711,
    riskCode: 1,
    description:
      '1711 1 Air Conditioning Systems or Equipment- dealers or distributors and installation, servicing or repair',
  },
  {
    sicCode: 1711,
    riskCode: 2,
    description:
      '1711 2 Plumbing, Heating, and Air-Conditioning installation, servicing or repair  - NEC',
  },
  {
    sicCode: 1711,
    riskCode: 3,
    description:
      '1711 3 Heating or Combined Heating and Air Conditioning Systems or Equipment--dealers or distributors and installation, servicing or repair',
  },
  {
    sicCode: 1711,
    riskCode: 4,
    description:
      '1711 4 Heating or Combined Heating and Air Conditioning Systems or Equipment--dealers or distributors and installation, servicing or repair--no liquefied petroleum gas (LPG) equipment sales or work',
  },
  {
    sicCode: 1711,
    riskCode: 5,
    description:
      '1711 5 Plumbing installation, servicing or repair-- commercial and industrial if no high pressure or process piping or explosive gases',
  },
  {
    sicCode: 1711,
    riskCode: 6,
    description: '1711 6 Plumbing-- residential or domestic',
  },
  {
    sicCode: 1711,
    riskCode: 7,
    description:
      '1711 7 Refrigeration Systems or Equipment--dealers and distributors and installation, servicing or repair--commercial',
  },
  {
    sicCode: 1711,
    riskCode: 8,
    description:
      '1711 8 Septic Tank Systems-- installation, servicing or repair',
  },
  {
    sicCode: 1711,
    riskCode: 9,
    description: '1711 9 Solar Energy Contractors',
  },
  {
    sicCode: 1711,
    riskCode: 10,
    description:
      '1711 10 Water Softening Equipment--installation, servicing or repair',
  },
  {
    sicCode: 1711,
    riskCode: 11,
    description: '1711 11 Water Softening Equipment--rented to others',
  },
  {
    sicCode: 1711,
    riskCode: 12,
    description: '1711 12 Boiler Inspection, Installation, Cleaning or Repair',
  },
  {
    sicCode: 1711,
    riskCode: 13,
    description:
      '1711 13 Fire Suppression Systems-- installation, servicing or repair',
  },
  {
    sicCode: 1711,
    riskCode: 14,
    description: '1711 14 Hot Tub Dealers and Installers',
  },
  {
    sicCode: 1711,
    riskCode: 15,
    description: '1711 15 Wood and Coal Stove Dealers and Installers',
  },
  {
    sicCode: 1711,
    riskCode: 16,
    description:
      '1711 16 Construction @vantage - PIM use only - monoline property and/or inland marine only - Plumbing, Heating, and Air-Conditioning',
  },
  {
    sicCode: 1711,
    riskCode: 17,
    description: '1711 17 E&S Group only - Green Energy Contractor NEC',
  },
  {
    sicCode: 1711,
    riskCode: 18,
    description: '1711 18 E&S Group only - Solar, Wind and Alternative Energy',
  },
  {
    sicCode: 1711,
    riskCode: 19,
    description: '1711 19 E&S Group only - HVAC and Plumbing',
  },
  {
    sicCode: 1711,
    riskCode: 20,
    description:
      '1711 20 Energy Program Only - Solar Heating Apparatus - Contractors',
  },
  {
    sicCode: 1711,
    riskCode: 21,
    description:
      '1711 21 Energy Program Only - Construction @vantage - Plumbing, Heating, and Air Conditioning',
  },
  {
    sicCode: 1711,
    riskCode: 30,
    description: '1711 30 Energy Program Only - Geothermal Heating Apparatus',
  },
  {
    sicCode: 1711,
    riskCode: 40,
    description:
      '1711 40 Energy Program Only - Plumbing, Heating, and Air Conditioning',
  },
  {
    sicCode: 1721,
    riskCode: 1,
    description: '1721 1 Painting and Paper Hanging - NEC',
  },
  {
    sicCode: 1721,
    riskCode: 2,
    description: '1721 2 Interior Decorators',
  },
  {
    sicCode: 1721,
    riskCode: 3,
    description:
      '1721 3 Painting -- exterior--buildings or structures--exceeding three stories in height',
  },
  {
    sicCode: 1721,
    riskCode: 4,
    description:
      '1721 4 Painting -exterior--buildings or structures--three stories or less in height',
  },
  {
    sicCode: 1721,
    riskCode: 5,
    description: '1721 5 Painting -interior--buildings or structures',
  },
  {
    sicCode: 1721,
    riskCode: 6,
    description: '1721 6 Painting -shop only',
  },
  {
    sicCode: 1721,
    riskCode: 7,
    description: '1721 7 Paperhanging',
  },
  {
    sicCode: 1721,
    riskCode: 8,
    description: '1721 8 Painting -oil or gasoline tanks',
  },
  {
    sicCode: 1721,
    riskCode: 9,
    description: '1721 9 Painting -ship hulls',
  },
  {
    sicCode: 1721,
    riskCode: 10,
    description: '1721 10 Painting -steel structures or bridges',
  },
  {
    sicCode: 1721,
    riskCode: 11,
    description:
      '1721 11 Construction @vantage - PIM use only - monoline property and/or inland marine only - Painting and Paper Hanging',
  },
  {
    sicCode: 1721,
    riskCode: 12,
    description:
      '1721 12 Energy Program Only - Construction @vantage - Painting and Paper Hanging',
  },
  {
    sicCode: 1731,
    riskCode: 1,
    description:
      '1731 1 Alarms and Alarm Systems-- installation, servicing or repair',
  },
  {
    sicCode: 1731,
    riskCode: 2,
    description:
      '1731 2 Communication Equipment Installation--industrial or commercial',
  },
  {
    sicCode: 1731,
    riskCode: 3,
    description:
      '1731 3 Electrical Apparatus-- installation, servicing or repair',
  },
  {
    sicCode: 1731,
    riskCode: 4,
    description: '1731 4 Electrical Work - within buildings - industrial',
  },
  {
    sicCode: 1731,
    riskCode: 5,
    description:
      '1731 5 Electrical Work--within buildings, other than industrial',
  },
  {
    sicCode: 1731,
    riskCode: 6,
    description:
      '1731 6 Construction @vantage - PIM use only - monoline property and/or inland marine only - Electrical Work',
  },
  {
    sicCode: 1731,
    riskCode: 7,
    description: '1731 7 E&S Group only - Electrical',
  },
  {
    sicCode: 1731,
    riskCode: 8,
    description:
      '1731 8 Energy Program Only - Construction @vantage - Electrical Work',
  },
  {
    sicCode: 1741,
    riskCode: 1,
    description: '1741 1 Masonry, Stone Setting, and Other Stone Work',
  },
  {
    sicCode: 1741,
    riskCode: 2,
    description: '1741 2 Fireplace Construction',
  },
  {
    sicCode: 1741,
    riskCode: 3,
    description:
      '1741 3 Construction @vantage - PIM use only - monoline property and/or inland marine only - Masonry, Stone Setting, and Other Stone Work',
  },
  {
    sicCode: 1741,
    riskCode: 4,
    description:
      '1741 4 Energy Program Only - Construction @vantage - Masonry, Stone Setting, and Other Stone Work',
  },
  {
    sicCode: 1742,
    riskCode: 1,
    description: '1742 1 Dry Wall or Wallboard Installation',
  },
  {
    sicCode: 1742,
    riskCode: 2,
    description: '1742 2 EIFS (Synthetic Stucco) Installation or Repair-',
  },
  {
    sicCode: 1742,
    riskCode: 3,
    description: '1742 3 Insulation Work-- mineral',
  },
  {
    sicCode: 1742,
    riskCode: 4,
    description: '1742 4 Insulation Work-- organic or plastic in solid state',
  },
  {
    sicCode: 1742,
    riskCode: 5,
    description: '1742 5 Insulation Work-- plastic',
  },
  {
    sicCode: 1742,
    riskCode: 6,
    description: '1742 6 Plastering or Stucco Work interior',
  },
  {
    sicCode: 1742,
    riskCode: 7,
    description:
      '1742 7 Construction @vantage - PIM use only - monoline property and/or inland marine only - Plastering, Drywall, Acoustical, and Insulation Work.',
  },
  {
    sicCode: 1742,
    riskCode: 8,
    description:
      '1742 8 Energy Program Only - Construction @vantage - Plastering, Drywall, Acoustical, and Insulation Work',
  },
  {
    sicCode: 1743,
    riskCode: 3,
    description: '1743 3 Terrazzo, Tile, Marble, and Mosaic Work',
  },
  {
    sicCode: 1743,
    riskCode: 4,
    description:
      '1743 4 Construction @vantage - PIM use only - monoline property and/or inland marine only - Terrazzo, Tile, Marble, and Mosaic Work',
  },
  {
    sicCode: 1743,
    riskCode: 5,
    description:
      '1743 5 Energy Program Only - Construction @vantage - Terrazzo, Tile, Marble, and Mosaic Work',
  },
  {
    sicCode: 1751,
    riskCode: 1,
    description: '1751 1 Carpentry-- interior only',
  },
  {
    sicCode: 1751,
    riskCode: 2,
    description: '1751 2 Carpentry-- shop only',
  },
  {
    sicCode: 1751,
    riskCode: 3,
    description:
      '1751 3 Carpentry--construction of residential property not exceeding three stories in height',
  },
  {
    sicCode: 1751,
    riskCode: 4,
    description: '1751 4 Carpentry- NEC',
  },
  {
    sicCode: 1751,
    riskCode: 5,
    description:
      '1751 5 Door, Window or Assembled Millwork--installation--metal',
  },
  {
    sicCode: 1751,
    riskCode: 6,
    description: '1751 6 Carpentry Work Handyman',
  },
  {
    sicCode: 1751,
    riskCode: 7,
    description:
      '1751 7 Construction @vantage - PIM use only - monoline property and/or inland marine only - Carpentry Work',
  },
  {
    sicCode: 1751,
    riskCode: 8,
    description:
      '1751 8 Energy Program Only - Construction @vantage - Carpentry Work',
  },
  {
    sicCode: 1752,
    riskCode: 1,
    description:
      '1752 1 Floor Covering Installation-- not ceramic tile or stone',
  },
  {
    sicCode: 1752,
    riskCode: 2,
    description:
      '1752 2 Construction @vantage - PIM use only - monoline property and/or inland marine only - Floor Laying and Other Floor Work, NEC',
  },
  {
    sicCode: 1752,
    riskCode: 3,
    description:
      '1752 3 Energy Program Only - Construction @vantage - Floor Laying and Other Floor Work, NEC',
  },
  {
    sicCode: 1761,
    riskCode: 1,
    description: '1761 1 Ceiling or Wall Installation--metal',
  },
  {
    sicCode: 1761,
    riskCode: 2,
    description: '1761 2 Roofing-- commercial',
  },
  {
    sicCode: 1761,
    riskCode: 3,
    description: '1761 3 Roofing-- residential',
  },
  {
    sicCode: 1761,
    riskCode: 4,
    description:
      '1761 4 Sheet Metal Work--outside, performed by plumbing, heating, and air-conditioning contractors',
  },
  {
    sicCode: 1761,
    riskCode: 5,
    description:
      '1761 5 Sheet Metal Work--inside only, performed by plumbing, heating, and air-conditioning contractors',
  },
  {
    sicCode: 1761,
    riskCode: 6,
    description: '1761 6 Siding Installation',
  },
  {
    sicCode: 1761,
    riskCode: 7,
    description:
      '1761 7 Construction @vantage - PIM use only - monoline property and/or inland marine only - Roofing, Siding, and Sheet Metal Work',
  },
  {
    sicCode: 1761,
    riskCode: 8,
    description:
      '1761 8 Energy Program Only - Construction @vantage - Roofing, Siding, and Sheet Metal Work',
  },
  {
    sicCode: 1771,
    riskCode: 1,
    description: '1771 1 Concrete Construction',
  },
  {
    sicCode: 1771,
    riskCode: 2,
    description:
      '1771 2 Driveway, Parking Area or Sidewalk--paving or repaving',
  },
  {
    sicCode: 1771,
    riskCode: 3,
    description: '1771 3 Guniting or Shot-crete',
  },
  {
    sicCode: 1771,
    riskCode: 4,
    description:
      '1771 4 Construction @vantage - PIM use only - monoline property and/or inland marine only - Concrete Work',
  },
  {
    sicCode: 1771,
    riskCode: 5,
    description:
      '1771 5 Energy Program Only - Construction @vantage - Concrete Work',
  },
  {
    sicCode: 1781,
    riskCode: 1,
    description: '1781 1 Well Drilling-- other than water',
  },
  {
    sicCode: 1781,
    riskCode: 2,
    description: '1781 2 Well Drilling-- water',
  },
  {
    sicCode: 1781,
    riskCode: 3,
    description:
      '1781 3 Construction @vantage - PIM use only - monoline property and/or inland marine only - Water Well Drilling',
  },
  {
    sicCode: 1781,
    riskCode: 4,
    description: '1781 4 E&S Group only - Environmental Drilling',
  },
  {
    sicCode: 1781,
    riskCode: 5,
    description: '1781 5 E&S Group only - Non-Environmental Drilling',
  },
  {
    sicCode: 1781,
    riskCode: 6,
    description:
      '1781 6 Energy Program Only - Construction @vantage - Water Well Drilling',
  },
  {
    sicCode: 1781,
    riskCode: 10,
    description: '1781 10 Energy Program Only - Geothermal Well Drilling',
  },
  {
    sicCode: 1781,
    riskCode: 20,
    description: '1781 20 Energy Program Only - Water Well Drilling',
  },
  {
    sicCode: 1791,
    riskCode: 1,
    description:
      '1791 1 Metal Erection - in the construction of dwellings not exceeding 2 stories in height',
  },
  {
    sicCode: 1791,
    riskCode: 2,
    description: '1791 2 Metal Erection - nonstructural',
  },
  {
    sicCode: 1791,
    riskCode: 3,
    description:
      '1791 3 Metal Erection - steel lock gates, gasholders, standpipes, water towers, smokestacks, tanks, silos, prison cells, fire or burglarproof vaults',
  },
  {
    sicCode: 1791,
    riskCode: 4,
    description: '1791 4 Metal Erection - structural',
  },
  {
    sicCode: 1791,
    riskCode: 5,
    description: '1791 5 Metal Erection -decorative or artistic',
  },
  {
    sicCode: 1791,
    riskCode: 6,
    description:
      '1791 6 Metal Erection -frame structures iron work on outside of buildings',
  },
  {
    sicCode: 1791,
    riskCode: 7,
    description:
      '1791 7 Tank Construction, Installation, Erection or Repair -- metal--not pressurized',
  },
  {
    sicCode: 1791,
    riskCode: 8,
    description:
      '1791 8 Tank Construction, Installation, Erection or Repair -- metal--not pressurized--within buildings exclusively',
  },
  {
    sicCode: 1791,
    riskCode: 9,
    description:
      '1791 9 Tank Construction, Installation, Erection or Repair -- metal--pressurized',
  },
  {
    sicCode: 1791,
    riskCode: 10,
    description:
      '1791 10 Tank Construction, Installation, Erection or Repair -- metal--pressurized--within buildings exclusively',
  },
  {
    sicCode: 1791,
    riskCode: 11,
    description:
      '1791 11 Construction @vantage - PIM use only - monoline property and/or inland marine only - Structural Steel Erection',
  },
  {
    sicCode: 1791,
    riskCode: 12,
    description:
      '1791 12 Energy Program Only - Construction @vantage - Structural Steel Erection',
  },
  {
    sicCode: 1793,
    riskCode: 1,
    description: '1793 1 Glass Dealers and Installers with Glazing',
  },
  {
    sicCode: 1793,
    riskCode: 2,
    description: '1793 2 Glass Dealers and Installers without Glazing',
  },
  {
    sicCode: 1793,
    riskCode: 3,
    description:
      '1793 3 Construction @vantage - PIM use only - monoline property and/or inland marine only - Glass and Glazing Work',
  },
  {
    sicCode: 1793,
    riskCode: 4,
    description:
      '1793 4 Energy Program Only - Construction @vantage - Glass and Glazing Work',
  },
  {
    sicCode: 1794,
    riskCode: 1,
    description: '1794 1 Excavation',
  },
  {
    sicCode: 1794,
    riskCode: 2,
    description: '1794 2 Grading of Land',
  },
  {
    sicCode: 1794,
    riskCode: 3,
    description:
      '1794 3 Construction @vantage - PIM use only - monoline property and/or inland marine only - Excavation Work',
  },
  {
    sicCode: 1794,
    riskCode: 4,
    description: '1794 4 Energy Program Only - Excavation Work',
  },
  {
    sicCode: 1794,
    riskCode: 5,
    description: '1794 5 E&S Group only - Remediation Activities - NEC',
  },
  {
    sicCode: 1794,
    riskCode: 6,
    description:
      '1794 6 Energy Program Only - Construction @vantage - Excavation Work',
  },
  {
    sicCode: 1795,
    riskCode: 1,
    description: '1795 1 Wrecking and Demolition Work',
  },
  {
    sicCode: 1795,
    riskCode: 2,
    description:
      '1795 2 Construction @vantage - PIM use only - monoline property and/or inland marine only - Wrecking and Demolition Work',
  },
  {
    sicCode: 1795,
    riskCode: 3,
    description: '1795 3 E&S Group only - Demolition',
  },
  {
    sicCode: 1795,
    riskCode: 4,
    description:
      '1795 4 Energy Program Only - Construction @vantage - Wrecking and Demolition Work',
  },
  {
    sicCode: 1796,
    riskCode: 1,
    description:
      '1796 1 Elevator or Escalator Inspecting, Installation, Servicing or Repair (Repair only)',
  },
  {
    sicCode: 1796,
    riskCode: 2,
    description:
      '1796 2 Machinery or Equipment --farm--installation, servicing, repair or erection',
  },
  {
    sicCode: 1796,
    riskCode: 3,
    description:
      '1796 3 Machinery or Equipment-- Industrial -- installation, servicing or repair',
  },
  {
    sicCode: 1796,
    riskCode: 4,
    description: '1796 4 Installation or Erection of Building Equipment, NEC',
  },
  {
    sicCode: 1796,
    riskCode: 5,
    description: '1796 5 Rigging-- not ship or boat',
  },
  {
    sicCode: 1796,
    riskCode: 6,
    description: '1796 6 Salvage Operations',
  },
  {
    sicCode: 1796,
    riskCode: 7,
    description:
      '1796 7 Salvage Operations--removing, sorting, reconditioning and distributing of merchandise in damaged buildings and incidental operations away from such buildings',
  },
  {
    sicCode: 1796,
    riskCode: 8,
    description:
      '1796 8 Tent or Canvas Goods-- erection, removal or repair-- away from shop',
  },
  {
    sicCode: 1796,
    riskCode: 9,
    description:
      '1796 9 Construction @vantage - PIM use only - monoline property and/or inland marine only - Installation or Erection of Building Equipment, NEC',
  },
  {
    sicCode: 1796,
    riskCode: 10,
    description:
      '1796 10 Energy Program Only - Construction @vantage - Erection of Building Equipment, NEC',
  },
  {
    sicCode: 1799,
    riskCode: 1,
    description: '1799 1 Special Trade Contractors, NEC',
  },
  {
    sicCode: 1799,
    riskCode: 2,
    description: '1799 2 Asbestos Abatement Operations',
  },
  {
    sicCode: 1799,
    riskCode: 3,
    description: '1799 3 Building Structure--raising or moving',
  },
  {
    sicCode: 1799,
    riskCode: 4,
    description: '1799 4 Cleaning--outside surfaces of buildings',
  },
  {
    sicCode: 1799,
    riskCode: 5,
    description:
      '1799 5 Contractors --subcontracted work--other than construction related work',
  },
  {
    sicCode: 1799,
    riskCode: 6,
    description: '1799 6 Debris Removal-- construction site',
  },
  {
    sicCode: 1799,
    riskCode: 7,
    description: '1799 7 Fence Erection Contractors',
  },
  {
    sicCode: 1799,
    riskCode: 8,
    description: '1799 8 Fireproofing--structures',
  },
  {
    sicCode: 1799,
    riskCode: 9,
    description: '1799 9 Lead Abatement Operations',
  },
  {
    sicCode: 1799,
    riskCode: 10,
    description: '1799 10 Metal Works--shop--decorative or artistic',
  },
  {
    sicCode: 1799,
    riskCode: 11,
    description: '1799 11 Nondestructive Testing',
  },
  {
    sicCode: 1799,
    riskCode: 12,
    description: '1799 12 Radon Mitigation',
  },
  {
    sicCode: 1799,
    riskCode: 13,
    description: '1799 13 Radon Testing Firms',
  },
  {
    sicCode: 1799,
    riskCode: 14,
    description: '1799 14 Restoration Firms',
  },
  {
    sicCode: 1799,
    riskCode: 15,
    description: '1799 15 Rigging-- ship or boat',
  },
  {
    sicCode: 1799,
    riskCode: 16,
    description: '1799 16 Sandblasting',
  },
  {
    sicCode: 1799,
    riskCode: 17,
    description: '1799 17 Scaffolding',
  },
  {
    sicCode: 1799,
    riskCode: 18,
    description: '1799 18 Sign Erection, Installation or Repair',
  },
  {
    sicCode: 1799,
    riskCode: 19,
    description: '1799 19 Steam Pipe or Broiler Insulation',
  },
  {
    sicCode: 1799,
    riskCode: 20,
    description:
      '1799 20 Swimming Pools--installation, servicing or repair--above ground',
  },
  {
    sicCode: 1799,
    riskCode: 21,
    description:
      '1799 21 Swimming Pools--installation, servicing or repair--below ground',
  },
  {
    sicCode: 1799,
    riskCode: 22,
    description: '1799 22 Underpinning of Buildings or Structures',
  },
  {
    sicCode: 1799,
    riskCode: 23,
    description: '1799 23 Waterproofing--by pressure apparatus',
  },
  {
    sicCode: 1799,
    riskCode: 24,
    description: '1799 24 Waterproofing--by trowel--exterior',
  },
  {
    sicCode: 1799,
    riskCode: 25,
    description:
      '1799 25 Waterproofing--by trowel--interior or insulation work',
  },
  {
    sicCode: 1799,
    riskCode: 26,
    description: '1799 26 Waterproofing Contractor, NEC',
  },
  {
    sicCode: 1799,
    riskCode: 27,
    description: '1799 27 Welding or Cutting',
  },
  {
    sicCode: 1799,
    riskCode: 28,
    description:
      '1799 28 Construction @vantage - PIM use only - monoline property and/or inland marine only - Special Trade Contractors, NEC',
  },
  {
    sicCode: 1799,
    riskCode: 29,
    description: '1799 29 E&S Group only - Oil Field Services',
  },
  {
    sicCode: 1799,
    riskCode: 30,
    description:
      '1799 30 E&S Group only - Storage Tank Contractor - Aboveground',
  },
  {
    sicCode: 1799,
    riskCode: 31,
    description:
      '1799 31 E&S Group only - Storage Tank Contractor - Underground',
  },
  {
    sicCode: 1799,
    riskCode: 32,
    description: '1799 32 E&S Group only - Vacuum Truck Operations',
  },
  {
    sicCode: 1799,
    riskCode: 33,
    description: '1799 33 E&S Group only - Asbestos, Lead and Mold',
  },
  {
    sicCode: 1799,
    riskCode: 34,
    description: '1799 34 E&S Group only - Environmental Contractor - NEC',
  },
  {
    sicCode: 1799,
    riskCode: 35,
    description: '1799 35 E&S Group only - Mold Abatement',
  },
  {
    sicCode: 1799,
    riskCode: 36,
    description:
      '1799 36 Energy Program Only - Construction @vantage - Special Trade Contractors NEC',
  },
  {
    sicCode: 1799,
    riskCode: 37,
    description: '1799 37 E&S Group only - Remediation Contractors',
  },
  {
    sicCode: 1799,
    riskCode: 38,
    description: '1799 38 E&S Group only - Soil/Groundwater Remediation',
  },
  {
    sicCode: 1799,
    riskCode: 39,
    description:
      '1799 39 E&S Group only - Non-Environmental Contractors - Lead Abatement',
  },
  {
    sicCode: 1799,
    riskCode: 40,
    description:
      '1799 40 E&S Group only - Non-Environmental Contractors - Septic Tank Cleaning',
  },
  {
    sicCode: 1799,
    riskCode: 41,
    description: '1799 41 E&S Group only - Radon Mitigation',
  },
  {
    sicCode: 2011,
    riskCode: 1,
    description: '2011 1 Meat Packing Plants',
  },
  {
    sicCode: 2013,
    riskCode: 1,
    description: '2013 1 Processing- Mfg',
  },
  {
    sicCode: 2013,
    riskCode: 2,
    description: '2013 2 Meat, Fish, Poultry or Seafood Processing--curing',
  },
  {
    sicCode: 2015,
    riskCode: 1,
    description: '2015 1 Poultry Slaughtering and Processing',
  },
  {
    sicCode: 2021,
    riskCode: 1,
    description: '2021 1 Creamery Butter Mfg',
  },
  {
    sicCode: 2022,
    riskCode: 1,
    description: '2022 1 Natural, Processed, and Imitation Cheese Mfg',
  },
  {
    sicCode: 2023,
    riskCode: 1,
    description: '2023 1 Dry, Condensed, and Evaporated Dairy Products Mfg',
  },
  {
    sicCode: 2024,
    riskCode: 1,
    description: '2024 1 Ice Cream and Frozen Desserts Mfg',
  },
  {
    sicCode: 2026,
    riskCode: 1,
    description:
      '2026 1 Milk Processing, auto operations over 50 miles from terminal',
  },
  {
    sicCode: 2026,
    riskCode: 2,
    description: '2026 2 Milk Processing',
  },
  {
    sicCode: 2032,
    riskCode: 1,
    description: '2032 1 Canned Specialties Mfg NEC',
  },
  {
    sicCode: 2032,
    riskCode: 2,
    description: '2032 2 Baby Food Mfg.--in glass containers',
  },
  {
    sicCode: 2032,
    riskCode: 3,
    description: '2032 3 Baby Food Mfg',
  },
  {
    sicCode: 2033,
    riskCode: 1,
    description:
      '2033 1 Canned Fruits, Vegetables, Preserves, Jams, and Jellies  Mfg NEC',
  },
  {
    sicCode: 2033,
    riskCode: 2,
    description: '2033 2 Canned Fruit Juices Mfg',
  },
  {
    sicCode: 2033,
    riskCode: 3,
    description: '2033 3 Canned Fruits and Vegetables Mfg',
  },
  {
    sicCode: 2033,
    riskCode: 4,
    description: '2033 4 Jams and Jellies Mfg',
  },
  {
    sicCode: 2034,
    riskCode: 1,
    description:
      '2034 1 Dried and Dehydrated Fruits, Vegetables, and Soup Mixes Mfg',
  },
  {
    sicCode: 2035,
    riskCode: 1,
    description:
      '2035 1 Pickled Fruits and Vegetables, Vegetable Sauces and Seasonings, and Salad Dressings Mfg, NEC',
  },
  {
    sicCode: 2035,
    riskCode: 2,
    description: '2035 2 Pickle Processing Plants',
  },
  {
    sicCode: 2037,
    riskCode: 1,
    description:
      '2037 1 Frozen Fruits, Fruit Juices, and Vegetables,  Mfg, NEC',
  },
  {
    sicCode: 2037,
    riskCode: 2,
    description:
      '2037 2 Fruit or Vegetable Juice Mfg.--no bottling of carbonating beverages',
  },
  {
    sicCode: 2038,
    riskCode: 1,
    description: '2038 1 Food Products Mfg.-- frozen',
  },
  {
    sicCode: 2041,
    riskCode: 1,
    description: '2041 1 Flour and Other Grain Mill Mfg Products',
  },
  {
    sicCode: 2043,
    riskCode: 1,
    description: '2043 1 Cereal Breakfast Foods Mfg',
  },
  {
    sicCode: 2044,
    riskCode: 1,
    description: '2044 1 Rice Milling',
  },
  {
    sicCode: 2045,
    riskCode: 1,
    description: '2045 1 Prepared Flour Mixes and Doughs Mfg',
  },
  {
    sicCode: 2046,
    riskCode: 1,
    description: '2046 1 Wet Corn Milling',
  },
  {
    sicCode: 2046,
    riskCode: 2,
    description: '2046 2 Dextrin Mfg.',
  },
  {
    sicCode: 2047,
    riskCode: 1,
    description: '2047 1 Dog and Cat Food Mfg',
  },
  {
    sicCode: 2048,
    riskCode: 1,
    description:
      '2048 1 Prepared Feed and Feed Ingredients Mfg for Animals and Fowls, Except Dogs and Cats',
  },
  {
    sicCode: 2051,
    riskCode: 1,
    description:
      '2051 1 Bread and Other Bakery Products Mfg, Except Cookies and Crackers',
  },
  {
    sicCode: 2052,
    riskCode: 1,
    description: '2052 1 Cookies and Crackers Mfg',
  },
  {
    sicCode: 2053,
    riskCode: 1,
    description: '2053 1 Frozen Bakery Products Mfg, Except Bread',
  },
  {
    sicCode: 2061,
    riskCode: 1,
    description: '2061 1 Cane Sugar Mfg, Except Refining',
  },
  {
    sicCode: 2062,
    riskCode: 1,
    description: '2062 1 Cane Sugar Refining',
  },
  {
    sicCode: 2063,
    riskCode: 1,
    description: '2063 1 Beet Sugar Mfg',
  },
  {
    sicCode: 2064,
    riskCode: 1,
    description: '2064 1 Candy or Confectionery Products Mfg',
  },
  {
    sicCode: 2066,
    riskCode: 1,
    description: '2066 1 Chocolate and Cocoa Products Mfg, from Cacao Beans',
  },
  {
    sicCode: 2066,
    riskCode: 2,
    description:
      '2066 2 Chocolate and Cocoa Products Mfg, from Purchased Chocolate',
  },
  {
    sicCode: 2067,
    riskCode: 1,
    description: '2067 1 Chewing Gum Mfg',
  },
  {
    sicCode: 2068,
    riskCode: 1,
    description: '2068 1 Salted and Roasted Nuts and Seeds Processing',
  },
  {
    sicCode: 2074,
    riskCode: 1,
    description: '2074 1 Cottonseed Oil Mills',
  },
  {
    sicCode: 2075,
    riskCode: 1,
    description: '2075 1 Soybean Oil Mills',
  },
  {
    sicCode: 2076,
    riskCode: 1,
    description: '2076 1 Vegetable Oil Mfg.',
  },
  {
    sicCode: 2076,
    riskCode: 2,
    description: '2076 2 Vegetable Oil Mfg.--by solvent extraction',
  },
  {
    sicCode: 2077,
    riskCode: 1,
    description: '2077 1 Animal and Marine Fats and Oils Mfg - Rendering',
  },
  {
    sicCode: 2079,
    riskCode: 1,
    description:
      '2079 1 Shortening, Table Oils, Margarine, and Other Edible Fats and Oils Mfg, NEC',
  },
  {
    sicCode: 2082,
    riskCode: 1,
    description: '2082 1 Beer, Ale or Malt Liquor Mfg.--in bottles-',
  },
  {
    sicCode: 2082,
    riskCode: 2,
    description: '2082 2 Beer, Ale or Malt Liquor Mfg.--in cans',
  },
  {
    sicCode: 2082,
    riskCode: 3,
    description: '2082 3 Beer, Ale or Malt Liquor Mfg.--not bottled or canned',
  },
  {
    sicCode: 2082,
    riskCode: 5,
    description: '2082 5 Brewpubs',
  },
  {
    sicCode: 2083,
    riskCode: 1,
    description: '2083 1 Malt and Malt Byproduct Mfg',
  },
  {
    sicCode: 2084,
    riskCode: 1,
    description: '2084 1 Wine Mfg.-- sparkling',
  },
  {
    sicCode: 2084,
    riskCode: 2,
    description: '2084 2 Brandy, and Brandy Spirits',
  },
  {
    sicCode: 2085,
    riskCode: 1,
    description: '2085 1 Distilled and Blended Liquors Mfg',
  },
  {
    sicCode: 2086,
    riskCode: 1,
    description:
      '2086 1 Beverage Bottler -- soft drinks --not carbonated--in bottles or cans',
  },
  {
    sicCode: 2086,
    riskCode: 2,
    description:
      '2086 2 Beverage Bottler--soft drinks--carbonated--in cans or plastic bottles',
  },
  {
    sicCode: 2086,
    riskCode: 3,
    description:
      '2086 3 Beverage Bottler--soft drinks--carbonated--in glass bottles',
  },
  {
    sicCode: 2086,
    riskCode: 4,
    description:
      '2086 4 Beverage Bottler--soft drinks--carbonated--in metal cylinders',
  },
  {
    sicCode: 2086,
    riskCode: 5,
    description:
      '2086 5 Beverage Bottler--soft drinks--carbonated--in paper containers',
  },
  {
    sicCode: 2086,
    riskCode: 6,
    description:
      '2086 6 Water Bottling -- Spring or Well -not sparkling or carbonated',
  },
  {
    sicCode: 2086,
    riskCode: 7,
    description:
      '2086 7 Water Bottling -- Spring or Well -sparkling or carbonated',
  },
  {
    sicCode: 2086,
    riskCode: 8,
    description: '2086 8 Water Bottling--in siphons',
  },
  {
    sicCode: 2086,
    riskCode: 41,
    description:
      '2086 41 OBSP Specific - Bottled and Canned Soft Drinks and Carbonated Waters',
  },
  {
    sicCode: 2087,
    riskCode: 1,
    description: '2087 1 Flavoring Extracts and Flavoring Syrups Mfg NEC',
  },
  {
    sicCode: 2087,
    riskCode: 2,
    description: '2087 2 Syrups or Molasses--refining, blending or mfg.',
  },
  {
    sicCode: 2091,
    riskCode: 1,
    description: '2091 1 Canned and Cured Fish and Seafood Processing',
  },
  {
    sicCode: 2092,
    riskCode: 1,
    description:
      '2092 1 Fish and Seafood Processing--not in airtight containers',
  },
  {
    sicCode: 2095,
    riskCode: 1,
    description: '2095 1 Roasted Coffee Mfg',
  },
  {
    sicCode: 2096,
    riskCode: 1,
    description: '2096 1 Potato Chips, Corn Chips, and Similar Snacks Mfg',
  },
  {
    sicCode: 2097,
    riskCode: 1,
    description: '2097 1 Manufactured Ice',
  },
  {
    sicCode: 2098,
    riskCode: 1,
    description: '2098 1 Macaroni, Spaghetti, Vermicelli, and Noodles Mfg',
  },
  {
    sicCode: 2099,
    riskCode: 1,
    description: '2099 1 Food Preparations, NEC',
  },
  {
    sicCode: 2099,
    riskCode: 2,
    description: '2099 2 Spice, Herb and Extract Processing',
  },
  {
    sicCode: 2111,
    riskCode: 1,
    description: '2111 1 Cigarettes Mfg',
  },
  {
    sicCode: 2121,
    riskCode: 1,
    description: '2121 1 Cigars Mfg',
  },
  {
    sicCode: 2131,
    riskCode: 1,
    description: '2131 1 Chewing and Smoking Tobacco and Snuff Mfg',
  },
  {
    sicCode: 2141,
    riskCode: 1,
    description: '2141 1 Tobacco Stemming and Redrying',
  },
  {
    sicCode: 2211,
    riskCode: 1,
    description: '2211 1 Broadwoven Fabric Mills, Cotton',
  },
  {
    sicCode: 2221,
    riskCode: 1,
    description: '2221 1 Broadwoven Fabric Mills, Manmade Fiber and Silk',
  },
  {
    sicCode: 2231,
    riskCode: 1,
    description:
      '2231 1 Broadwoven Fabric Mills, Wool (Including Dyeing and Finishing)',
  },
  {
    sicCode: 2241,
    riskCode: 1,
    description:
      '2241 1 Narrow  Fabric and Other Smallware Mills:  Cotton, Wool, Silk, and Manmade Fiber',
  },
  {
    sicCode: 2251,
    riskCode: 1,
    description:
      "2251 1 Women's Full-Length and Knee-Length Hosiery Mfg, Except Socks",
  },
  {
    sicCode: 2252,
    riskCode: 1,
    description: '2252 1 Hosiery Mfg, NEC',
  },
  {
    sicCode: 2253,
    riskCode: 1,
    description: '2253 1 Knit Outerwear Mills',
  },
  {
    sicCode: 2254,
    riskCode: 1,
    description: '2254 1 Knit Underwear and Nightwear Mills',
  },
  {
    sicCode: 2257,
    riskCode: 1,
    description: '2257 1 Weft Knit Fabric Mills',
  },
  {
    sicCode: 2259,
    riskCode: 1,
    description: '2259 1 Knitting Mills, NEC',
  },
  {
    sicCode: 2261,
    riskCode: 1,
    description: '2261 1 Finishers of Broadwoven Fabrics of Cotton',
  },
  {
    sicCode: 2262,
    riskCode: 1,
    description:
      '2262 1 Finishers of Broadwoven Fabrics of Manmade Fiber and Silk',
  },
  {
    sicCode: 2269,
    riskCode: 1,
    description: '2269 1 Finishers of Textiles, NEC',
  },
  {
    sicCode: 2273,
    riskCode: 1,
    description: '2273 1 Carpets and Rugs Mfg',
  },
  {
    sicCode: 2281,
    riskCode: 1,
    description: '2281 1 Yarn Spinning Mills',
  },
  {
    sicCode: 2282,
    riskCode: 1,
    description:
      '2282 1 Yarn Texturizing, Throwing, Twisting, and Winding Mills',
  },
  {
    sicCode: 2284,
    riskCode: 1,
    description: '2284 1 Thread Mills',
  },
  {
    sicCode: 2295,
    riskCode: 1,
    description: '2295 1 Coated Fabrics Mfg, Not Rubberized',
  },
  {
    sicCode: 2296,
    riskCode: 1,
    description: '2296 1 Tire Cord and Fabrics Mfg',
  },
  {
    sicCode: 2297,
    riskCode: 1,
    description: '2297 1 Nonwoven Fabrics Mfg',
  },
  {
    sicCode: 2298,
    riskCode: 1,
    description: '2298 1 Net Mfg.- other than safety nets',
  },
  {
    sicCode: 2298,
    riskCode: 2,
    description: '2298 2 Rope Mfg.',
  },
  {
    sicCode: 2298,
    riskCode: 3,
    description: '2298 3 Twine or Cordage Mfg.',
  },
  {
    sicCode: 2299,
    riskCode: 1,
    description: '2299 1 Textile Goods Mfg, NEC',
  },
  {
    sicCode: 2299,
    riskCode: 2,
    description: '2299 2 Fiber Mfg.--other than synthetic',
  },
  {
    sicCode: 2299,
    riskCode: 3,
    description: '2299 3 Wool Combing, Scouring or Separating from Cotton',
  },
  {
    sicCode: 2299,
    riskCode: 4,
    description: '2299 4 Wool Pulling',
  },
  {
    sicCode: 2311,
    riskCode: 1,
    description: "2311 1 Men's and Boys' Suits, Coats, and Overcoats Mfg",
  },
  {
    sicCode: 2321,
    riskCode: 1,
    description: "2321 1 Men's and Boys' Shirts Mfg, Except Work Shirts",
  },
  {
    sicCode: 2322,
    riskCode: 1,
    description: "2322 1 Men's and Boys' Underwear and Nightwear Mfg",
  },
  {
    sicCode: 2323,
    riskCode: 1,
    description: "2323 1 Men's and Boys' Neckwear Mfg",
  },
  {
    sicCode: 2325,
    riskCode: 1,
    description: "2325 1 Men's and Boys' Trousers and Slacks Mfg",
  },
  {
    sicCode: 2326,
    riskCode: 1,
    description: "2326 1 Men's and Boys' Work Clothing Mfg",
  },
  {
    sicCode: 2329,
    riskCode: 1,
    description: "2329 1 Men's and Boys' Clothing Mfg, NEC",
  },
  {
    sicCode: 2329,
    riskCode: 2,
    description: "2329 2 Men's and Boys' Clothing Mfg, Down and Feather",
  },
  {
    sicCode: 2331,
    riskCode: 1,
    description: "2331 1 Women's, Misses', and Juniors' Blouses and Shirts Mfg",
  },
  {
    sicCode: 2335,
    riskCode: 1,
    description: "2335 1 Women's, Misses', and Juniors' Dresses Mfg",
  },
  {
    sicCode: 2337,
    riskCode: 1,
    description:
      "2337 1 Women's, Misses' and Juniors' Suits, Skirts, and Coats Mfg",
  },
  {
    sicCode: 2339,
    riskCode: 1,
    description: "2339 1 Women's, Misses', and Juniors' Outerwear Mfg, NEC",
  },
  {
    sicCode: 2339,
    riskCode: 2,
    description:
      "2339 2 Women's, Misses', and Juniors' Outerwear Mfg, Down and Feather",
  },
  {
    sicCode: 2341,
    riskCode: 1,
    description:
      "2341 1 Women's and children's underwear and nightwear Mfg (excluding infants)",
  },
  {
    sicCode: 2341,
    riskCode: 2,
    description: '2341 2 Infants underwear and nightwear Mfg',
  },
  {
    sicCode: 2342,
    riskCode: 1,
    description: '2342 1 Brassieres, Girdles, and Allied Garments Mfg',
  },
  {
    sicCode: 2353,
    riskCode: 1,
    description: '2353 1 Hats, Caps, and Millinery Mfg',
  },
  {
    sicCode: 2361,
    riskCode: 1,
    description:
      "2361 1 Girl's and children's dresses, blouses Mfg (excluding infants)",
  },
  {
    sicCode: 2361,
    riskCode: 2,
    description: '2361 2 Infants - Dresses Blouses and Shirts Mfg',
  },
  {
    sicCode: 2369,
    riskCode: 1,
    description:
      "2369 1 Girl's and children's outerwear Mfg, (excluding infants) neck",
  },
  {
    sicCode: 2369,
    riskCode: 2,
    description: '2369 2 Infants Outerwear Mfg',
  },
  {
    sicCode: 2371,
    riskCode: 1,
    description: '2371 1 Fur Goods Mfg',
  },
  {
    sicCode: 2381,
    riskCode: 1,
    description:
      '2381 1 Dress and Work Gloves Mfg, Except Knit and All-Leather',
  },
  {
    sicCode: 2384,
    riskCode: 1,
    description: '2384 1 Robes and Dressing Gowns Mfg',
  },
  {
    sicCode: 2385,
    riskCode: 1,
    description: '2385 1 Waterproof Outerwear Mfg',
  },
  {
    sicCode: 2386,
    riskCode: 1,
    description: '2386 1 Leather and Sheep-Lined Clothing Mfg',
  },
  {
    sicCode: 2387,
    riskCode: 1,
    description: '2387 1 Apparel Belts Mfg',
  },
  {
    sicCode: 2389,
    riskCode: 1,
    description: '2389 1 Apparel and Accessories Mfg, NEC',
  },
  {
    sicCode: 2391,
    riskCode: 1,
    description: '2391 1 Curtains and Draperies Mfg',
  },
  {
    sicCode: 2392,
    riskCode: 1,
    description: '2392 1 House furnishings Mfg, Except Curtains and Draperies',
  },
  {
    sicCode: 2392,
    riskCode: 2,
    description: '2392 2 House furnishings Mfg, Down and Feather Products',
  },
  {
    sicCode: 2393,
    riskCode: 1,
    description: '2393 1 Textile Bags Mfg',
  },
  {
    sicCode: 2394,
    riskCode: 1,
    description: '2394 1 Sail Making',
  },
  {
    sicCode: 2394,
    riskCode: 2,
    description: '2394 2 Tent or Canopy Mfg.',
  },
  {
    sicCode: 2394,
    riskCode: 3,
    description: '2394 3 Canvas and Related Products Mfg, NEC',
  },
  {
    sicCode: 2395,
    riskCode: 1,
    description:
      '2395 1 Pleating, Decorative and Novelty Stitching, and Tucking for the Trade',
  },
  {
    sicCode: 2396,
    riskCode: 1,
    description:
      '2396 1 Automotive Trimmings, Apparel Findings, and Related Products Mfg',
  },
  {
    sicCode: 2397,
    riskCode: 1,
    description: '2397 1 Schiffli Machine Embroideries',
  },
  {
    sicCode: 2399,
    riskCode: 1,
    description: '2399 1 Fabricated Textile Products Mfg, NEC',
  },
  {
    sicCode: 2399,
    riskCode: 2,
    description:
      '2399 2 Automobile, Bus or Truck Parts Mfg.-- Passenger restraining devices',
  },
  {
    sicCode: 2411,
    riskCode: 1,
    description: '2411 1 Logging and Lumbering',
  },
  {
    sicCode: 2421,
    riskCode: 1,
    description: '2421 1 Saw Mills or Planing Mills',
  },
  {
    sicCode: 2421,
    riskCode: 2,
    description: '2421 2 Wood Turned Products Mfg.',
  },
  {
    sicCode: 2426,
    riskCode: 1,
    description: '2426 1 Hardwood Dimension and Flooring Mills',
  },
  {
    sicCode: 2429,
    riskCode: 1,
    description: '2429 1 Special Product Sawmills, NEC',
  },
  {
    sicCode: 2431,
    riskCode: 1,
    description: '2431 1 Door or Window Mfg.',
  },
  {
    sicCode: 2431,
    riskCode: 2,
    description: '2431 2 Millwork, NEC',
  },
  {
    sicCode: 2431,
    riskCode: 3,
    description: '2431 3 Venetian Blinds Mfg. Or Assembling',
  },
  {
    sicCode: 2434,
    riskCode: 1,
    description: '2434 1 Wood Kitchen Cabinets Mfg',
  },
  {
    sicCode: 2435,
    riskCode: 1,
    description:
      '2435 1 Hardwood - Plywood, Veneer or Veneer Products Mfg.-- NEC',
  },
  {
    sicCode: 2435,
    riskCode: 2,
    description:
      '2435 2 Hardwood - Plywood, Veneer or Veneer Products Mfg.-- without log processing',
  },
  {
    sicCode: 2436,
    riskCode: 1,
    description:
      '2436 1 Softwood-  Plywood, Veneer or Veneer Products Mfg.-- other',
  },
  {
    sicCode: 2436,
    riskCode: 2,
    description:
      '2436 2 Softwood - Plywood, Veneer or Veneer Products Mfg.-- without log processing',
  },
  {
    sicCode: 2439,
    riskCode: 1,
    description: '2439 1 Structural Wood Members Mfg, NEC',
  },
  {
    sicCode: 2441,
    riskCode: 1,
    description: '2441 1 Nailed and Lock Corner Wood Boxes and Shook Mfg',
  },
  {
    sicCode: 2448,
    riskCode: 1,
    description: '2448 1 Wood Pallets and Skids Mfg',
  },
  {
    sicCode: 2449,
    riskCode: 1,
    description: '2449 1 Wood Containers Mfg, NEC',
  },
  {
    sicCode: 2451,
    riskCode: 1,
    description: '2451 1 Mobile Home Mfg.',
  },
  {
    sicCode: 2452,
    riskCode: 1,
    description: '2452 1 Prefabricated Building Mfg.',
  },
  {
    sicCode: 2491,
    riskCode: 1,
    description: '2491 1 Wood Preserving',
  },
  {
    sicCode: 2493,
    riskCode: 1,
    description: '2493 1 Reconstituted Wood Products Mfg',
  },
  {
    sicCode: 2493,
    riskCode: 2,
    description: '2493 2 Insulating Material Mfg.- organic',
  },
  {
    sicCode: 2499,
    riskCode: 1,
    description: '2499 1 Wood Products Mfg, NEC',
  },
  {
    sicCode: 2511,
    riskCode: 1,
    description: '2511 1 Furniture Mfg. or Assembling--infants',
  },
  {
    sicCode: 2511,
    riskCode: 2,
    description: '2511 2 Furniture Mfg. or Assembling--wood',
  },
  {
    sicCode: 2512,
    riskCode: 1,
    description: '2512 1 Wood Household Furniture Mfg, Upholstered',
  },
  {
    sicCode: 2514,
    riskCode: 1,
    description: '2514 1 Metal Household Furniture Mfg',
  },
  {
    sicCode: 2515,
    riskCode: 1,
    description: '2515 1 Mattresses, Foundations, and Convertible Beds Mfg',
  },
  {
    sicCode: 2517,
    riskCode: 1,
    description:
      '2517 1 Wood Television, Radio, Phonograph and Sewing Machine Cabinets Mfg',
  },
  {
    sicCode: 2517,
    riskCode: 2,
    description: '2517 2 Woodworking Shops',
  },
  {
    sicCode: 2519,
    riskCode: 1,
    description: '2519 1 Household Furniture Mfg, NEC',
  },
  {
    sicCode: 2519,
    riskCode: 2,
    description: '2519 2 Wicker, Rattan, Willow or Twisted Fiber Products Mfg.',
  },
  {
    sicCode: 2521,
    riskCode: 1,
    description: '2521 1 Wood Office Furniture Mfg',
  },
  {
    sicCode: 2522,
    riskCode: 1,
    description: '2522 1 Office Furniture Mfg, Except Wood',
  },
  {
    sicCode: 2531,
    riskCode: 1,
    description: '2531 1 Public Building and Related Furniture Mfg',
  },
  {
    sicCode: 2541,
    riskCode: 1,
    description:
      '2541 1 Wood Office and Store Fixtures, Partitions, Shelving, and Lockers Mfg',
  },
  {
    sicCode: 2542,
    riskCode: 1,
    description:
      '2542 1 Office and Store Fixtures, Partitions, Shelving, and Lockers Mfg, Except Wood',
  },
  {
    sicCode: 2591,
    riskCode: 1,
    description: '2591 1 Drapery Hardware and Window Blinds and Shades Mfg',
  },
  {
    sicCode: 2591,
    riskCode: 2,
    description: '2591 2 Venetian Blinds Mfg. or Assembling',
  },
  {
    sicCode: 2599,
    riskCode: 1,
    description: '2599 1 Furniture and Fixtures Mfg, NEC',
  },
  {
    sicCode: 2611,
    riskCode: 1,
    description: '2611 1 Pulp Mills',
  },
  {
    sicCode: 2621,
    riskCode: 1,
    description: '2621 1 Paper Mills',
  },
  {
    sicCode: 2631,
    riskCode: 1,
    description: '2631 1 Paperboard Mills',
  },
  {
    sicCode: 2652,
    riskCode: 1,
    description: '2652 1 Setup Paperboard Boxes Mfg',
  },
  {
    sicCode: 2653,
    riskCode: 1,
    description: '2653 1 Corrugated and Solid Fiber Boxes Mfg',
  },
  {
    sicCode: 2655,
    riskCode: 1,
    description: '2655 1 Fiber Cans, Tubes, Drums, and Similar Products Mfg',
  },
  {
    sicCode: 2656,
    riskCode: 1,
    description: '2656 1 Sanitary Food Containers Mfg, Except Folding',
  },
  {
    sicCode: 2657,
    riskCode: 1,
    description: '2657 1 Folding Paperboard Boxes Mfg, Including Sanitary',
  },
  {
    sicCode: 2671,
    riskCode: 1,
    description:
      '2671 1 Packaging Paper and Plastics Film, Coated and Laminated Mfg',
  },
  {
    sicCode: 2672,
    riskCode: 1,
    description: '2672 1 Cellophane and Cellophane Products Mfg.',
  },
  {
    sicCode: 2672,
    riskCode: 2,
    description: '2672 2 Paper Coating or Finishing',
  },
  {
    sicCode: 2672,
    riskCode: 3,
    description: '2672 3 Coated and Laminated Paper Mfg, NEC',
  },
  {
    sicCode: 2673,
    riskCode: 1,
    description: '2673 1 Plastics, Foil, and Coated Paper Bags Mfg',
  },
  {
    sicCode: 2674,
    riskCode: 1,
    description: '2674 1 Uncoated Paper and Multiwall Bags Mfg',
  },
  {
    sicCode: 2675,
    riskCode: 1,
    description: '2675 1 Die-Cut Paper and Paperboard and Cardboard Mfg',
  },
  {
    sicCode: 2676,
    riskCode: 1,
    description: '2676 1 Sanitary Paper Products Mfg',
  },
  {
    sicCode: 2677,
    riskCode: 1,
    description: '2677 1 Envelopes Mfg',
  },
  {
    sicCode: 2678,
    riskCode: 1,
    description: '2678 1 Stationery, Tablets, and Related Products Mfg',
  },
  {
    sicCode: 2679,
    riskCode: 1,
    description: '2679 1 Converted Paper and Paperboard Products Mfg, NEC',
  },
  {
    sicCode: 2679,
    riskCode: 2,
    description: '2679 2 Wall coverings Mfg',
  },
  {
    sicCode: 2711,
    riskCode: 1,
    description: '2711 1 Newspapers: Publishing, or Publishing and Printing',
  },
  {
    sicCode: 2721,
    riskCode: 1,
    description:
      '2721 1 Magazine and Periodical Publishing Periodicals: Publishing, or Publishing and Printing',
  },
  {
    sicCode: 2731,
    riskCode: 1,
    description:
      '2731 1 Books: Publishing, or Publishing and Printing -Not for Profit',
  },
  {
    sicCode: 2731,
    riskCode: 2,
    description:
      '2731 2 Books: Publishing, or Publishing and Printing -For Profit',
  },
  {
    sicCode: 2732,
    riskCode: 1,
    description: '2732 1 Book Printing - Not for Profit',
  },
  {
    sicCode: 2732,
    riskCode: 2,
    description: '2732 2 Book Printing - For Profit',
  },
  {
    sicCode: 2741,
    riskCode: 1,
    description: '2741 1 Miscellaneous Publishing, NEC',
  },
  {
    sicCode: 2741,
    riskCode: 2,
    description: '2741 2 Trading Cards Printing',
  },
  {
    sicCode: 2752,
    riskCode: 1,
    description: '2752 1 Lithographing',
  },
  {
    sicCode: 2754,
    riskCode: 1,
    description: '2754 1 Commercial Printing, Gravure',
  },
  {
    sicCode: 2759,
    riskCode: 1,
    description: '2759 1 Commercial Printing - Not for Profit, NEC',
  },
  {
    sicCode: 2759,
    riskCode: 2,
    description: '2759 2 Commercial Printing - For Profit, NEC',
  },
  {
    sicCode: 2759,
    riskCode: 3,
    description: '2759 3 Screen Printing or Silk Screen Printing',
  },
  {
    sicCode: 2759,
    riskCode: 4,
    description:
      '2759 4 Textile Bleaching, Dyeing, Mercerizing, Screen-Printing, Finishing or Silk Screening--new goods',
  },
  {
    sicCode: 2761,
    riskCode: 1,
    description: '2761 1 Manifold Business Forms Mfg',
  },
  {
    sicCode: 2771,
    riskCode: 1,
    description: '2771 1 Greeting Cards Printing',
  },
  {
    sicCode: 2782,
    riskCode: 1,
    description: '2782 1 Blankbooks, Loose-leaf Binders and Devices Mfg',
  },
  {
    sicCode: 2789,
    riskCode: 1,
    description: '2789 1 Bookbinding and Related Work - Not for Profit',
  },
  {
    sicCode: 2789,
    riskCode: 2,
    description: '2789 2 Bookbinding and Related Work - For Profit',
  },
  {
    sicCode: 2791,
    riskCode: 1,
    description: '2791 1 Typesetting',
  },
  {
    sicCode: 2796,
    riskCode: 1,
    description: '2796 1 Platemaking and Related Services',
  },
  {
    sicCode: 2812,
    riskCode: 1,
    description: '2812 1 Alkalis and chlorine Mfg',
  },
  {
    sicCode: 2813,
    riskCode: 1,
    description: '2813 1 Dry Ice Mfg',
  },
  {
    sicCode: 2813,
    riskCode: 2,
    description: '2813 2 Gas Mfg - primarily flammable, explosive or reactive',
  },
  {
    sicCode: 2813,
    riskCode: 3,
    description:
      '2813 3 Gas Mfg - primarily toxic or presenting a health hazard',
  },
  {
    sicCode: 2813,
    riskCode: 4,
    description:
      '2813 4 Gas Mfg - toxic or either flammable, explosive or reactive',
  },
  {
    sicCode: 2813,
    riskCode: 5,
    description: '2813 5 Gas Mfg--inert',
  },
  {
    sicCode: 2813,
    riskCode: 6,
    description: '2813 6 Gas Mfg, NEC',
  },
  {
    sicCode: 2816,
    riskCode: 1,
    description: '2816 1 Lead Mfg.-- red or white',
  },
  {
    sicCode: 2816,
    riskCode: 2,
    description: '2816 2 Inorganic Pigments Mfg',
  },
  {
    sicCode: 2819,
    riskCode: 1,
    description: '2819 1 Fertilizer Mfg',
  },
  {
    sicCode: 2819,
    riskCode: 2,
    description: '2819 2 Industrial Inorganic Chemicals Mfg, NEC',
  },
  {
    sicCode: 2819,
    riskCode: 10,
    description:
      '2819 10 Energy Program Only - Industrial Inorganic Chemicals, NEC',
  },
  {
    sicCode: 2821,
    riskCode: 1,
    description:
      '2821 1 Plastics Material and Synthetic Resins, and Nonvulcanizable Elastomers Mfg',
  },
  {
    sicCode: 2822,
    riskCode: 1,
    description: '2822 1 Synthetic Rubber Mfg',
  },
  {
    sicCode: 2823,
    riskCode: 1,
    description: '2823 1 Cellulosic Manmade Fibers Mfg',
  },
  {
    sicCode: 2824,
    riskCode: 1,
    description: '2824 1 Manmade Organic Fibers Mfg, Except Cellulosic',
  },
  {
    sicCode: 2833,
    riskCode: 4,
    description: '2833 4 Medicinal Chemicals and Botanical Products Mfg.',
  },
  {
    sicCode: 2834,
    riskCode: 4,
    description: '2834 4 Pharmaceutical Preparations Mfg. - Human Use',
  },
  {
    sicCode: 2834,
    riskCode: 99,
    description:
      '2834 99 Pharmaceutical Preparations Mfg. for animal use &/or No FDA Classification',
  },
  {
    sicCode: 2834,
    riskCode: 99,
    description:
      '2834 99 Pharmaceutical Preparations Mfg. for animal use &/or No FDA Classification',
  },
  {
    sicCode: 2835,
    riskCode: 1,
    description:
      '2835 1 In Vitro and In Vivo Diagnostic Substances Mfg. - FDA Class I',
  },
  {
    sicCode: 2835,
    riskCode: 2,
    description:
      '2835 2 In Vitro and In Vivo Diagnostic Substances Mfg. - FDA Class 2',
  },
  {
    sicCode: 2835,
    riskCode: 3,
    description:
      '2835 3 In Vitro and In Vivo Diagnostic Substances Mfg. - FDA Class 3',
  },
  {
    sicCode: 2835,
    riskCode: 99,
    description:
      '2835 99 In Vitro and In Vivo Diagnostic Substances Mfg. No FDA Classification',
  },
  {
    sicCode: 2836,
    riskCode: 6,
    description:
      '2836 6 Biological Products Mfg, Except Diagnostic Substances ',
  },
  {
    sicCode: 2841,
    riskCode: 1,
    description: '2841 1 Detergent Mfg.-- household',
  },
  {
    sicCode: 2841,
    riskCode: 2,
    description: '2841 2 Detergent Mfg.-- other than household',
  },
  {
    sicCode: 2841,
    riskCode: 3,
    description: '2841 3 Soap Mfg.',
  },
  {
    sicCode: 2842,
    riskCode: 1,
    description:
      '2842 1 Specialty Cleaning, Polishing, and Sanitary Preparations Mfg',
  },
  {
    sicCode: 2843,
    riskCode: 1,
    description:
      '2843 1 Surface Active Agents, Finishing Agents, Sulfonated Oils, and Assistants Mfg',
  },
  {
    sicCode: 2844,
    riskCode: 1,
    description:
      '2844 1 Perfumes, Cosmetics, and Other Toilet Preparations Mfg',
  },
  {
    sicCode: 2844,
    riskCode: 2,
    description: '2844 2 New York Only -  Cosmetics Program',
  },
  {
    sicCode: 2851,
    riskCode: 1,
    description:
      '2851 1 Paints, Varnishes, Lacquers, Enamels, and Allied Products Mfg',
  },
  {
    sicCode: 2861,
    riskCode: 1,
    description: '2861 1 Charcoal or Coal Briquette Mfg.',
  },
  {
    sicCode: 2861,
    riskCode: 2,
    description: '2861 2 Gum and Wood Chemicals Mfg, NEC',
  },
  {
    sicCode: 2861,
    riskCode: 3,
    description: '2861 3 Turpentine or Resin Mfg.',
  },
  {
    sicCode: 2865,
    riskCode: 1,
    description:
      '2865 1 Cyclic Organic Crudes and Intermediates, and Organic Dyes and Pigments Mfg',
  },
  {
    sicCode: 2865,
    riskCode: 10,
    description:
      '2865 10 Energy Program Only - Cyclic Organic Crudes and Intermediates, and Organic Dyes and Pigments',
  },
  {
    sicCode: 2869,
    riskCode: 1,
    description: '2869 1 Alcohol Mfg.--not beverage',
  },
  {
    sicCode: 2869,
    riskCode: 2,
    description: '2869 2 Industrial Organic Chemicals Mfg, NEC',
  },
  {
    sicCode: 2869,
    riskCode: 3,
    description: '2869 3 E&S Group only - Biofuel',
  },
  {
    sicCode: 2869,
    riskCode: 10,
    description: '2869 10 Energy Program Only - Ethanol Production',
  },
  {
    sicCode: 2869,
    riskCode: 20,
    description:
      '2869 20 Energy Program Only - Biofuel (including biodiesel) Production',
  },
  {
    sicCode: 2869,
    riskCode: 30,
    description:
      '2869 30 Energy Program Only - Industrial Organic Chemicals, NEC',
  },
  {
    sicCode: 2873,
    riskCode: 1,
    description: '2873 1 Nitrogenous Fertilizers Mfg',
  },
  {
    sicCode: 2874,
    riskCode: 1,
    description: '2874 1 Phosphatic Fertilizers Mfg',
  },
  {
    sicCode: 2874,
    riskCode: 2,
    description: '2874 2 Energy Program Only - Phosphatic Fertilizers Mfg',
  },
  {
    sicCode: 2875,
    riskCode: 1,
    description: '2875 1 Fertilizer Mfg, Mixing Only',
  },
  {
    sicCode: 2879,
    riskCode: 1,
    description: '2879 1 Pesticides and Agricultural Chemicals Mfg, NEC',
  },
  {
    sicCode: 2891,
    riskCode: 1,
    description: '2891 1 Adhesives and Sealants Mfg',
  },
  {
    sicCode: 2891,
    riskCode: 2,
    description: '2891 2 Caulking Compounds, Putty or Similar Products Mfg.',
  },
  {
    sicCode: 2892,
    riskCode: 1,
    description: '2892 1 Explosive or Fireworks Mfg.',
  },
  {
    sicCode: 2893,
    riskCode: 1,
    description: '2893 1 Printing Ink Mfg',
  },
  {
    sicCode: 2895,
    riskCode: 1,
    description: '2895 1 Carbon Black Mfg',
  },
  {
    sicCode: 2899,
    riskCode: 1,
    description: '2899 1 Aerosol Containers--filling or charging for others',
  },
  {
    sicCode: 2899,
    riskCode: 2,
    description: '2899 2 Chemicals and Chemical Preparations, NEC',
  },
  {
    sicCode: 2899,
    riskCode: 3,
    description: '2899 3 Fire Extinguishers--servicing, refilling or testing',
  },
  {
    sicCode: 2899,
    riskCode: 5,
    description: '2899 5 Salt Mfg.',
  },
  {
    sicCode: 2899,
    riskCode: 6,
    description: '2899 6 Borax, Potash or Phosphate Mfg--producing or refining',
  },
  {
    sicCode: 2899,
    riskCode: 7,
    description: '2899 7 E&S Group only - Specialty Chemicals',
  },
  {
    sicCode: 2899,
    riskCode: 10,
    description: '2899 10 Energy Program Only - Ethylene Glycol Production',
  },
  {
    sicCode: 2899,
    riskCode: 20,
    description:
      '2899 20 Energy Program Only - Lubricants Production (non-refining)',
  },
  {
    sicCode: 2899,
    riskCode: 30,
    description: '2899 30 Energy Program Only - Drilling Fluids & Muds',
  },
  {
    sicCode: 2899,
    riskCode: 40,
    description:
      '2899 40 Energy Program Only - Chemicals and Chemical Preparations, NEC',
  },
  {
    sicCode: 2911,
    riskCode: 1,
    description: '2911 1 Petroleum Refining',
  },
  {
    sicCode: 2911,
    riskCode: 2,
    description: '2911 2 E&S Group only - Oils and Lubricants',
  },
  {
    sicCode: 2911,
    riskCode: 10,
    description: '2911 10 Energy Program Only - Petroleum Refining ',
  },
  {
    sicCode: 2911,
    riskCode: 20,
    description:
      '2911 20 Energy Program Only - Asphalt and Simple Refining (Atmospheric & Vacuum Distillation Only, <10,000 BPD)',
  },
  {
    sicCode: 2911,
    riskCode: 30,
    description:
      '2911 30 Energy Program Only - Petroleum Recycling and Re-Refining',
  },
  {
    sicCode: 2951,
    riskCode: 1,
    description: '2951 1 Asphalt Paving Mixtures and Blocks Mfg',
  },
  {
    sicCode: 2952,
    riskCode: 1,
    description: '2952 1 Asphalt Felts and Coatings Mfg',
  },
  {
    sicCode: 2992,
    riskCode: 1,
    description: '2992 1 Lubricating Oils and Greases Mfg',
  },
  {
    sicCode: 2992,
    riskCode: 10,
    description: '2992 10 Energy Program Only - Blending & Compounding',
  },
  {
    sicCode: 2992,
    riskCode: 20,
    description: '2992 20 Energy Program Only - Lubricating Oils and Greases',
  },
  {
    sicCode: 2999,
    riskCode: 1,
    description: '2999 1 Products of Petroleum and Coal Mfg, NEC',
  },
  {
    sicCode: 2999,
    riskCode: 2,
    description: '2999 2 Coke Mfg.',
  },
  {
    sicCode: 2999,
    riskCode: 10,
    description:
      '2999 10 Energy Program Only - Products of Petroleum and Coal, NEC',
  },
  {
    sicCode: 3011,
    riskCode: 1,
    description: '3011 1 Inner Tubes Mfg.',
  },
  {
    sicCode: 3011,
    riskCode: 2,
    description: '3011 2 Tire Mfg.-- auto, bus or truck',
  },
  {
    sicCode: 3011,
    riskCode: 3,
    description: '3011 3 Tire Mfg.-- not auto, bus or truck',
  },
  {
    sicCode: 3021,
    riskCode: 1,
    description: '3021 1 Plastics Footwear Mfg',
  },
  {
    sicCode: 3021,
    riskCode: 2,
    description: '3021 2 Rubber Footwear Mfg',
  },
  {
    sicCode: 3021,
    riskCode: 41,
    description: '3021 41 OBSP Specific - Rubber and Plastics Footwear Mfg',
  },
  {
    sicCode: 3052,
    riskCode: 1,
    description: '3052 1 Plastics Hose and Belting Mfg  (no rubber)',
  },
  {
    sicCode: 3052,
    riskCode: 2,
    description: '3052 2 Rubber Hose and Belting Mfg',
  },
  {
    sicCode: 3052,
    riskCode: 41,
    description: '3052 41 OBSP Specific - Rubber and Plastics Hose and Belting',
  },
  {
    sicCode: 3053,
    riskCode: 1,
    description: '3053 1 Gaskets, Packing, and Sealing Devices Mfg',
  },
  {
    sicCode: 3061,
    riskCode: 1,
    description:
      '3061 1 Molded, Extruded, and Lathe-Cut Mechanical Rubber Goods Mfg',
  },
  {
    sicCode: 3069,
    riskCode: 1,
    description: '3069 1 Fabricated Rubber Products Mfg, NEC',
  },
  {
    sicCode: 3069,
    riskCode: 2,
    description: '3069 2 Condom Mfg',
  },
  {
    sicCode: 3069,
    riskCode: 3,
    description: '3069 3 Rubber Reclaiming',
  },
  {
    sicCode: 3069,
    riskCode: 4,
    description: '3069 4 Sponge Processing',
  },
  {
    sicCode: 3069,
    riskCode: 5,
    description: '3069 5 Valves Mfg.--Precision--rubber',
  },
  {
    sicCode: 3081,
    riskCode: 1,
    description: '3081 1 Unsupported Plastics Film and Sheet Mfg',
  },
  {
    sicCode: 3082,
    riskCode: 1,
    description: '3082 1 Unsupported Plastics Profile Shapes Mfg',
  },
  {
    sicCode: 3083,
    riskCode: 1,
    description:
      '3083 1 Laminated Plastics Plate, Sheet, and Profile Shapes Mfg',
  },
  {
    sicCode: 3084,
    riskCode: 1,
    description: '3084 1 Pipes or Tubes Mfg.-- plastic-',
  },
  {
    sicCode: 3085,
    riskCode: 1,
    description: '3085 1 Bottle and Jar Mfg. -plastic-non-returnable',
  },
  {
    sicCode: 3085,
    riskCode: 2,
    description: '3085 2 Bottle and Jar Mfg. -plastic--returnable',
  },
  {
    sicCode: 3086,
    riskCode: 1,
    description:
      '3086 1 Insulating Material Mfg.- plastic--for application in a solid state',
  },
  {
    sicCode: 3086,
    riskCode: 2,
    description: '3086 2 Insulating Material Mfg.- plastic',
  },
  {
    sicCode: 3086,
    riskCode: 3,
    description: '3086 3 Plastics Foam Products Mfg, NEC',
  },
  {
    sicCode: 3087,
    riskCode: 1,
    description: '3087 1 Custom Compounding of Purchased Plastics Resins',
  },
  {
    sicCode: 3088,
    riskCode: 1,
    description: '3088 1 Plastics Plumbing Fixtures Mfg',
  },
  {
    sicCode: 3089,
    riskCode: 1,
    description: '3089 1 Plastics Products Mfg, NEC',
  },
  {
    sicCode: 3089,
    riskCode: 2,
    description: '3089 2 Net Mfg.- safety nets',
  },
  {
    sicCode: 3089,
    riskCode: 3,
    description: '3089 3 Drums or Containers Mfg.- plastic',
  },
  {
    sicCode: 3089,
    riskCode: 4,
    description: '3089 4 Plastic or Rubber Goods Mfg.--household-',
  },
  {
    sicCode: 3089,
    riskCode: 5,
    description: '3089 5 Plastic or Rubber Goods Mfg.--other than household',
  },
  {
    sicCode: 3089,
    riskCode: 6,
    description: '3089 6 Plastic Boats Mfg - non rigid',
  },
  {
    sicCode: 3089,
    riskCode: 7,
    description: '3089 7 Buoys and floats Mfg - plastic',
  },
  {
    sicCode: 3089,
    riskCode: 8,
    description: '3089 8 Bucket  Mfg - plastic',
  },
  {
    sicCode: 3089,
    riskCode: 9,
    description: '3089 9 Plastic ladders Mfg',
  },
  {
    sicCode: 3089,
    riskCode: 10,
    description: '3089 10 Life Jackets Mfg',
  },
  {
    sicCode: 3089,
    riskCode: 11,
    description: '3089 11 Life rafts Mfg - non rigid',
  },
  {
    sicCode: 3089,
    riskCode: 12,
    description: '3089 12 Pails Mfg - plastic',
  },
  {
    sicCode: 3089,
    riskCode: 13,
    description: '3089 13 Pontoons Mfg - Plastic',
  },
  {
    sicCode: 3089,
    riskCode: 14,
    description: '3089 14 Septic tanks Mfg - plastic',
  },
  {
    sicCode: 3089,
    riskCode: 15,
    description: '3089 15 Swimming pool covers Mfg - Non-canvas',
  },
  {
    sicCode: 3089,
    riskCode: 16,
    description: '3089 16 Tires Mfg, plastics',
  },
  {
    sicCode: 3089,
    riskCode: 17,
    description: '3089 17 Window frames Mfg - Plastic',
  },
  {
    sicCode: 3089,
    riskCode: 18,
    description: '3089 18 Window Screening Mfg',
  },
  {
    sicCode: 3089,
    riskCode: 19,
    description: '3089 19 Windows Mfg, louver, plastic',
  },
  {
    sicCode: 3111,
    riskCode: 1,
    description: '3111 1 Leather Tanning and Finishing',
  },
  {
    sicCode: 3131,
    riskCode: 1,
    description: '3131 1 Boot and Shoe Cut Stock and Findings Mfg',
  },
  {
    sicCode: 3142,
    riskCode: 1,
    description: '3142 1 House Slippers Mfg',
  },
  {
    sicCode: 3143,
    riskCode: 1,
    description: "3143 1 Men's Footwear Mfg, Except Athletic",
  },
  {
    sicCode: 3144,
    riskCode: 1,
    description: "3144 1 Women's Footwear Mfg, Except Athletic",
  },
  {
    sicCode: 3149,
    riskCode: 1,
    description: '3149 1 Footwear Mfg, Except Rubber, NEC',
  },
  {
    sicCode: 3151,
    riskCode: 1,
    description: '3151 1 Leather Gloves and Mittens Mfg',
  },
  {
    sicCode: 3161,
    riskCode: 1,
    description: '3161 1 Luggage Mfg',
  },
  {
    sicCode: 3171,
    riskCode: 1,
    description: "3171 1 Women's Handbags and Purses Mfg",
  },
  {
    sicCode: 3172,
    riskCode: 1,
    description:
      "3172 1 Personal Leather Goods Mfg, Except Women's Handbags and Purses",
  },
  {
    sicCode: 3199,
    riskCode: 1,
    description: '3199 1 Leather Goods Mfg, NEC',
  },
  {
    sicCode: 3199,
    riskCode: 2,
    description: '3199 2 Saddles, Harnesses or Horses Furnishings Mfg.-',
  },
  {
    sicCode: 3199,
    riskCode: 3,
    description: '3199 3 Leather Seat Belts & Safety Belts Mfg',
  },
  {
    sicCode: 3211,
    riskCode: 1,
    description: '3211 1 Flat Glass Mfg',
  },
  {
    sicCode: 3221,
    riskCode: 1,
    description:
      '3221 1 Bottle and Jar Mfg. -glass--for use under pressure--non-returnable',
  },
  {
    sicCode: 3221,
    riskCode: 2,
    description:
      '3221 2 Bottle and Jar Mfg. -glass--for use under pressure--returnable',
  },
  {
    sicCode: 3221,
    riskCode: 3,
    description:
      '3221 3 Bottle and Jar Mfg. -glass--not for use under pressure',
  },
  {
    sicCode: 3229,
    riskCode: 1,
    description: '3229 1 Pressed and Glassware Mfg (not blown glass) NEC',
  },
  {
    sicCode: 3229,
    riskCode: 2,
    description: '3229 2 Glassblowing',
  },
  {
    sicCode: 3231,
    riskCode: 1,
    description: '3231 1 Glass or Glassware Mfg',
  },
  {
    sicCode: 3241,
    riskCode: 1,
    description: '3241 1 Cement, Hydraulic Mfg',
  },
  {
    sicCode: 3251,
    riskCode: 1,
    description: '3251 1 Brick and Structural Clay Tile Mfg',
  },
  {
    sicCode: 3253,
    riskCode: 1,
    description: '3253 1 Ceramic Wall and Floor Tile Mfg',
  },
  {
    sicCode: 3255,
    riskCode: 1,
    description: '3255 1 Clay Refractories Mfg',
  },
  {
    sicCode: 3259,
    riskCode: 1,
    description: '3259 1 Structural Clay Products Mfg, NEC',
  },
  {
    sicCode: 3261,
    riskCode: 1,
    description:
      '3261 1 Vitreous China Plumbing Fixtures and China and Earthenware Fittings and Bathroom Accessories Mfg',
  },
  {
    sicCode: 3262,
    riskCode: 1,
    description: '3262 1 Vitreous China Table and Kitchen Articles Mfg',
  },
  {
    sicCode: 3263,
    riskCode: 1,
    description:
      '3263 1 Fine Earthenware (Whiteware) Table and Kitchen Articles Mfg',
  },
  {
    sicCode: 3264,
    riskCode: 1,
    description: '3264 1 Porcelain Electrical Supplies Mfg',
  },
  {
    sicCode: 3269,
    riskCode: 1,
    description: '3269 1 Pottery Product Mfg, NEC',
  },
  {
    sicCode: 3271,
    riskCode: 1,
    description: '3271 1 Concrete Block and Brick Mfg',
  },
  {
    sicCode: 3272,
    riskCode: 1,
    description: '3272 1 Concrete or Plaster Products Mfg--not structural',
  },
  {
    sicCode: 3272,
    riskCode: 2,
    description: '3272 2 Concrete Products Mfg.- structural',
  },
  {
    sicCode: 3273,
    riskCode: 1,
    description: '3273 1 Ready-Mixed Concrete Mfg',
  },
  {
    sicCode: 3274,
    riskCode: 1,
    description: '3274 1 Lime Mfg.',
  },
  {
    sicCode: 3275,
    riskCode: 1,
    description: '3275 1 Cement or Plaster Mfg.--bulk',
  },
  {
    sicCode: 3275,
    riskCode: 2,
    description: '3275 2 Cement, Concrete Mix or Plaster Mfg.-- packaged',
  },
  {
    sicCode: 3281,
    riskCode: 1,
    description: '3281 1 Marble Products Mfg',
  },
  {
    sicCode: 3281,
    riskCode: 2,
    description: '3281 2 Slate Milling',
  },
  {
    sicCode: 3281,
    riskCode: 3,
    description: '3281 3 Slate Splitting or Slate Roofing Mfg.',
  },
  {
    sicCode: 3281,
    riskCode: 4,
    description: '3281 4 Stone Crushing',
  },
  {
    sicCode: 3281,
    riskCode: 5,
    description: '3281 5 Stone Cutting or Polishing',
  },
  {
    sicCode: 3281,
    riskCode: 6,
    description: '3281 6 Cut Stone and Stone Products Mfg, NEC',
  },
  {
    sicCode: 3291,
    riskCode: 1,
    description: '3291 1 Abrasive Wheel Mfg',
  },
  {
    sicCode: 3291,
    riskCode: 2,
    description: '3291 2 Abrasives or Abrasive Products Mfg.- artificial',
  },
  {
    sicCode: 3291,
    riskCode: 3,
    description: '3291 3 Abrasives or Abrasive Products Mfg',
  },
  {
    sicCode: 3291,
    riskCode: 4,
    description: '3291 4 Hone, Oilstone or Whetstone Mfg.',
  },
  {
    sicCode: 3291,
    riskCode: 5,
    description: '3291 5 Mineral Powder or Mineral Polish Mfg',
  },
  {
    sicCode: 3291,
    riskCode: 6,
    description: '3291 6 Steel Wool or Wire Wool Mfg.',
  },
  {
    sicCode: 3292,
    riskCode: 1,
    description: '3292 1 Asbestos Goods Mfg.',
  },
  {
    sicCode: 3295,
    riskCode: 1,
    description: '3295 1 Minerals and Earths, Ground or Otherwise Treated',
  },
  {
    sicCode: 3296,
    riskCode: 1,
    description: '3296 1 Mineral Wool Mfg',
  },
  {
    sicCode: 3296,
    riskCode: 2,
    description: '3296 2 Composition Goods Mfg.--not floor coverings',
  },
  {
    sicCode: 3296,
    riskCode: 3,
    description: '3296 3 Fiberglass Mfg.',
  },
  {
    sicCode: 3296,
    riskCode: 4,
    description: '3296 4 Insulating Material Mfg.- mineral',
  },
  {
    sicCode: 3297,
    riskCode: 1,
    description: '3297 1 Nonclay Refractories Mfg',
  },
  {
    sicCode: 3299,
    riskCode: 1,
    description: '3299 1 Nonmetallic Mineral Products Mfg, NEC',
  },
  {
    sicCode: 3299,
    riskCode: 2,
    description: '3299 2 Mica Goods Mfg.',
  },
  {
    sicCode: 3312,
    riskCode: 1,
    description: '3312 1 Metals--extraction or refining-- chemical processes',
  },
  {
    sicCode: 3312,
    riskCode: 2,
    description:
      '3312 2 Metals--extraction or refining-- electro-metallurgical processes',
  },
  {
    sicCode: 3312,
    riskCode: 3,
    description:
      '3312 3 Metals--extraction or refining of ferrous metals--blast furnace or other pyrometallurgical processes',
  },
  {
    sicCode: 3312,
    riskCode: 4,
    description:
      '3312 4 Metals--extraction or refining of nonferrous metals--blast furnace or other pyrometallurgical processes',
  },
  {
    sicCode: 3312,
    riskCode: 5,
    description: '3312 5 Metals--extraction or refining',
  },
  {
    sicCode: 3312,
    riskCode: 6,
    description: '3312 6 Ore Mill or Processing',
  },
  {
    sicCode: 3312,
    riskCode: 7,
    description: '3312 7 Wheel Mfg.',
  },
  {
    sicCode: 3312,
    riskCode: 8,
    description:
      '3312 8 Steel Works, Blast Furnaces (Including Coke Ovens), and Rolling Mills',
  },
  {
    sicCode: 3313,
    riskCode: 1,
    description: '3313 1 Electrometallurgical Products Mfg, Except Steel',
  },
  {
    sicCode: 3315,
    riskCode: 1,
    description: '3315 1 Cable or Wire Mfg.',
  },
  {
    sicCode: 3315,
    riskCode: 2,
    description: '3315 2 Nails or Spikes Mfg',
  },
  {
    sicCode: 3315,
    riskCode: 3,
    description: '3315 3 Steel Wiredrawing and Steel Nails and Spikes Mfg, NEC',
  },
  {
    sicCode: 3315,
    riskCode: 4,
    description: '3315 4 Wire Cloth Mfg.',
  },
  {
    sicCode: 3315,
    riskCode: 5,
    description: '3315 5 Wire Drawing',
  },
  {
    sicCode: 3316,
    riskCode: 1,
    description: '3316 1 Rolling Mills--cold or hot process',
  },
  {
    sicCode: 3317,
    riskCode: 1,
    description: '3317 1 Pipes or Tubes Mfg.-- metal',
  },
  {
    sicCode: 3321,
    riskCode: 1,
    description: '3321 1 Gray and Ductile Iron Foundries',
  },
  {
    sicCode: 3322,
    riskCode: 1,
    description: '3322 1 Malleable Iron Foundries',
  },
  {
    sicCode: 3324,
    riskCode: 1,
    description: '3324 1 Steel Investment Foundries',
  },
  {
    sicCode: 3325,
    riskCode: 1,
    description: '3325 1 Steel Foundries, NEC',
  },
  {
    sicCode: 3331,
    riskCode: 1,
    description: '3331 1 Primary Smelting and Refining of Copper',
  },
  {
    sicCode: 3334,
    riskCode: 1,
    description: '3334 1 Primary Production of Aluminum',
  },
  {
    sicCode: 3339,
    riskCode: 1,
    description:
      '3339 1 Primary Smelting and Refining of Nonferrous Metals, Except Copper and Aluminum',
  },
  {
    sicCode: 3341,
    riskCode: 1,
    description:
      '3341 1 Secondary Smelting and Refining of Nonferrous Metals, (except Copper and Aluminum)',
  },
  {
    sicCode: 3341,
    riskCode: 2,
    description: '3341 2 Secondary Smelting and Refining Copper',
  },
  {
    sicCode: 3341,
    riskCode: 3,
    description: '3341 3 Secondary Smelting and Refining of Aluminum',
  },
  {
    sicCode: 3351,
    riskCode: 1,
    description: '3351 1 Rolling, Drawing, and Extruding of Copper',
  },
  {
    sicCode: 3353,
    riskCode: 1,
    description: '3353 1 Aluminum Sheet, Plate, and Foil Mfg',
  },
  {
    sicCode: 3354,
    riskCode: 1,
    description: '3354 1 Aluminum Extruded Products Mfg',
  },
  {
    sicCode: 3355,
    riskCode: 1,
    description: '3355 1 Aluminum Rolling and Drawing, NEC',
  },
  {
    sicCode: 3356,
    riskCode: 1,
    description:
      '3356 1 Rolling, Drawing, and Extruding of Nonferrous Metals, Except Copper and Aluminum',
  },
  {
    sicCode: 3357,
    riskCode: 1,
    description: '3357 1 Drawing and Insulating of Nonferrous Wire',
  },
  {
    sicCode: 3363,
    riskCode: 1,
    description: '3363 1 Aluminum Die-Castings Mfg',
  },
  {
    sicCode: 3364,
    riskCode: 1,
    description: '3364 1 Nonferrous Die-Castings Mfg, Except Aluminum',
  },
  {
    sicCode: 3365,
    riskCode: 1,
    description: '3365 1 Aluminum Foundries',
  },
  {
    sicCode: 3366,
    riskCode: 1,
    description: '3366 1 Copper Foundries',
  },
  {
    sicCode: 3369,
    riskCode: 1,
    description: '3369 1 Nonferrous Foundries, Except Aluminum and Copper',
  },
  {
    sicCode: 3398,
    riskCode: 1,
    description: '3398 1 Metal Heat Treating',
  },
  {
    sicCode: 3399,
    riskCode: 1,
    description: '3399 1 Primary Metal Products Mfg, NEC',
  },
  {
    sicCode: 3411,
    riskCode: 1,
    description: '3411 1 Aerosol Container Mfg.',
  },
  {
    sicCode: 3411,
    riskCode: 2,
    description: '3411 2 Can Mfg.--metal',
  },
  {
    sicCode: 3412,
    riskCode: 1,
    description: '3412 1 Metal Shipping Barrels, Drums, Kegs, and Pails Mfg',
  },
  {
    sicCode: 3421,
    riskCode: 1,
    description: '3421 1 Cutlery (not powered) and Flatware Mfg',
  },
  {
    sicCode: 3421,
    riskCode: 2,
    description: '3421 2 Razor or Razor Blades Mfg',
  },
  {
    sicCode: 3423,
    riskCode: 1,
    description:
      '3423 1 Hand and Edge Tools Mfg, Except Machine Tools and Handsaws',
  },
  {
    sicCode: 3425,
    riskCode: 1,
    description: '3425 1 Saw Blades and Handsaws Mfg',
  },
  {
    sicCode: 3429,
    riskCode: 1,
    description: '3429 1 Hardware Mfg, NEC',
  },
  {
    sicCode: 3431,
    riskCode: 1,
    description: '3431 1 Enameled Iron and Metal Sanitary Ware Mfg',
  },
  {
    sicCode: 3432,
    riskCode: 1,
    description: '3432 1 Plumbing Fixture Fittings and Trim Mfg',
  },
  {
    sicCode: 3433,
    riskCode: 1,
    description:
      '3433 1 Heating Equipment, Except Electric and Warm Air Furnaces Mfg',
  },
  {
    sicCode: 3441,
    riskCode: 1,
    description: '3441 1 Fabricated Structural Metal',
  },
  {
    sicCode: 3442,
    riskCode: 1,
    description: '3442 1 Door Mfg.-- metal',
  },
  {
    sicCode: 3442,
    riskCode: 2,
    description: '3442 2 Window Mfg.-- metal',
  },
  {
    sicCode: 3442,
    riskCode: 3,
    description:
      '3442 3 Metal Sash, Frames, Molding, and Trim Mfg (no windows)',
  },
  {
    sicCode: 3443,
    riskCode: 1,
    description: '3443 1 Tank Building or Mfg.--metal--not pressurized',
  },
  {
    sicCode: 3443,
    riskCode: 2,
    description: '3443 2 Tank Building or Mfg.--metal--pressurized',
  },
  {
    sicCode: 3443,
    riskCode: 3,
    description: '3443 3 Fabricated Plate Work (Boiler Shops), NEC',
  },
  {
    sicCode: 3444,
    riskCode: 1,
    description: '3444 1 Sheet Metal Work Operation',
  },
  {
    sicCode: 3446,
    riskCode: 1,
    description: '3446 1 Architectural and Ornamental Metal Work',
  },
  {
    sicCode: 3448,
    riskCode: 1,
    description: '3448 1 Prefabricated Metal Buildings and Components Mfg',
  },
  {
    sicCode: 3449,
    riskCode: 1,
    description: '3449 1 Miscellaneous Structural Metal Work',
  },
  {
    sicCode: 3451,
    riskCode: 1,
    description: '3451 1 Screw Machine Products Mfg',
  },
  {
    sicCode: 3452,
    riskCode: 1,
    description: '3452 1 Bolts, Nuts, Screws, Rivets, and Washers Mfg',
  },
  {
    sicCode: 3462,
    riskCode: 1,
    description: '3462 1 Iron and Steel Forgings',
  },
  {
    sicCode: 3462,
    riskCode: 2,
    description: '3462 2 Iron and Steel Foundries',
  },
  {
    sicCode: 3463,
    riskCode: 1,
    description: '3463 1 Nonferrous Forgings',
  },
  {
    sicCode: 3465,
    riskCode: 1,
    description: '3465 1 Automotive Stamping',
  },
  {
    sicCode: 3466,
    riskCode: 1,
    description: '3466 1 Crowns and Closures Mfg',
  },
  {
    sicCode: 3469,
    riskCode: 1,
    description: '3469 1 Metal Goods Mfg.-- stamping--not signs',
  },
  {
    sicCode: 3469,
    riskCode: 2,
    description: '3469 2 Metal Stamping, NEC',
  },
  {
    sicCode: 3471,
    riskCode: 1,
    description:
      '3471 1 Electroplating, Plating, Polishing, Anodizing, and Coloring',
  },
  {
    sicCode: 3479,
    riskCode: 1,
    description: '3479 1 Coating, Engraving, and Allied Services, NEC',
  },
  {
    sicCode: 3479,
    riskCode: 2,
    description: '3479 2 Galvanizing or Tinning',
  },
  {
    sicCode: 3482,
    riskCode: 1,
    description: '3482 1 Small Arms Ammunition Mfg',
  },
  {
    sicCode: 3483,
    riskCode: 1,
    description: '3483 1 Ammunition Mfg, Except for Small Arms',
  },
  {
    sicCode: 3484,
    riskCode: 1,
    description: '3484 1 Firearms Mfg.',
  },
  {
    sicCode: 3484,
    riskCode: 2,
    description: '3484 2 Weapons and weapons accessories Mfg, NEC',
  },
  {
    sicCode: 3489,
    riskCode: 1,
    description: '3489 1 Ordnance and Accessories Mfg, NEC',
  },
  {
    sicCode: 3491,
    riskCode: 1,
    description: '3491 1 Industrial Valves Mfg',
  },
  {
    sicCode: 3491,
    riskCode: 2,
    description:
      '3491 2 E&S Group only - Valves, Measuring, and Control Equipment',
  },
  {
    sicCode: 3492,
    riskCode: 1,
    description: '3492 1 Fluid Power Valves and Hose Fittings Mfg',
  },
  {
    sicCode: 3493,
    riskCode: 1,
    description: '3493 1 Steel Springs Mfg, Except Wire',
  },
  {
    sicCode: 3494,
    riskCode: 1,
    description: '3494 1 Valves Mfg. -- Metal--ISO GL #59892',
  },
  {
    sicCode: 3495,
    riskCode: 1,
    description: '3495 1 Wire Springs Mfg',
  },
  {
    sicCode: 3496,
    riskCode: 1,
    description: '3496 1 Miscellaneous Fabricated Wire Products Mfg',
  },
  {
    sicCode: 3496,
    riskCode: 2,
    description: '3496 2 Wire Rope or Cable Mfg.--metal',
  },
  {
    sicCode: 3497,
    riskCode: 1,
    description: '3497 1 Metal Foil and Leaf Mfg',
  },
  {
    sicCode: 3498,
    riskCode: 1,
    description: '3498 1 Fabricated Pipe and Pipe Fittings Mfg',
  },
  {
    sicCode: 3499,
    riskCode: 1,
    description: '3499 1 Fabricated Metal Products Mfg, NEC',
  },
  {
    sicCode: 3499,
    riskCode: 2,
    description: '3499 2 Safes or Safe Vaults Mfg.',
  },
  {
    sicCode: 3499,
    riskCode: 3,
    description: '3499 3 Ladder Mfg.-- other than wood',
  },
  {
    sicCode: 3499,
    riskCode: 4,
    description: '3499 4 Auto Seat Frames Mfg',
  },
  {
    sicCode: 3499,
    riskCode: 5,
    description: '3499 5 Chair Frames Mfg',
  },
  {
    sicCode: 3499,
    riskCode: 6,
    description: '3499 6 Marine horns Mfg - metal',
  },
  {
    sicCode: 3511,
    riskCode: 1,
    description:
      '3511 1 Steam, Gas, and Hydraulic Turbines, and Turbine Generator Set Units Mfg',
  },
  {
    sicCode: 3519,
    riskCode: 1,
    description: '3519 1 Internal Combustion Engines Mfg, NEC',
  },
  {
    sicCode: 3523,
    riskCode: 1,
    description: '3523 1 Farm Machinery and Equipment Mfg',
  },
  {
    sicCode: 3524,
    riskCode: 1,
    description:
      '3524 1 Lawn and Garden Tractors and Home Lawn and Garden  Equipment Mfg',
  },
  {
    sicCode: 3531,
    riskCode: 1,
    description: '3531 1 Construction Machinery and Equipment Mfg',
  },
  {
    sicCode: 3532,
    riskCode: 1,
    description:
      '3532 1 Mining Machinery and Equipment Mfg, Except Oil and Gas Field  Machinery and Equipment',
  },
  {
    sicCode: 3533,
    riskCode: 1,
    description: '3533 1 Oil and Gas Field Machinery and Equipment Mfg',
  },
  {
    sicCode: 3533,
    riskCode: 10,
    description:
      '3533 10 Energy Program Only - Oil and Gas Field Machinery and Equipment Mfg.',
  },
  {
    sicCode: 3534,
    riskCode: 1,
    description: '3534 1 Elevator Mfg.',
  },
  {
    sicCode: 3534,
    riskCode: 2,
    description: '3534 2 Escalator or Moving Sidewalk Mfg.',
  },
  {
    sicCode: 3535,
    riskCode: 1,
    description: '3535 1 Conveyors and Conveying Equipment Mfg',
  },
  {
    sicCode: 3536,
    riskCode: 1,
    description:
      '3536 1 Overhead Traveling Cranes, Hoists, and Monorail Systems Mfg',
  },
  {
    sicCode: 3537,
    riskCode: 1,
    description:
      '3537 1 Industrial Trucks, Tractors, Trailers, and Stackers Mfg',
  },
  {
    sicCode: 3541,
    riskCode: 1,
    description: '3541 1 Machine Tools Mfg, Metal Cutting Type',
  },
  {
    sicCode: 3542,
    riskCode: 1,
    description: '3542 1 Machine Tools Mfg, Metal Forming Type',
  },
  {
    sicCode: 3543,
    riskCode: 1,
    description: '3543 1 Pattern Mfg.-- metal',
  },
  {
    sicCode: 3543,
    riskCode: 2,
    description: '3543 2 Pattern Mfg.-- NEC',
  },
  {
    sicCode: 3543,
    riskCode: 3,
    description: '3543 3 Pattern Mfg.-- paper',
  },
  {
    sicCode: 3544,
    riskCode: 1,
    description:
      '3544 1 Special Dies and Tools, Die Sets, Jigs and Fixtures, and Industrial Molds Mfg',
  },
  {
    sicCode: 3545,
    riskCode: 1,
    description:
      "3545 1 Cutting Tools, Machine Tool Accessories, and Machinists' Precision Measuring Devices Mfg",
  },
  {
    sicCode: 3546,
    riskCode: 1,
    description: '3546 1 Power-Driven Hand tools Mfg',
  },
  {
    sicCode: 3547,
    riskCode: 1,
    description: '3547 1 Rolling Mill Machinery and Equipment Mfg',
  },
  {
    sicCode: 3548,
    riskCode: 1,
    description: '3548 1 Electric and Gas Welding and Soldering Equipment Mfg',
  },
  {
    sicCode: 3549,
    riskCode: 1,
    description: '3549 1 Metalworking Machinery Mfg, NEC',
  },
  {
    sicCode: 3552,
    riskCode: 1,
    description: '3552 1 Textile Machinery Mfg',
  },
  {
    sicCode: 3553,
    riskCode: 1,
    description: '3553 1 Woodworking Machinery Mfg',
  },
  {
    sicCode: 3554,
    riskCode: 1,
    description: '3554 1 Paper Industries Machinery Mfg',
  },
  {
    sicCode: 3555,
    riskCode: 1,
    description: '3555 1 Printing Trades Machinery and Equipment Mfg',
  },
  {
    sicCode: 3556,
    riskCode: 1,
    description: '3556 1 Food Products Machinery Mfg',
  },
  {
    sicCode: 3559,
    riskCode: 1,
    description: '3559 1 Special  Industry Machinery Mfg, NEC',
  },
  {
    sicCode: 3561,
    riskCode: 1,
    description: '3561 1 Pumps and Pumping Equipment Mfg',
  },
  {
    sicCode: 3561,
    riskCode: 2,
    description: '3561 2 E&S Group only - Pumps',
  },
  {
    sicCode: 3562,
    riskCode: 1,
    description: '3562 1 Ball and Roller Bearings Mfg',
  },
  {
    sicCode: 3563,
    riskCode: 1,
    description: '3563 1 Air and Gas Compressors Mfg',
  },
  {
    sicCode: 3564,
    riskCode: 1,
    description:
      '3564 1 Industrial and Commercial Fans and Blowers and Air  Purification Equipment Mfg',
  },
  {
    sicCode: 3565,
    riskCode: 1,
    description: '3565 1 Packaging Machinery Mfg',
  },
  {
    sicCode: 3566,
    riskCode: 1,
    description:
      '3566 1 Speed Changers, Industrial High-Speed Drives, and Gears Mfg',
  },
  {
    sicCode: 3567,
    riskCode: 1,
    description: '3567 1 Industrial Process Furnaces and Ovens Mfg',
  },
  {
    sicCode: 3568,
    riskCode: 1,
    description: '3568 1 Mechanical Power Transmission Equipment Mfg, NEC',
  },
  {
    sicCode: 3569,
    riskCode: 1,
    description: '3569 1 General Industrial Machinery and Equipment Mfg, NEC',
  },
  {
    sicCode: 3571,
    riskCode: 1,
    description:
      '3571 1 Electronic Computers Mfg / Computer Assembly Operations other then Electronic Contract Manufacturing / Assembling, NEC',
  },
  {
    sicCode: 3571,
    riskCode: 2,
    description: '3571 2 Electronic Contract Manufacturing / Assembling, NEC',
  },
  {
    sicCode: 3571,
    riskCode: 3,
    description:
      '3571 3 Any risk in SIC 3571 with $250,000 to $1 M in Memory Chip and Modules including but not limited to: DRAMs, SRAMs, SDRAMs, EDRAMs, SIMMs, DIMMs, Compact Flash, Secure Digital, Smart Media or other type of card.',
  },
  {
    sicCode: 3571,
    riskCode: 4,
    description:
      '3571 4 Any risk in SIC 3571 with over $1,000,000 in Memory Chip and Modules including but not limited to: DRAMs, SRAMs, SDRAMs, EDRAMs, SIMMs, DIMMs, Compact Flash, Secure Digital, Smart Media or other type of card.',
  },
  {
    sicCode: 3572,
    riskCode: 1,
    description: '3572 1 Computer Storage Devices Mfg, NEC',
  },
  {
    sicCode: 3572,
    riskCode: 2,
    description:
      '3572 2 Any risk in SIC 3572 with $250,000 to $1M in Memory Chip and Modules including but not limited to: DRAMs, SRAMs, SDRAMs, EDRAMs, SIMMs, DIMMs, Compact Flash, Secure Digital, Smart Media or other type of card.',
  },
  {
    sicCode: 3572,
    riskCode: 3,
    description:
      '3572 3 Any risk in SIC 3572 with more than $1,000,000 in Memory Chip and Modules including but not limited to: DRAMs, SRAMs, SDRAMs, EDRAMs, SIMMs, DIMMs, Compact Flash, Secure Digital, Smart Media or other type of card.',
  },
  {
    sicCode: 3575,
    riskCode: 1,
    description: '3575 1 Computer Terminals Mfg. NEC',
  },
  {
    sicCode: 3575,
    riskCode: 2,
    description:
      '3575 2 Any risk in SIC 3575 with $250,000 to $1 M in Memory Chip and Modules including but not limited to: DRAMs, SRAMs, SDRAMs, EDRAMs, SIMMs, DIMMs, Compact Flash, Secure Digital, Smart Media or other type of card.',
  },
  {
    sicCode: 3575,
    riskCode: 3,
    description:
      '3575 3 Any risk in SIC 3575 with more than $1,000,000 in Memory Chip and Modules including but not limited to: DRAMs, SRAMs, SDRAMs, EDRAMs, SIMMs, DIMMs, Compact Flash, Secure Digital, Smart Media or other type of card.',
  },
  {
    sicCode: 3577,
    riskCode: 1,
    description: '3577 1 Computer Peripheral Equipment Mfg, NEC',
  },
  {
    sicCode: 3578,
    riskCode: 1,
    description:
      '3578 1 Calculating and Accounting Machines, Except Electronic Computers Mfg',
  },
  {
    sicCode: 3578,
    riskCode: 2,
    description: '3578 2 Automated Teller Machine Deployers Mfg',
  },
  {
    sicCode: 3579,
    riskCode: 1,
    description: '3579 1 Office Machines Mfg, NEC',
  },
  {
    sicCode: 3581,
    riskCode: 1,
    description: '3581 1 Automatic Vending Machines Mfg',
  },
  {
    sicCode: 3582,
    riskCode: 1,
    description:
      '3582 1 Commercial Laundry, Drycleaning, and Pressing Machines Mfg',
  },
  {
    sicCode: 3585,
    riskCode: 1,
    description:
      '3585 1 Air-Conditioning and Warm Air Heating Equipment and Commercial and Industrial Refrigeration Equipment Mfg',
  },
  {
    sicCode: 3586,
    riskCode: 1,
    description: '3586 1 Measuring and Dispensing Pumps Mfg',
  },
  {
    sicCode: 3589,
    riskCode: 1,
    description: '3589 1 Service Industry Machinery Mfg, NEC',
  },
  {
    sicCode: 3592,
    riskCode: 1,
    description: '3592 1 Carburetors, Pistons, Piston Rings, and Valves Mfg',
  },
  {
    sicCode: 3592,
    riskCode: 2,
    description: '3592 2 Valves Mfg.--Metal--Engine',
  },
  {
    sicCode: 3592,
    riskCode: 3,
    description: '3592 3 Valves Mfg.--Precision--Engine',
  },
  {
    sicCode: 3593,
    riskCode: 1,
    description: '3593 1 Fluid Power Cylinders and Actuators Mfg',
  },
  {
    sicCode: 3594,
    riskCode: 1,
    description: '3594 1 Fluid Power Pumps and Motors Mfg',
  },
  {
    sicCode: 3596,
    riskCode: 1,
    description: '3596 1 Scales and Balances Mfg, Except Laboratory',
  },
  {
    sicCode: 3599,
    riskCode: 1,
    description:
      '3599 1 Industrial and Commercial Machinery and Equipment Mfg, NEC',
  },
  {
    sicCode: 3599,
    riskCode: 2,
    description: '3599 2 Commercial and Service Industry Machinery Mfg, NEC',
  },
  {
    sicCode: 3599,
    riskCode: 3,
    description: '3599 3 Machine Shops - sales less than $3 million',
  },
  {
    sicCode: 3599,
    riskCode: 4,
    description: '3599 4 Machinery or Machinery Parts Mfg. -- industrial type',
  },
  {
    sicCode: 3599,
    riskCode: 5,
    description: '3599 5 Misc Fabricated Metal Products Mfg, NEC',
  },
  {
    sicCode: 3599,
    riskCode: 6,
    description: '3599 6 E&S Group only - Environmental Equipment - NEC',
  },
  {
    sicCode: 3612,
    riskCode: 1,
    description: '3612 1 Power, Distribution, and Specialty Transformers Mfg',
  },
  {
    sicCode: 3613,
    riskCode: 1,
    description: '3613 1 Switchgear and Switchboard Apparatus Mfg',
  },
  {
    sicCode: 3621,
    riskCode: 1,
    description: '3621 1 Motors and Generators Mfg',
  },
  {
    sicCode: 3624,
    riskCode: 1,
    description: '3624 1 Carbon and Graphite Products Mfg',
  },
  {
    sicCode: 3625,
    riskCode: 1,
    description: '3625 1 Relays and Industrial Controls Mfg',
  },
  {
    sicCode: 3629,
    riskCode: 1,
    description: '3629 1 Electrical Industrial Apparatus Mfg, NEC',
  },
  {
    sicCode: 3629,
    riskCode: 2,
    description: '3629 2 E&S Group only - Green Energy Equipment',
  },
  {
    sicCode: 3629,
    riskCode: 10,
    description: '3629 10 Energy Program Only - Fuel Cell Mfg.',
  },
  {
    sicCode: 3631,
    riskCode: 1,
    description: '3631 1 Household Cooking Equipment Mfg',
  },
  {
    sicCode: 3632,
    riskCode: 1,
    description:
      '3632 1 Household Refrigerators and Home and Farm Freezers Mfg',
  },
  {
    sicCode: 3633,
    riskCode: 1,
    description: '3633 1 Household Laundry Equipment Mfg',
  },
  {
    sicCode: 3634,
    riskCode: 1,
    description: '3634 1 Electric Housewares and Fans Mfg',
  },
  {
    sicCode: 3635,
    riskCode: 1,
    description: '3635 1 Household Vacuum Cleaners Mfg',
  },
  {
    sicCode: 3639,
    riskCode: 1,
    description: '3639 1 Appliances and Accessories Mfg.--household--not gas',
  },
  {
    sicCode: 3639,
    riskCode: 2,
    description:
      '3639 2 Electrical Equipment Mfg.-- for direct and indirect application to the body',
  },
  {
    sicCode: 3639,
    riskCode: 3,
    description: '3639 3 Sewing Machines Mfg.-- commercial',
  },
  {
    sicCode: 3639,
    riskCode: 4,
    description: '3639 4 Sewing Machines Mfg.-- household',
  },
  {
    sicCode: 3639,
    riskCode: 5,
    description: '3639 5 Household Appliances Mfg, NEC',
  },
  {
    sicCode: 3641,
    riskCode: 1,
    description: '3641 1 Electric Lamp Bulbs and Tubes Mfg',
  },
  {
    sicCode: 3643,
    riskCode: 1,
    description: '3643 1 Current-Carrying Wiring Devices Mfg',
  },
  {
    sicCode: 3644,
    riskCode: 1,
    description: '3644 1 Noncurrent-Carrying Wiring Devices Mfg',
  },
  {
    sicCode: 3645,
    riskCode: 1,
    description: '3645 1 Residential Electric Lighting Fixtures Mfg',
  },
  {
    sicCode: 3646,
    riskCode: 1,
    description:
      '3646 1 Commercial, Industrial, and Institutional Electric Lighting Fixtures Mfg',
  },
  {
    sicCode: 3647,
    riskCode: 1,
    description: '3647 1 Vehicular (automobile) Lighting Equipment Mfg',
  },
  {
    sicCode: 3648,
    riskCode: 1,
    description: '3648 1 Lighting Equipment Mfg, NEC',
  },
  {
    sicCode: 3651,
    riskCode: 1,
    description: '3651 1 Household Audio and Video Equipment Mfg',
  },
  {
    sicCode: 3652,
    riskCode: 1,
    description: '3652 1 Phonograph Records/CD Manufacturing',
  },
  {
    sicCode: 3661,
    riskCode: 1,
    description: '3661 1 Telephone and Telegraph Apparatus Mfg',
  },
  {
    sicCode: 3663,
    riskCode: 1,
    description:
      '3663 1 Radio and Television Broadcasting and Communications Equipment Mfg, NEC',
  },
  {
    sicCode: 3663,
    riskCode: 2,
    description:
      '3663 2 Radio and Television Equipment Mfg, Wireless Communications Equipment Mfg other than cellular handsets',
  },
  {
    sicCode: 3663,
    riskCode: 3,
    description: '3663 3 Cellular Handset Mfg.',
  },
  {
    sicCode: 3669,
    riskCode: 1,
    description: '3669 1 Alarm Mfg.--burglar, fire or smoke',
  },
  {
    sicCode: 3669,
    riskCode: 3,
    description: '3669 3 Communications Equipment Mfg, NEC',
  },
  {
    sicCode: 3671,
    riskCode: 1,
    description: '3671 1 Picture Tube Mfg',
  },
  {
    sicCode: 3672,
    riskCode: 1,
    description: '3672 1 Printed Circuit Boards Mfg, NEC',
  },
  {
    sicCode: 3672,
    riskCode: 2,
    description: '3672 2 Printed Circuit Boards Mfg - "Wet" Process or Lay-Up',
  },
  {
    sicCode: 3672,
    riskCode: 3,
    description:
      '3672 3 Printed Circuit Boards Mfg - "Stuffers" or SMT (surface mount technology)',
  },
  {
    sicCode: 3674,
    riskCode: 1,
    description: '3674 1 Semiconductors and Related Devices Mfg, NEC',
  },
  {
    sicCode: 3674,
    riskCode: 2,
    description:
      '3674 2 Semiconductors and Related Devices Mfg - "Fabless", no clean room, no etching, no furnace exposure, no pyrophorics.',
  },
  {
    sicCode: 3674,
    riskCode: 3,
    description:
      '3674 3 Semiconductors and Related Devices Mfg - "Fabs" or Foundries having either clean room (cleaner than class 10k), furnaces &/or pyrophoric gases.',
  },
  {
    sicCode: 3675,
    riskCode: 1,
    description: '3675 1 Semiconductor Electronic Capacitors Mfg',
  },
  {
    sicCode: 3676,
    riskCode: 1,
    description: '3676 1 Semiconductor Electronic Resistors Mfg',
  },
  {
    sicCode: 3677,
    riskCode: 1,
    description:
      '3677 1 Electronic Coils, Transformers, and Other Inductors Mfg',
  },
  {
    sicCode: 3678,
    riskCode: 1,
    description: '3678 1 Electronic Connectors Mfg',
  },
  {
    sicCode: 3679,
    riskCode: 1,
    description: '3679 1 Electronic Components Mfg, NEC',
  },
  {
    sicCode: 3691,
    riskCode: 1,
    description: '3691 1 Storage Batteries Mfg',
  },
  {
    sicCode: 3692,
    riskCode: 1,
    description: '3692 1 Battery Mfg.-- wet cell',
  },
  {
    sicCode: 3692,
    riskCode: 2,
    description: '3692 2 Battery Mfg.--dry cell',
  },
  {
    sicCode: 3694,
    riskCode: 1,
    description:
      '3694 1 Electrical Equipment for Internal Combustion Engines Mfg',
  },
  {
    sicCode: 3695,
    riskCode: 1,
    description: '3695 1 Magnetic and Optical Recording Media Mfg',
  },
  {
    sicCode: 3699,
    riskCode: 1,
    description:
      '3699 1 Electrical Machinery, Equipment, and Supplies Mfg, NEC',
  },
  {
    sicCode: 3711,
    riskCode: 1,
    description: '3711 1 Motor Vehicles and Passenger Car Bodies Mfg',
  },
  {
    sicCode: 3713,
    riskCode: 1,
    description: '3713 1 Truck and Bus Bodies Mfg',
  },
  {
    sicCode: 3714,
    riskCode: 1,
    description:
      '3714 1 Motor Vehicle Parts and Accessories Mfg, non operating parts',
  },
  {
    sicCode: 3714,
    riskCode: 2,
    description:
      '3714 2 Motor Vehicle Parts and Accessories Mfg, operating parts',
  },
  {
    sicCode: 3715,
    riskCode: 1,
    description: '3715 1 Truck Trailers Mfg',
  },
  {
    sicCode: 3716,
    riskCode: 1,
    description: '3716 1 Motor Homes Mfg',
  },
  {
    sicCode: 3721,
    riskCode: 1,
    description: '3721 1 Aircraft Mfg',
  },
  {
    sicCode: 3724,
    riskCode: 1,
    description: '3724 1 Aircraft Engines and Engine Part Mfg',
  },
  {
    sicCode: 3728,
    riskCode: 1,
    description: '3728 1 Aircraft Parts and Auxiliary Equipment Mfg, NEC',
  },
  {
    sicCode: 3728,
    riskCode: 2,
    description: '3728 2 ABC Program Only-Aircraft Mfg &/or Aircraft Parts Mfg',
  },
  {
    sicCode: 3731,
    riskCode: 1,
    description: '3731 1 Ship Repair or Conversion',
  },
  {
    sicCode: 3732,
    riskCode: 1,
    description: '3732 1 Boat or Ship Building with motors',
  },
  {
    sicCode: 3732,
    riskCode: 2,
    description: '3732 2 Boat or Ship Building--without motors',
  },
  {
    sicCode: 3743,
    riskCode: 1,
    description: '3743 1 Railroad Engine Mfg.',
  },
  {
    sicCode: 3743,
    riskCode: 2,
    description: '3743 2 Railroad or Other Public Conveyance Cars Mfg.',
  },
  {
    sicCode: 3743,
    riskCode: 3,
    description: '3743 3 Railroad or Other Public Conveyance Cars Parts Mfg.',
  },
  {
    sicCode: 3751,
    riskCode: 1,
    description: '3751 1 Bicycle Mfg.--not motorized',
  },
  {
    sicCode: 3751,
    riskCode: 2,
    description: '3751 2 Motorcycle, Moped or Motor Scooter Mfg.',
  },
  {
    sicCode: 3761,
    riskCode: 1,
    description: '3761 1 Guided Missiles and Space Vehicles Mfg',
  },
  {
    sicCode: 3764,
    riskCode: 1,
    description:
      '3764 1 Guided Missile and Space Vehicle Propulsion Units and Propulsion Unit Parts Mfg',
  },
  {
    sicCode: 3769,
    riskCode: 1,
    description:
      '3769 1 Guided Missile Space Vehicle Parts and Auxiliary Equipment Mfg, NEC',
  },
  {
    sicCode: 3792,
    riskCode: 1,
    description: '3792 1 Travel Trailers and Campers Mfg',
  },
  {
    sicCode: 3792,
    riskCode: 2,
    description: '3792 2 Travel Trailers and Campers Mfg, self powered',
  },
  {
    sicCode: 3795,
    riskCode: 1,
    description: '3795 1 Tanks and Tank Components Mfg',
  },
  {
    sicCode: 3795,
    riskCode: 2,
    description: '3795 2 E&S Group only - Storage Tanks',
  },
  {
    sicCode: 3799,
    riskCode: 1,
    description: '3799 1 Transportation Equipment Mfg, NEC',
  },
  {
    sicCode: 3812,
    riskCode: 1,
    description:
      '3812 1 Search, Detection, Navigation, Guidance, Aeronautical, and Nautical Systems and Instruments Mfg',
  },
  {
    sicCode: 3821,
    riskCode: 2,
    description: '3821 2 Laboratory Apparatus and Furniture',
  },
  {
    sicCode: 3822,
    riskCode: 1,
    description:
      '3822 1 Automatic Controls for Regulating Residential and Commercial Environments and Appliances Mfg',
  },
  {
    sicCode: 3823,
    riskCode: 1,
    description:
      '3823 1 Industrial Instruments for Measurement, Display, and Control of Process Variables; and Related Products Mfg - NEC',
  },
  {
    sicCode: 3823,
    riskCode: 2,
    description:
      '3823 2 Industrial Instruments for Measurement Mfg: Instruments, Laboratory Equipment',
  },
  {
    sicCode: 3823,
    riskCode: 3,
    description:
      '3823 3 Industrial Instruments for Control Mfg:Analyzers, Energy Management Systems, Measuring Equipment, Process Control',
  },
  {
    sicCode: 3824,
    riskCode: 1,
    description: '3824 1 Totalizing Fluid Meters and Counting Devices Mfg',
  },
  {
    sicCode: 3825,
    riskCode: 1,
    description:
      '3825 1 Instruments for Measuring and Testing of Electricity and Electrical Signals Mfg',
  },
  {
    sicCode: 3826,
    riskCode: 1,
    description: '3826 1 Laboratory Analytical Instruments Mfg',
  },
  {
    sicCode: 3826,
    riskCode: 2,
    description: '3826 2 E&S Group only - Analytical Equipment',
  },
  {
    sicCode: 3827,
    riskCode: 1,
    description: '3827 1 Optical Instruments and Lenses Mfg',
  },
  {
    sicCode: 3829,
    riskCode: 1,
    description: '3829 1 Measuring and Controlling Devices Mfg, NEC',
  },
  {
    sicCode: 3841,
    riskCode: 1,
    description:
      '3841 1 Surgical and Medical Instruments and Apparatus Mfg. - FDA Class 1',
  },
  {
    sicCode: 3841,
    riskCode: 2,
    description:
      '3841 2 Surgical and Medical Instruments and Apparatus Mfg. - FDA Class 2',
  },
  {
    sicCode: 3841,
    riskCode: 3,
    description:
      '3841 3 Surgical and Medical Instruments and Apparatus Mfg. - FDA Class 3',
  },
  {
    sicCode: 3841,
    riskCode: 99,
    description:
      '3841 99 Surgical and Medical Instruments and Apparatus Mfg. No FDA Classification',
  },
  {
    sicCode: 3842,
    riskCode: 1,
    description:
      '3842 1 Orthopedic, Prosthetic, and Surgical Appliances and Supplies Mfg. - FDA Class 1',
  },
  {
    sicCode: 3842,
    riskCode: 2,
    description:
      '3842 2 Orthopedic, Prosthetic, and Surgical Appliances and Supplies Mfg. - FDA Class 2',
  },
  {
    sicCode: 3842,
    riskCode: 3,
    description:
      '3842 3 Orthopedic, Prosthetic, and Surgical Appliances and Supplies Mfg. - FDA Class 3',
  },
  {
    sicCode: 3842,
    riskCode: 99,
    description:
      '3842 99 Orthopedic, Prosthetic, and Surgical Appliances and Supplies Mfg. No FDA Classification',
  },
  {
    sicCode: 3843,
    riskCode: 1,
    description: '3843 1 Dental Equipment and Supplies Mfg - No FDA Class',
  },
  {
    sicCode: 3843,
    riskCode: 2,
    description: '3843 2 Dental Equipment and Supplies Mfg - FDA Class 1',
  },
  {
    sicCode: 3843,
    riskCode: 3,
    description: '3843 3 Dental Equipment and Supplies Mfg - FDA Class 2',
  },
  {
    sicCode: 3843,
    riskCode: 4,
    description: '3843 4 Dental Equipment and Supplies Mfg - FDA Class 3',
  },
  {
    sicCode: 3844,
    riskCode: 1,
    description:
      '3844 1 X-Ray Apparatus and Tubes and Related Irradiation Apparatus Mfg. - FDA Class 1',
  },
  {
    sicCode: 3844,
    riskCode: 2,
    description:
      '3844 2 X-Ray Apparatus and Tubes and Related Irradiation Apparatus Mfg. - FDA Class 2',
  },
  {
    sicCode: 3844,
    riskCode: 3,
    description:
      '3844 3 X-Ray Apparatus and Tubes and Related Irradiation Apparatus Mfg. - FDA Class 3',
  },
  {
    sicCode: 3845,
    riskCode: 1,
    description:
      '3845 1 Electromedical and Electrotherapeutic Apparatus Mfg. - FDA Class 1',
  },
  {
    sicCode: 3845,
    riskCode: 2,
    description:
      '3845 2 Electromedical and Electrotherapeutic Apparatus Mfg. - FDA Class 2',
  },
  {
    sicCode: 3845,
    riskCode: 3,
    description:
      '3845 3 Electromedical and Electrotherapeutic Apparatus Mfg. - FDA Class 3',
  },
  {
    sicCode: 3851,
    riskCode: 1,
    description: '3851 1 Ophthalmic Goods Mfg. - FDA Class 1',
  },
  {
    sicCode: 3851,
    riskCode: 2,
    description: '3851 2 Ophthalmic Goods Mfg. - FDA Class 2',
  },
  {
    sicCode: 3851,
    riskCode: 3,
    description: '3851 3 Ophthalmic Goods Mfg. - FDA Class 3',
  },
  {
    sicCode: 3851,
    riskCode: 99,
    description: '3851 99 Ophthalmic Goods Mfg. No FDA Classification',
  },
  {
    sicCode: 3861,
    riskCode: 1,
    description: '3861 1 Photographic Equipment Mfg',
  },
  {
    sicCode: 3861,
    riskCode: 2,
    description: '3861 2 Photographic Supplies Mfg.',
  },
  {
    sicCode: 3873,
    riskCode: 1,
    description: '3873 1 Clock and Clockworks Mfg.',
  },
  {
    sicCode: 3873,
    riskCode: 2,
    description: '3873 2 Watch or Watch Case Mfg.',
  },
  {
    sicCode: 3911,
    riskCode: 1,
    description: '3911 1 Jewelry, Precious Metal Mfg',
  },
  {
    sicCode: 3914,
    riskCode: 1,
    description: '3914 1 Silverware, Plated Ware, and Stainless Steel Ware Mfg',
  },
  {
    sicCode: 3915,
    riskCode: 1,
    description: '3915 1 Diamond Manufacturing - Industrial',
  },
  {
    sicCode: 3915,
    riskCode: 2,
    description: '3915 2 Gemstone Cutting or Polishing',
  },
  {
    sicCode: 3915,
    riskCode: 3,
    description:
      "3915 3 Jewelers' Findings and Materials, and Lapidary Work, NEC",
  },
  {
    sicCode: 3931,
    riskCode: 1,
    description: '3931 1 Musical Instruments Mfg',
  },
  {
    sicCode: 3942,
    riskCode: 1,
    description: '3942 1 Dolls and Stuffed Toys Mfg',
  },
  {
    sicCode: 3944,
    riskCode: 1,
    description: '3944 1 Electronic Games Mfg',
  },
  {
    sicCode: 3944,
    riskCode: 2,
    description: '3944 2 Toys or Games Mfg (no dolls)',
  },
  {
    sicCode: 3949,
    riskCode: 2,
    description: '3949 2 Billiard or Pool Table Mfg.',
  },
  {
    sicCode: 3949,
    riskCode: 3,
    description: '3949 3 Exercise or Playground Equipment Mfg.',
  },
  {
    sicCode: 3949,
    riskCode: 4,
    description: '3949 4 Sporting Goods or Athletic Equipment Mfg.',
  },
  {
    sicCode: 3949,
    riskCode: 5,
    description: '3949 5 Swimming Pools or Accessories Mfg.',
  },
  {
    sicCode: 3951,
    riskCode: 1,
    description: '3951 1 Pens, Mechanical Pencils, and Parts Mfg',
  },
  {
    sicCode: 3952,
    riskCode: 1,
    description:
      "3952 1 Lead Pencils, Crayons, and Artist's Materials Mfg, NEC",
  },
  {
    sicCode: 3952,
    riskCode: 2,
    description: '3952 2 Pencil, Pen, Crayon or Chalk Mfg.',
  },
  {
    sicCode: 3953,
    riskCode: 1,
    description: '3953 1 Marking Devices Mfg',
  },
  {
    sicCode: 3955,
    riskCode: 1,
    description: '3955 1 Carbon Paper or Inked Ribbon Mfg.',
  },
  {
    sicCode: 3961,
    riskCode: 1,
    description:
      '3961 1 Costume Jewelry and Costume Novelties Mfg, Except Precious Metals',
  },
  {
    sicCode: 3965,
    riskCode: 1,
    description: '3965 1 Buttons or Fasteners Mfg.',
  },
  {
    sicCode: 3965,
    riskCode: 2,
    description: '3965 2 Needles, Pins or tacks Mfg.',
  },
  {
    sicCode: 3991,
    riskCode: 1,
    description: '3991 1 Brush or Broom Mfg.',
  },
  {
    sicCode: 3993,
    riskCode: 1,
    description: '3993 1 Signs and Advertising Specialties Mfg',
  },
  {
    sicCode: 3995,
    riskCode: 1,
    description: '3995 1 Burial caskets Mfg - wood',
  },
  {
    sicCode: 3995,
    riskCode: 2,
    description: '3995 2 Burial caskets Mfg, NEC',
  },
  {
    sicCode: 3996,
    riskCode: 1,
    description:
      '3996 1 Linoleum, Asphalted-Felt-Base, and Other Hard Surface Floor Coverings Mfg, NEC',
  },
  {
    sicCode: 3999,
    riskCode: 1,
    description: '3999 1 Manufacturing Industries, NEC',
  },
  {
    sicCode: 3999,
    riskCode: 2,
    description: '3999 2 Candle Mfg.',
  },
  {
    sicCode: 3999,
    riskCode: 3,
    description: '3999 3 Fire Extinguishers Mfg.',
  },
  {
    sicCode: 3999,
    riskCode: 4,
    description: '3999 4 Wigs or Hair Pieces Mfg',
  },
  {
    sicCode: 3999,
    riskCode: 5,
    description: '3999 5 Lamp Shade Mfg.',
  },
  {
    sicCode: 3999,
    riskCode: 6,
    description: '3999 6 Match Mfg',
  },
  {
    sicCode: 3999,
    riskCode: 7,
    description: '3999 7 Pipes Mfg.--tobacco',
  },
  {
    sicCode: 3999,
    riskCode: 8,
    description: '3999 8 Umbrella or Cane Mfg',
  },
  {
    sicCode: 3999,
    riskCode: 9,
    description: '3999 9 E&S Group only - Remediation Equipment',
  },
  {
    sicCode: 3999,
    riskCode: 41,
    description:
      "3999 41 OBSP Specific - Manufacturing Industries, NEC - Lessor's Risk",
  },
  {
    sicCode: 4011,
    riskCode: 1,
    description: '4011 1 Railroads, Line-haul Operating',
  },
  {
    sicCode: 4013,
    riskCode: 1,
    description: '4013 1 Railroad Switching and Terminal Establishments',
  },
  {
    sicCode: 4111,
    riskCode: 1,
    description: '4111 1 Local and Suburban Transit',
  },
  {
    sicCode: 4119,
    riskCode: 1,
    description: '4119 1 Local Passenger Transportation, NEC',
  },
  {
    sicCode: 4119,
    riskCode: 2,
    description:
      '4119 2 Ambulance Service, First Aid or Rescue Squads-- Not For Profit Only-',
  },
  {
    sicCode: 4119,
    riskCode: 3,
    description:
      '4119 3 Ambulance Service, First Aid or Rescue Squads-- Other than Not For Profit-',
  },
  {
    sicCode: 4119,
    riskCode: 4,
    description: '4119 4 OBGR Only - Ambulance Services - PE - Volunteer',
  },
  {
    sicCode: 4119,
    riskCode: 5,
    description: '4119 5 OBGR Only - Ambulance Services - PE - Professional',
  },
  {
    sicCode: 4119,
    riskCode: 6,
    description: '4119 6 OBGR Only - Ambulance Services - NFP - Volunteer',
  },
  {
    sicCode: 4119,
    riskCode: 7,
    description: '4119 7 OBGR Only - Ambulance Services - NFP - Professional ',
  },
  {
    sicCode: 4121,
    riskCode: 1,
    description: '4121 1 Taxicab Companies',
  },
  {
    sicCode: 4131,
    riskCode: 1,
    description: '4131 1 Intercity and Rural Bus Transportation',
  },
  {
    sicCode: 4141,
    riskCode: 1,
    description: '4141 1 Local Bus Charter Service',
  },
  {
    sicCode: 4142,
    riskCode: 1,
    description: '4142 1 Bus Charter Service, Except Local',
  },
  {
    sicCode: 4151,
    riskCode: 1,
    description: '4151 1 School Bus Operations',
  },
  {
    sicCode: 4173,
    riskCode: 1,
    description: '4173 1 Bus Companies - Public & Charter',
  },
  {
    sicCode: 4173,
    riskCode: 2,
    description: '4173 2 Bus Stations or Terminals',
  },
  {
    sicCode: 4212,
    riskCode: 1,
    description: '4212 1 Garbage, Ash or Refuse Collecting',
  },
  {
    sicCode: 4212,
    riskCode: 2,
    description: '4212 2 Logging - Log Trucking',
  },
  {
    sicCode: 4212,
    riskCode: 3,
    description: '4212 3 Local Trucking without Storage, NEC',
  },
  {
    sicCode: 4213,
    riskCode: 1,
    description:
      '4213 1 Truckers - Intermediate (classify warehouses separately',
  },
  {
    sicCode: 4213,
    riskCode: 2,
    description:
      '4213 2 Truckers - Local including courier and delivery services (classify warehouses separately)',
  },
  {
    sicCode: 4213,
    riskCode: 3,
    description: '4213 3 Truckers - Long Haul (classify warehouses separately)',
  },
  {
    sicCode: 4213,
    riskCode: 4,
    description: '4213 4 Trucking, Except Local, NEC',
  },
  {
    sicCode: 4213,
    riskCode: 5,
    description: '4213 5 Energy Program Only - Trucking, Except Local, NEC',
  },
  {
    sicCode: 4214,
    riskCode: 1,
    description: '4214 1 Local Trucking with Storage',
  },
  {
    sicCode: 4215,
    riskCode: 1,
    description: '4215 1 Courier Services Except by Air',
  },
  {
    sicCode: 4215,
    riskCode: 2,
    description: '4215 2 For KBS International Only - Couriers',
  },
  {
    sicCode: 4221,
    riskCode: 1,
    description:
      '4221 1 Farm Product Warehousing and Storage for Cotton Compression',
  },
  {
    sicCode: 4221,
    riskCode: 2,
    description: '4221 2 Farm Product Warehousing and Storage, NEC',
  },
  {
    sicCode: 4221,
    riskCode: 3,
    description: '4221 3 Tobacco Re-handling or Warehousing',
  },
  {
    sicCode: 4222,
    riskCode: 1,
    description: '4222 1 Warehouse--cold individual storage lockers',
  },
  {
    sicCode: 4222,
    riskCode: 2,
    description: '4222 2 Warehouse--cold storage--public',
  },
  {
    sicCode: 4225,
    riskCode: 1,
    description: '4225 1 General Warehousing and Storage, NEC',
  },
  {
    sicCode: 4225,
    riskCode: 2,
    description: '4225 2 Warehouses--mini-warehouses',
  },
  {
    sicCode: 4225,
    riskCode: 3,
    description: '4225 3 E&S Group only - Warehouse',
  },
  {
    sicCode: 4226,
    riskCode: 1,
    description:
      '4226 1 Contractors Permanent Yards-- maintenance or storage of equipment or material',
  },
  {
    sicCode: 4226,
    riskCode: 2,
    description: '4226 2 Warehouse - Tires',
  },
  {
    sicCode: 4226,
    riskCode: 3,
    description:
      "4226 3 Warehouses - occupied by multiple interests (lessor's risk only)",
  },
  {
    sicCode: 4226,
    riskCode: 4,
    description:
      "4226 4 Warehouses - occupied by single interest (lessor's risk only)",
  },
  {
    sicCode: 4226,
    riskCode: 5,
    description: '4226 5 Warehouses--private- Not For Profit only',
  },
  {
    sicCode: 4226,
    riskCode: 6,
    description: '4226 6 Warehouses--private- Other than Not For Profit',
  },
  {
    sicCode: 4226,
    riskCode: 7,
    description: '4226 7 Special Warehousing and Storage, NEC',
  },
  {
    sicCode: 4226,
    riskCode: 8,
    description: '4226 8 Media Storage Center',
  },
  {
    sicCode: 4231,
    riskCode: 1,
    description:
      '4231 1 Terminal and Joint Terminal Maintenance Facilities for Motor Freight Transportation',
  },
  {
    sicCode: 4311,
    riskCode: 1,
    description: '4311 1 United States Postal Service',
  },
  {
    sicCode: 4412,
    riskCode: 1,
    description: '4412 1 Deep Sea Foreign Transportation of  Freight',
  },
  {
    sicCode: 4424,
    riskCode: 1,
    description: '4424 1 Deep Sea Domestic Transportation of Freight',
  },
  {
    sicCode: 4432,
    riskCode: 1,
    description:
      '4432 1 Freight Transportation on the Great Lakes - St. Lawrence Seaway',
  },
  {
    sicCode: 4449,
    riskCode: 1,
    description: '4449 1 Water Transportation of Freight, NEC',
  },
  {
    sicCode: 4481,
    riskCode: 1,
    description:
      '4481 1 Deep Sea Transportation of Passengers, Cruise Ships, Except by Ferry',
  },
  {
    sicCode: 4482,
    riskCode: 1,
    description: '4482 1 Ferries',
  },
  {
    sicCode: 4489,
    riskCode: 1,
    description: '4489 1 Water Transportation of Passengers, NEC',
  },
  {
    sicCode: 4491,
    riskCode: 1,
    description: '4491 1 Dock Operations--coal, grain, or ore',
  },
  {
    sicCode: 4491,
    riskCode: 2,
    description: '4491 2 Stevedoring',
  },
  {
    sicCode: 4491,
    riskCode: 3,
    description:
      '4491 3 Stevedoring--by hand or by means of hand trucks exclusively--no hoisting of cargo',
  },
  {
    sicCode: 4491,
    riskCode: 4,
    description:
      '4491 4 Stevedoring--handling explosives or ammunition--under contract',
  },
  {
    sicCode: 4491,
    riskCode: 5,
    description:
      '4491 5 Stevedoring--tallyers or checking clerks engaged in connection with stevedoring work',
  },
  {
    sicCode: 4491,
    riskCode: 6,
    description:
      '4491 6 Wharf and Waterfront Property - occupied by the insured for both freight and passenger purposes',
  },
  {
    sicCode: 4491,
    riskCode: 7,
    description:
      '4491 7 Wharf and Waterfront Property - occupied by the insured for freight purposes exclusively',
  },
  {
    sicCode: 4491,
    riskCode: 8,
    description: '4491 8 Marine Cargo Handling, NEC',
  },
  {
    sicCode: 4492,
    riskCode: 1,
    description: '4492 1 Towing and Tugboat Services',
  },
  {
    sicCode: 4493,
    riskCode: 1,
    description: '4493 1 Boat Repair and Servicing',
  },
  {
    sicCode: 4493,
    riskCode: 2,
    description: '4493 2 Boat Storage and Moorage',
  },
  {
    sicCode: 4493,
    riskCode: 3,
    description: '4493 3 Boat Yards or Marinas--public',
  },
  {
    sicCode: 4499,
    riskCode: 1,
    description:
      '4499 1 Water Transportation Services -  canoes or rowboats, for rent,  not equipped with motors',
  },
  {
    sicCode: 4499,
    riskCode: 2,
    description:
      '4499 2 Water Transportation Services -  canoes or rowboats, not for rent, not equipped with motors',
  },
  {
    sicCode: 4499,
    riskCode: 3,
    description:
      '4499 3 Water Transportation Services - motor or sail, not for rent',
  },
  {
    sicCode: 4499,
    riskCode: 4,
    description:
      '4499 4 Water Transportation Services - Boats, non-owned over 26 feet',
  },
  {
    sicCode: 4499,
    riskCode: 5,
    description: '4499 5 Water Transportation Services, boats, not for rent',
  },
  {
    sicCode: 4499,
    riskCode: 6,
    description: '4499 6 Water Transportation Services, boats, rent to others',
  },
  {
    sicCode: 4499,
    riskCode: 7,
    description: '4499 7 Water Transportation Services, wrecking marine',
  },
  {
    sicCode: 4499,
    riskCode: 8,
    description: '4499 8 Water Transportation Services, NEC',
  },
  {
    sicCode: 4512,
    riskCode: 1,
    description: '4512 1 Air Transportation, Scheduled',
  },
  {
    sicCode: 4513,
    riskCode: 1,
    description: '4513 1 Air Courier Services',
  },
  {
    sicCode: 4522,
    riskCode: 1,
    description: '4522 1 Air Ambulance Services',
  },
  {
    sicCode: 4522,
    riskCode: 2,
    description: '4522 2 Chartered Freight',
  },
  {
    sicCode: 4522,
    riskCode: 3,
    description: '4522 3 Chartered Passenger',
  },
  {
    sicCode: 4522,
    riskCode: 4,
    description: '4522 4 Scenic and Sightseeing Transportation, Other',
  },
  {
    sicCode: 4522,
    riskCode: 5,
    description: '4522 5 Air Transportation, Nonscheduled, NEC',
  },
  {
    sicCode: 4522,
    riskCode: 6,
    description:
      '4522 6 ABC Program Only-Air Transportation non-Scheduled (including Air Ambulance, Chartered Flights, Scenic & Sightseeing)',
  },
  {
    sicCode: 4581,
    riskCode: 1,
    description:
      '4581 1 Airport Control Towers--not operated exclusively by the Federal Aviation Administration',
  },
  {
    sicCode: 4581,
    riskCode: 3,
    description: '4581 3 Airports--Commercial',
  },
  {
    sicCode: 4581,
    riskCode: 4,
    description: '4581 4 Airports--Private',
  },
  {
    sicCode: 4581,
    riskCode: 5,
    description:
      '4581 5 Airports, Flying Fields, and Airport Terminal Services, NEC',
  },
  {
    sicCode: 4581,
    riskCode: 6,
    description:
      '4581 6 ABC Program Only-Airports, Flying Fields, and Airport Terminal Services (including Hangar Operations, non-Government Control Towers, Private Airports & All Other)',
  },
  {
    sicCode: 4612,
    riskCode: 1,
    description: '4612 1 Crude Petroleum Pipelines',
  },
  {
    sicCode: 4612,
    riskCode: 10,
    description: '4612 10 Energy Program Only - Crude Petroleum Pipelines',
  },
  {
    sicCode: 4613,
    riskCode: 1,
    description: '4613 1 Refined Petroleum Pipelines',
  },
  {
    sicCode: 4613,
    riskCode: 10,
    description: '4613 10 Energy Program Only - Refined Petroleum Pipelines',
  },
  {
    sicCode: 4619,
    riskCode: 1,
    description: '4619 1 Pipelines, NEC',
  },
  {
    sicCode: 4619,
    riskCode: 2,
    description: '4619 2 Pipelines--operation, slurry--non-flammable mixtures',
  },
  {
    sicCode: 4619,
    riskCode: 3,
    description: '4619 3 E&S Group only - Pipelines',
  },
  {
    sicCode: 4619,
    riskCode: 10,
    description: '4619 10 Energy Program Only - Coal Pipelines',
  },
  {
    sicCode: 4619,
    riskCode: 20,
    description: '4619 20 Energy Program Only - Slurry Pipelines',
  },
  {
    sicCode: 4619,
    riskCode: 30,
    description: '4619 30 Energy Program Only - Pipelines NEC',
  },
  {
    sicCode: 4724,
    riskCode: 1,
    description: '4724 1 Travel Agencies',
  },
  {
    sicCode: 4725,
    riskCode: 1,
    description: '4725 1 Tour Operators',
  },
  {
    sicCode: 4729,
    riskCode: 1,
    description: '4729 1 Arrangement of Passenger Transportation, NEC',
  },
  {
    sicCode: 4731,
    riskCode: 1,
    description:
      '4731 1 Freight Forwarders or Handlers --other than packing, handling or shipping explosives or ammunition under contract',
  },
  {
    sicCode: 4731,
    riskCode: 2,
    description:
      '4731 2 Freight Forwarders or Handlers --packing, handling or shipping explosives or ammunition under contract',
  },
  {
    sicCode: 4741,
    riskCode: 1,
    description: '4741 1 Rental of Railroad Cars',
  },
  {
    sicCode: 4783,
    riskCode: 1,
    description: '4783 1 Packing and Crating',
  },
  {
    sicCode: 4785,
    riskCode: 1,
    description: '4785 1 Drawbridges--existence hazard only',
  },
  {
    sicCode: 4785,
    riskCode: 2,
    description: '4785 2 Scale Houses',
  },
  {
    sicCode: 4785,
    riskCode: 3,
    description:
      '4785 3 Streets, Roads, Highways or Bridges--existence and maintenance hazard only',
  },
  {
    sicCode: 4785,
    riskCode: 4,
    description: '4785 4 Toll Bridges',
  },
  {
    sicCode: 4785,
    riskCode: 5,
    description:
      '4785 5 Weighers, Samplers or Inspectors of Merchandise--on vessels or docks or at railway stations or warehouses',
  },
  {
    sicCode: 4785,
    riskCode: 6,
    description:
      '4785 6 Fixed Facilities and Inspection and Weighing Services for Motor Vehicle Transportation, NEC',
  },
  {
    sicCode: 4789,
    riskCode: 1,
    description: '4789 1 Transportation Services, NEC',
  },
  {
    sicCode: 4812,
    riskCode: 1,
    description: '4812 1 Cellular Telephone Carriers',
  },
  {
    sicCode: 4813,
    riskCode: 1,
    description: '4813 1 Satellite Telecommunications',
  },
  {
    sicCode: 4813,
    riskCode: 2,
    description: '4813 2 Telecommunication Equipment Providers',
  },
  {
    sicCode: 4813,
    riskCode: 3,
    description: '4813 3 Telecommunication Service Providers',
  },
  {
    sicCode: 4813,
    riskCode: 4,
    description: '4813 4 Telecommunications Resellers',
  },
  {
    sicCode: 4813,
    riskCode: 5,
    description: '4813 5 Telephone Communications, Except Radiotelephone, NEC',
  },
  {
    sicCode: 4822,
    riskCode: 1,
    description: '4822 1 Telegraph and Other Message Communications',
  },
  {
    sicCode: 4832,
    riskCode: 1,
    description: '4832 1 Radio Broadcasting Stations - No Cable Laying',
  },
  {
    sicCode: 4833,
    riskCode: 1,
    description:
      '4833 1 Television Broadcasting Stations/Cable - No Cable Laying',
  },
  {
    sicCode: 4833,
    riskCode: 2,
    description:
      '4833 2 Television Broadcasting Stations - Other than Not for Profit',
  },
  {
    sicCode: 4841,
    riskCode: 1,
    description:
      '4841 1 Cable Television System Operations - We are not to insure any Cable laying operations.',
  },
  {
    sicCode: 4899,
    riskCode: 1,
    description: '4899 1 Communications Services, NEC',
  },
  {
    sicCode: 4911,
    riskCode: 1,
    description: '4911 1 Electric Light or Power Companies',
  },
  {
    sicCode: 4911,
    riskCode: 2,
    description:
      '4911 2 Electric Light or Power Cooperatives--rural electrification administration projects only',
  },
  {
    sicCode: 4911,
    riskCode: 10,
    description: '4911 10 Energy Program Only - Hydroelectric Facilities',
  },
  {
    sicCode: 4911,
    riskCode: 20,
    description: '4911 20 Energy Program Only - Fossil Fuel Facilities',
  },
  {
    sicCode: 4911,
    riskCode: 25,
    description: '4911 25 Energy Program Only - Combustion Turbines',
  },
  {
    sicCode: 4911,
    riskCode: 29,
    description: '4911 29 Energy Program Only - Mixed Fossil Fuel Facilities',
  },
  {
    sicCode: 4911,
    riskCode: 30,
    description: '4911 30 Energy Program Only - Waste to Energy Facilities',
  },
  {
    sicCode: 4911,
    riskCode: 40,
    description: '4911 40 Energy Program Only - Geothermal Facilities',
  },
  {
    sicCode: 4911,
    riskCode: 50,
    description: '4911 50 Energy Program Only - Solar Facilities',
  },
  {
    sicCode: 4911,
    riskCode: 60,
    description: '4911 60 Energy Program Only - Wind Facilities',
  },
  {
    sicCode: 4911,
    riskCode: 70,
    description: '4911 70 Energy Program Only - Electric Services',
  },
  {
    sicCode: 4911,
    riskCode: 80,
    description: '4911 80 Energy Program Only - Fuel Cell Generator',
  },
  {
    sicCode: 4922,
    riskCode: 1,
    description: '4922 1 Natural Gas Transmission',
  },
  {
    sicCode: 4922,
    riskCode: 10,
    description: '4922 10 Energy Program Only - Natural Gas Transmission',
  },
  {
    sicCode: 4922,
    riskCode: 50,
    description:
      '4922 50 Energy Program Only - Underground Storage Caverns - Depleted Reservoirs',
  },
  {
    sicCode: 4922,
    riskCode: 60,
    description:
      '4922 60 Energy Program Only - Underground Storage Caverns - Salt Domes',
  },
  {
    sicCode: 4923,
    riskCode: 1,
    description: '4923 1 Natural Gas Transmission and Distribution',
  },
  {
    sicCode: 4923,
    riskCode: 10,
    description:
      '4923 10 Energy Program Only - Natural Gas Transmission and Distribution',
  },
  {
    sicCode: 4924,
    riskCode: 1,
    description: '4924 1 Natural Gas Distribution',
  },
  {
    sicCode: 4924,
    riskCode: 10,
    description: '4924 10 Energy Program Only - Natural Gas Distribution',
  },
  {
    sicCode: 4925,
    riskCode: 1,
    description:
      '4925 1 Mixed, Manufactured, or Liquefied Petroleum Gas Production and/or Distribution',
  },
  {
    sicCode: 4931,
    riskCode: 1,
    description: '4931 1 Electric and Other Services Combined',
  },
  {
    sicCode: 4932,
    riskCode: 1,
    description: '4932 1 Gas and Other Services Combined',
  },
  {
    sicCode: 4939,
    riskCode: 1,
    description: '4939 1 Combination Utilities, NEC',
  },
  {
    sicCode: 4939,
    riskCode: 10,
    description: '4939 10 Energy Program Only - Combination Utilities NEC',
  },
  {
    sicCode: 4941,
    riskCode: 1,
    description: '4941 1 Dam, Levee or Dike--existence hazard only',
  },
  {
    sicCode: 4941,
    riskCode: 2,
    description: '4941 2 Water Supply, NEC',
  },
  {
    sicCode: 4941,
    riskCode: 3,
    description: '4941 3 Lakes or Reservoirs--existence hazard only',
  },
  {
    sicCode: 4941,
    riskCode: 4,
    description: '4941 4 Water Treatment Plants',
  },
  {
    sicCode: 4952,
    riskCode: 1,
    description: '4952 1 Sewage Disposal--Plant operations',
  },
  {
    sicCode: 4952,
    riskCode: 2,
    description: '4952 2 Sewage Treatment Facilities',
  },
  {
    sicCode: 4952,
    riskCode: 3,
    description: '4952 3 E&S Group only - Water/Wastewater Treatment',
  },
  {
    sicCode: 4952,
    riskCode: 4,
    description: '4952 4 E&S Group only - Water/Wastewater Treatment',
  },
  {
    sicCode: 4952,
    riskCode: 5,
    description: '4952 5 E&S Group only - Recycling and Transfer Station',
  },
  {
    sicCode: 4952,
    riskCode: 6,
    description:
      '4952 6 E&S Group only - Water/Wastewater Treatment - Public Entity',
  },
  {
    sicCode: 4952,
    riskCode: 7,
    description:
      '4952 7 E&S Group only - Stormwater (Contracting and Consulting)',
  },
  {
    sicCode: 4952,
    riskCode: 8,
    description: '4952 8 E&S Group only - Port-a-Pot',
  },
  {
    sicCode: 4953,
    riskCode: 1,
    description: '4953 1 Garbage or Refuse Dumps',
  },
  {
    sicCode: 4953,
    riskCode: 2,
    description:
      '4953 2 Garbage Works-- separation for recycling, reduction or incineration',
  },
  {
    sicCode: 4953,
    riskCode: 3,
    description: '4953 3 Refuse Systems, NEC',
  },
  {
    sicCode: 4953,
    riskCode: 4,
    description: '4953 4 Street Cleaning',
  },
  {
    sicCode: 4953,
    riskCode: 5,
    description: '4953 5 Waste-to-Energy Projects',
  },
  {
    sicCode: 4953,
    riskCode: 6,
    description: '4953 6 E&S Group Only - Landfill Construction',
  },
  {
    sicCode: 4953,
    riskCode: 7,
    description: '4953 7 E&S Group Only - Medical Waste',
  },
  {
    sicCode: 4953,
    riskCode: 8,
    description:
      '4953 8 E&S Group Only - Recycling, Landfill, Transfer Station',
  },
  {
    sicCode: 4953,
    riskCode: 9,
    description: '4953 9 E&S Group Only - Waste Transportation',
  },
  {
    sicCode: 4953,
    riskCode: 10,
    description: '4953 10 E&S Group Only - Landfill',
  },
  {
    sicCode: 4953,
    riskCode: 11,
    description: '4953 11 E&S Group Only - Recycling and Transfer Station',
  },
  {
    sicCode: 4953,
    riskCode: 12,
    description: '4953 12 E&S Group Only - Waste Disposal Facility',
  },
  {
    sicCode: 4953,
    riskCode: 13,
    description: '4953 13 E&S Group Only - Landfill - Public Entity',
  },
  {
    sicCode: 4953,
    riskCode: 14,
    description:
      '4953 14 E&S Group Only - Crime Scene/Biohazard/Hoarding Cleanup',
  },
  {
    sicCode: 4953,
    riskCode: 15,
    description: '4953 15 E&S Group Only - eWaste Recycling',
  },
  {
    sicCode: 4959,
    riskCode: 1,
    description: '4959 1 Snow and Ice Removal--contractor',
  },
  {
    sicCode: 4959,
    riskCode: 2,
    description: '4959 2 Sanitary Services, NEC',
  },
  {
    sicCode: 4961,
    riskCode: 1,
    description: '4961 1 Steam Heating or Steam Power Companies',
  },
  {
    sicCode: 4971,
    riskCode: 1,
    description: '4971 1 Irrigation Works Operations',
  },
  {
    sicCode: 5012,
    riskCode: 1,
    description: '5012 1 Automobiles and Other Motor Vehicles, Wholesale',
  },
  {
    sicCode: 5012,
    riskCode: 2,
    description: '5012 2 E&S Group Only - Auto Sales and Service',
  },
  {
    sicCode: 5013,
    riskCode: 1,
    description: '5013 1 Automobile Parts and Supplies Distributors, Wholesale',
  },
  {
    sicCode: 5013,
    riskCode: 2,
    description: '5013 2 Automobile Parts and Supplies Stores, Wholesale',
  },
  {
    sicCode: 5014,
    riskCode: 1,
    description: '5014 1 Tires and Tubes, Wholesale',
  },
  {
    sicCode: 5015,
    riskCode: 1,
    description: '5015 1 Automobile and Truck Dismantlers, Wholesale',
  },
  {
    sicCode: 5015,
    riskCode: 2,
    description: '5015 2 Motor Vehicle Parts, Wholesale, Used, NEC',
  },
  {
    sicCode: 5021,
    riskCode: 1,
    description: '5021 1 Furniture, Wholesale',
  },
  {
    sicCode: 5021,
    riskCode: 2,
    description: '5021 2 Juvenile Furniture, Wholesale',
  },
  {
    sicCode: 5023,
    riskCode: 1,
    description: '5023 1 Home Furnishings, Wholesale',
  },
  {
    sicCode: 5023,
    riskCode: 2,
    description: '5023 2 Oriental Rugs, Wholesale',
  },
  {
    sicCode: 5031,
    riskCode: 1,
    description: '5031 1 Lumber, Plywood, Millwork, and Wood Panels, Wholesale',
  },
  {
    sicCode: 5032,
    riskCode: 1,
    description:
      '5032 1 Brick, Stone and Related Construction Materials, Wholesale',
  },
  {
    sicCode: 5033,
    riskCode: 1,
    description: '5033 1 Roofing, Siding, and Insulation Materials, Wholesale',
  },
  {
    sicCode: 5039,
    riskCode: 1,
    description: '5039 1 Construction Materials, Wholesale, NEC',
  },
  {
    sicCode: 5043,
    riskCode: 1,
    description: '5043 1 Photographic Equipment and Supplies, Wholesale',
  },
  {
    sicCode: 5044,
    riskCode: 1,
    description: '5044 1 Office Machines or Appliances, wholesale--no repair',
  },
  {
    sicCode: 5044,
    riskCode: 2,
    description: '5044 2 Office Machines or Appliances, wholesale--with repair',
  },
  {
    sicCode: 5045,
    riskCode: 1,
    description:
      '5045 1 Computers and Computer Peripheral Equipment and Software, Wholesale',
  },
  {
    sicCode: 5046,
    riskCode: 1,
    description: '5046 1 Commercial Equipment, Wholesale, NEC',
  },
  {
    sicCode: 5046,
    riskCode: 2,
    description: '5046 2 Bar and Restaurant Suppliers, Wholesale',
  },
  {
    sicCode: 5047,
    riskCode: 99,
    description:
      '5047 99 Medical, Hospital and Surgical Supply Wholesale Distributors *Refer to FDA Products Classification.',
  },
  {
    sicCode: 5048,
    riskCode: 99,
    description:
      '5048 99 Optical/Ophthalmic Goods, Wholesale Distributors. * Refer to FDA Products Classification.',
  },
  {
    sicCode: 5049,
    riskCode: 1,
    description: '5049 1 Professional Equipment and Supplies, Wholesale, NEC',
  },
  {
    sicCode: 5049,
    riskCode: 2,
    description: '5049 2 Machinery, Equipment, And Supplies',
  },
  {
    sicCode: 5051,
    riskCode: 1,
    description:
      '5051 1 Metal Dealers or Distributors, Wholesale--non-structural',
  },
  {
    sicCode: 5051,
    riskCode: 2,
    description: '5051 2 Metal Dealers or Distributors, Wholesale--structural',
  },
  {
    sicCode: 5052,
    riskCode: 1,
    description: '5052 1 Coal and Other Minerals and Ores, Wholesale',
  },
  {
    sicCode: 5063,
    riskCode: 1,
    description: '5063 1 Electrical Equipment Distributors, Wholesale',
  },
  {
    sicCode: 5064,
    riskCode: 1,
    description:
      '5064 1 Electrical Appliances, Television and Radio Sets, Wholesale',
  },
  {
    sicCode: 5065,
    riskCode: 1,
    description: '5065 1 Electronic Parts and Equipment, Wholesale, NEC',
  },
  {
    sicCode: 5072,
    riskCode: 1,
    description: '5072 1 Hardware Wholesale',
  },
  {
    sicCode: 5074,
    riskCode: 1,
    description:
      '5074 1 Plumbing and Heating Equipment and Supplies (Hydronics), Wholesale, NEC',
  },
  {
    sicCode: 5074,
    riskCode: 2,
    description:
      '5074 2 Plumbing Supplies and Fixtures Dealers and Distributors, Wholesale',
  },
  {
    sicCode: 5075,
    riskCode: 1,
    description:
      '5075 1 Air Conditioning Equipment-- dealers or distributors only, Wholesale',
  },
  {
    sicCode: 5075,
    riskCode: 2,
    description:
      '5075 2 Heating or Combined Heating and Air Conditioning Systems or Equipment--dealers or distributors only, Wholesale',
  },
  {
    sicCode: 5078,
    riskCode: 1,
    description: '5078 1 Refrigeration Equipment and Supplies, NEC, Wholesale',
  },
  {
    sicCode: 5078,
    riskCode: 2,
    description:
      '5078 2 Refrigeration Equipment-- Dealers and Distributors only--commercial, Wholesale',
  },
  {
    sicCode: 5082,
    riskCode: 1,
    description:
      '5082 1 Contractors Equipment Dealers--ladders, excluding hoists, scaffolds or towers, Wholesale',
  },
  {
    sicCode: 5082,
    riskCode: 2,
    description:
      '5082 2 Contractors Equipment Dealers--ladders, hoists, scaffolds or towers, Wholesale',
  },
  {
    sicCode: 5082,
    riskCode: 3,
    description:
      '5082 3 Construction and Mining (Except Petroleum) Machinery and Equipment, NEC, Wholesale',
  },
  {
    sicCode: 5083,
    riskCode: 1,
    description:
      '5083 1 Machinery or Equipment Dealers--construction or industrial--farm type, Wholesale',
  },
  {
    sicCode: 5083,
    riskCode: 2,
    description:
      '5083 2 Machinery or Equipment Dealers--construction or industrial--yard of garden type, Wholesale',
  },
  {
    sicCode: 5084,
    riskCode: 1,
    description: '5084 1 Machinery or Equipment Dealers, Wholesale',
  },
  {
    sicCode: 5084,
    riskCode: 2,
    description:
      '5084 2 Machinery or Equipment Dealers--construction or industrial--mobile type, Wholesale',
  },
  {
    sicCode: 5084,
    riskCode: 3,
    description:
      '5084 3 Oil or Gas Well Supplies or Equipment Dealers--secondhand, Wholesale',
  },
  {
    sicCode: 5084,
    riskCode: 4,
    description:
      '5084 4 Printers or Electrotypers Supplies--distributors, Wholesale',
  },
  {
    sicCode: 5085,
    riskCode: 1,
    description: '5085 1 Industrial Supplies, Wholesale',
  },
  {
    sicCode: 5087,
    riskCode: 1,
    description:
      '5087 1 Service Establishment Equipment and Supplies, NEC, Wholesale',
  },
  {
    sicCode: 5087,
    riskCode: 2,
    description:
      '5087 2 Barber or Beauty Shop Supplies Distributors, Wholesale',
  },
  {
    sicCode: 5087,
    riskCode: 3,
    description:
      '5087 3 Janitorial Supplies--dealers or distributors, Wholesale',
  },
  {
    sicCode: 5088,
    riskCode: 1,
    description:
      '5088 1 Transportation Equipment and Supplies, Except Motor Vehicles, NEC, Wholesale',
  },
  {
    sicCode: 5088,
    riskCode: 2,
    description: '5088 2 Ship Chandler Stores, Wholesale',
  },
  {
    sicCode: 5088,
    riskCode: 3,
    description: '5088 3 ABC Program Only-Wholesale Aircraft or Parts Dealers',
  },
  {
    sicCode: 5091,
    riskCode: 1,
    description:
      '5091 1 Sporting Goods or Athletic Equipment Distributors, NEC, Wholesale',
  },
  {
    sicCode: 5091,
    riskCode: 2,
    description:
      '5091 2 Sporting Goods or Athletic Equipment Distributors with sales of weapons and accessories less than 10 % of total receipts, Wholesale',
  },
  {
    sicCode: 5091,
    riskCode: 3,
    description:
      '5091 3 Sporting Goods or Athletic Equipment Distributors with sales of weapons, alterations, and/or accessories 10% or more of total receipts, Wholesale',
  },
  {
    sicCode: 5092,
    riskCode: 1,
    description:
      '5092 1 Toy Distributors with foreign products or without appropriate risk transfers, Wholesale',
  },
  {
    sicCode: 5092,
    riskCode: 2,
    description:
      '5092 2 Toy Distributors without foreign products and with appropriate risk transfers, Wholesale',
  },
  {
    sicCode: 5093,
    riskCode: 1,
    description: '5093 1 Automobile Dismantling - Wholesale',
  },
  {
    sicCode: 5093,
    riskCode: 2,
    description: '5093 2 Junk Dealers, Wholesale',
  },
  {
    sicCode: 5093,
    riskCode: 3,
    description: '5093 3 Metal Scrap Dealers, Wholesale',
  },
  {
    sicCode: 5093,
    riskCode: 4,
    description:
      '5093 4 Paper, Rag or Rubber Stock Dealers and Distributors--secondhand, Wholesale',
  },
  {
    sicCode: 5093,
    riskCode: 5,
    description: '5093 5 Waste and Reclaimed Materials, Wholesale',
  },
  {
    sicCode: 5093,
    riskCode: 6,
    description: '5093 6 Scrap and Waste Materials, NEC, Wholesale',
  },
  {
    sicCode: 5094,
    riskCode: 1,
    description:
      '5094 1 Jewelry, Watches, Precious Stones, and Precious Metals, NEC, Wholesale',
  },
  {
    sicCode: 5094,
    riskCode: 2,
    description: '5094 2 Coin Dealers, Wholesale',
  },
  {
    sicCode: 5094,
    riskCode: 3,
    description: '5094 3 Jewelry Distributors, Wholesale',
  },
  {
    sicCode: 5099,
    riskCode: 1,
    description: '5099 1 Durable Goods, NEC, Wholesale',
  },
  {
    sicCode: 5099,
    riskCode: 2,
    description:
      '5099 2 Fire Protection Equipment Dealers and Distributors, Wholesale',
  },
  {
    sicCode: 5099,
    riskCode: 41,
    description: '5099 41 OBSP Specific - Durable Goods, Medium Hazard NEC',
  },
  {
    sicCode: 5099,
    riskCode: 42,
    description:
      "5099 42 OBSP Specific - Durable Goods, Medium Hazard NEC - Lessor's Risk",
  },
  {
    sicCode: 5099,
    riskCode: 43,
    description: '5099 43 OBSP Specific - Durable Goods, Low Hazard NEC',
  },
  {
    sicCode: 5099,
    riskCode: 44,
    description:
      "5099 44 OBSP Specific - Durable Goods, Low Hazard NEC - Lessor's Risk",
  },
  {
    sicCode: 5111,
    riskCode: 1,
    description: '5111 1 Printing and Writing Paper, Wholesale',
  },
  {
    sicCode: 5112,
    riskCode: 1,
    description: '5112 1 Stationery and Office Supplies, Wholesale',
  },
  {
    sicCode: 5113,
    riskCode: 1,
    description: '5113 1 Industrial and Personal Service Paper, NEC, Wholesale',
  },
  {
    sicCode: 5113,
    riskCode: 2,
    description: '5113 2 Paper Products Distributors, Wholesale',
  },
  {
    sicCode: 5122,
    riskCode: 4,
    description:
      "5122 4 Drugs, Drug Proprietaries, and Druggists' Sundries, Wholesale",
  },
  {
    sicCode: 5122,
    riskCode: 7,
    description: '5122 7 Blood Plasma, Wholesale',
  },
  {
    sicCode: 5122,
    riskCode: 8,
    description: '5122 8 New York Only - Cosmetics Program',
  },
  {
    sicCode: 5131,
    riskCode: 1,
    description: '5131 1 Fabric Distributors, Wholesale',
  },
  {
    sicCode: 5131,
    riskCode: 2,
    description:
      '5131 2 Textile Bleaching, Dyeing, Mercerizing, Printing, Finishing or Silk Screening--new goods, Wholesale',
  },
  {
    sicCode: 5131,
    riskCode: 3,
    description:
      '5131 3 Piece Goods, Notions, and Other Dry Goods, NEC, Wholesale',
  },
  {
    sicCode: 5136,
    riskCode: 1,
    description: "5136 1 Men's and Boys' Clothing and Furnishings, Wholesale",
  },
  {
    sicCode: 5137,
    riskCode: 1,
    description:
      "5137 1 Women's, Children's, Clothing and Accessories, not infants, Wholesale",
  },
  {
    sicCode: 5137,
    riskCode: 2,
    description: "5137 2 Infants' Clothing and Accessories, Wholesale",
  },
  {
    sicCode: 5139,
    riskCode: 1,
    description: '5139 1 Footwear, Wholesale',
  },
  {
    sicCode: 5141,
    riskCode: 1,
    description: '5141 1 Distributors -- food and drink, Wholesale',
  },
  {
    sicCode: 5141,
    riskCode: 2,
    description: '5141 2 Groceries, General Line, Wholesale',
  },
  {
    sicCode: 5142,
    riskCode: 1,
    description: '5142 1 Packaged Frozen Foods, Wholesale',
  },
  {
    sicCode: 5143,
    riskCode: 1,
    description: '5143 1 Milk Depots or Dealers, Wholesale',
  },
  {
    sicCode: 5143,
    riskCode: 2,
    description: '5143 2 Dairy Products, Except Dried or Canned, Wholesale',
  },
  {
    sicCode: 5144,
    riskCode: 1,
    description: '5144 1 Poultry and Poultry Products, Wholesale',
  },
  {
    sicCode: 5145,
    riskCode: 1,
    description: '5145 1 Confectionery, Wholesale',
  },
  {
    sicCode: 5146,
    riskCode: 1,
    description: '5146 1 Fish and Seafoods, Wholesale',
  },
  {
    sicCode: 5147,
    riskCode: 1,
    description: '5147 1 Meats and Meat Products, Wholesale',
  },
  {
    sicCode: 5148,
    riskCode: 1,
    description: '5148 1 Fresh Fruits and Vegetables, Wholesale',
  },
  {
    sicCode: 5149,
    riskCode: 1,
    description: '5149 1 Groceries and Related Products, NEC, Wholesale',
  },
  {
    sicCode: 5153,
    riskCode: 1,
    description: '5153 1 Grain and Field Beans, Wholesale',
  },
  {
    sicCode: 5154,
    riskCode: 1,
    description:
      "5154 1 Auctioneers--livestock--sales conducted away from the insured's premises, Wholesale",
  },
  {
    sicCode: 5154,
    riskCode: 2,
    description: '5154 2 Livestock Dealers or Commission Merchants, Wholesale',
  },
  {
    sicCode: 5154,
    riskCode: 3,
    description: '5154 3 Livestock, NEC, Wholesale',
  },
  {
    sicCode: 5159,
    riskCode: 1,
    description: '5159 1 Cotton or Wool Merchants, Wholesale',
  },
  {
    sicCode: 5159,
    riskCode: 2,
    description: '5159 2 Hide Dealers and Distributors--raw, Wholesale',
  },
  {
    sicCode: 5159,
    riskCode: 3,
    description: '5159 3 Farm-Product Raw Materials, NEC, Wholesale',
  },
  {
    sicCode: 5162,
    riskCode: 1,
    description:
      '5162 1 Plastics Materials and Basic Forms and Shapes, Wholesale',
  },
  {
    sicCode: 5169,
    riskCode: 1,
    description: '5169 1 Chemicals and Allied Products, NEC, Wholesale',
  },
  {
    sicCode: 5169,
    riskCode: 10,
    description:
      '5169 10 Energy Program Only - Wholesale Distribution of Industrial Chemicals',
  },
  {
    sicCode: 5169,
    riskCode: 20,
    description:
      '5169 20 Energy Program Only - Chemicals & Allied Products NEC',
  },
  {
    sicCode: 5171,
    riskCode: 1,
    description: '5171 1 Petroleum Bulk Stations and Terminals, Wholesale',
  },
  {
    sicCode: 5171,
    riskCode: 2,
    description:
      '5171 2 Maine Branch Only - Petroleum Bulk Stations and Terminals, Wholesale',
  },
  {
    sicCode: 5171,
    riskCode: 3,
    description:
      '5171 3 New Hampshire Office  Only - Petroleum Bulk Stations and Terminals, Wholesale',
  },
  {
    sicCode: 5171,
    riskCode: 10,
    description:
      '5171 10 Energy Program Only - Petroleum Bulk Stations and Terminals',
  },
  {
    sicCode: 5172,
    riskCode: 1,
    description: '5172 1 Fuel Oil or Kerosene Distributors, Wholesale',
  },
  {
    sicCode: 5172,
    riskCode: 2,
    description: '5172 2 Gas Dealers or Distributors, Wholesale',
  },
  {
    sicCode: 5172,
    riskCode: 3,
    description: '5172 3 Gas Distributors-LPG, Wholesale',
  },
  {
    sicCode: 5172,
    riskCode: 4,
    description: '5172 4 Gasoline Distributors, Wholesale',
  },
  {
    sicCode: 5172,
    riskCode: 5,
    description:
      '5172 5 Petroleum and Petroleum Products Wholesalers, Except Bulk Stations and Terminals, NEC, Wholesale',
  },
  {
    sicCode: 5172,
    riskCode: 6,
    description:
      '5172 6 Maine Branch Only - Petroleum and Petroleum Products Wholesalers, Except Bulk Stations',
  },
  {
    sicCode: 5172,
    riskCode: 7,
    description:
      '5172 7 New Hampshire Office Only - Petroleum and Petroleum Products Wholesalers, Except Bulk Stations',
  },
  {
    sicCode: 5181,
    riskCode: 1,
    description: '5181 1 Beer and Ale, Wholesale',
  },
  {
    sicCode: 5182,
    riskCode: 1,
    description: '5182 1 Wine and Distilled Alcoholic Beverages, Wholesale',
  },
  {
    sicCode: 5191,
    riskCode: 1,
    description: '5191 1 Feed, Grain or Hay Dealers, Wholesale',
  },
  {
    sicCode: 5191,
    riskCode: 2,
    description: '5191 2 Fertilizer Dealers and Distributors, Wholesale',
  },
  {
    sicCode: 5191,
    riskCode: 3,
    description:
      '5191 3 Seed Merchants--erroneous delivery, and error in mixture (excluding germination failure), Wholesale',
  },
  {
    sicCode: 5191,
    riskCode: 4,
    description:
      '5191 4 Seed Merchants--erroneous delivery, error in mixture and resulting in germination failure, Wholesale',
  },
  {
    sicCode: 5191,
    riskCode: 5,
    description:
      '5191 5 Seed Merchants--excluding erroneous delivery, error in mixture and germination failure, Wholesale',
  },
  {
    sicCode: 5191,
    riskCode: 6,
    description: '5191 6 Farm Supplies, NEC, Wholesale',
  },
  {
    sicCode: 5192,
    riskCode: 1,
    description: '5192 1 Newspaper or Magazine Distributors, Wholesale',
  },
  {
    sicCode: 5193,
    riskCode: 1,
    description:
      "5193 1 Flowers, Nursery Stock, and Florists' Supplies, Wholesale",
  },
  {
    sicCode: 5194,
    riskCode: 1,
    description: '5194 1 Tobacco and Tobacco Products, Wholesale',
  },
  {
    sicCode: 5198,
    riskCode: 1,
    description: '5198 1 Paint, Varnishes, and Supplies, Wholesale',
  },
  {
    sicCode: 5199,
    riskCode: 1,
    description: '5199 1 Nondurable Goods, NEC, Wholesale',
  },
  {
    sicCode: 5199,
    riskCode: 41,
    description: '5199 41 OBSP Specific - Nondurable Goods, NEC',
  },
  {
    sicCode: 5199,
    riskCode: 42,
    description:
      "5199 42 OBSP Specific - Nondurable Goods, NEC - Lessor's Risk",
  },
  {
    sicCode: 5211,
    riskCode: 1,
    description:
      '5211 1 Building Material Dealers--other than secondhand material or Concrete Mixed in Transit',
  },
  {
    sicCode: 5211,
    riskCode: 2,
    description: '5211 2 Fence Dealers',
  },
  {
    sicCode: 5211,
    riskCode: 3,
    description: '5211 3 Lumberyards Retail',
  },
  {
    sicCode: 5211,
    riskCode: 4,
    description: '5211 4 Lumberyards Warehouse',
  },
  {
    sicCode: 5211,
    riskCode: 5,
    description: '5211 5 Tie, Post or Pole Yard',
  },
  {
    sicCode: 5211,
    riskCode: 6,
    description: '5211 6 Lumber and Other Building Materials Dealers, NEC',
  },
  {
    sicCode: 5231,
    riskCode: 1,
    description: '5231 1 Glass Dealers',
  },
  {
    sicCode: 5231,
    riskCode: 2,
    description: '5231 2 Paint, Wallpaper or Wall covering Stores',
  },
  {
    sicCode: 5251,
    riskCode: 1,
    description:
      '5251 1 Hardware Stores with sales of weapons and accessories 10 % or more of total receipts',
  },
  {
    sicCode: 5251,
    riskCode: 2,
    description:
      '5251 2 Hardware Stores with sales of weapons and accessories less than 10 % of total receipts',
  },
  {
    sicCode: 5251,
    riskCode: 3,
    description: '5251 3 Home Improvement Stores',
  },
  {
    sicCode: 5251,
    riskCode: 4,
    description: '5251 4 Hardware Stores, NEC',
  },
  {
    sicCode: 5251,
    riskCode: 5,
    description:
      '5251 5 Plumbing Supplies and Fixtures Dealers and Distributors--Retail',
  },
  {
    sicCode: 5261,
    riskCode: 1,
    description: '5261 1 Retail Nurseries, Lawn and Garden Supply Stores',
  },
  {
    sicCode: 5261,
    riskCode: 2,
    description: '5261 2 Outdoor Power Equipment Stores',
  },
  {
    sicCode: 5261,
    riskCode: 3,
    description:
      '5261 3 Seed Merchants--erroneous delivery, and error in mixture (excluding germination failure)',
  },
  {
    sicCode: 5261,
    riskCode: 4,
    description:
      '5261 4 Seed Merchants--erroneous delivery, error in mixture and resulting in germination failure',
  },
  {
    sicCode: 5261,
    riskCode: 5,
    description: '5261 5 Farm Machinery Dealers',
  },
  {
    sicCode: 5261,
    riskCode: 6,
    description: '5261 6 Nursery Only',
  },
  {
    sicCode: 5271,
    riskCode: 1,
    description: '5271 1 Mobile Home Dealers',
  },
  {
    sicCode: 5311,
    riskCode: 1,
    description: '5311 1 Department or Discount Stores',
  },
  {
    sicCode: 5311,
    riskCode: 2,
    description:
      '5311 2 Warehouse Stores-Superstores (Substantial Gen Merchandise)',
  },
  {
    sicCode: 5331,
    riskCode: 1,
    description:
      '5331 1 Variety Stores-- Not For Profit only with sales of weapons and accessories greater than 10 % of total receipts',
  },
  {
    sicCode: 5331,
    riskCode: 2,
    description:
      '5331 2 Variety Stores-- Not For Profit only with sales of weapons and accessories less than 10 % of total receipts',
  },
  {
    sicCode: 5331,
    riskCode: 3,
    description:
      '5331 3 Variety Stores-- Other than Not For Profit with sales of weapons and accessories less than 10 % of total receipts',
  },
  {
    sicCode: 5331,
    riskCode: 4,
    description:
      '5331 4 Variety Stores-- Other than Not For Profit with sales of weapons, alterations, and/or accessories 10% or more of total receipts',
  },
  {
    sicCode: 5399,
    riskCode: 1,
    description:
      '5399 1 Warehouse Stores-Superstores (Substantial Gen Merchandise)',
  },
  {
    sicCode: 5399,
    riskCode: 2,
    description: '5399 2 E&S Group Only - Retail',
  },
  {
    sicCode: 5411,
    riskCode: 1,
    description: '5411 1 Convenience Food/ Gasoline Stores -- full service',
  },
  {
    sicCode: 5411,
    riskCode: 2,
    description:
      '5411 2 Convenience Food/ Gasoline Stores -- self and full service combined',
  },
  {
    sicCode: 5411,
    riskCode: 3,
    description: '5411 3 Convenience Food/ Gasoline Stores -- self service',
  },
  {
    sicCode: 5411,
    riskCode: 4,
    description: '5411 4 Convenience Stores - Without Gas',
  },
  {
    sicCode: 5411,
    riskCode: 5,
    description: '5411 5 Delicatessens',
  },
  {
    sicCode: 5411,
    riskCode: 6,
    description: '5411 6 Grocery Stores, NEC',
  },
  {
    sicCode: 5411,
    riskCode: 7,
    description: '5411 7 Super Stores/Warehouse Stores',
  },
  {
    sicCode: 5411,
    riskCode: 8,
    description: '5411 8 Supermarkets (under 10,00 sq ft)',
  },
  {
    sicCode: 5411,
    riskCode: 9,
    description:
      '5411 9 Warehouse Stores, Super Stores, Supermarkets over 10,00 sq ft)',
  },
  {
    sicCode: 5421,
    riskCode: 1,
    description:
      '5421 1 Meat and Fish (Seafood) Markets, Including Freezer Provisioners',
  },
  {
    sicCode: 5431,
    riskCode: 1,
    description:
      "5431 1 Flea Markets and Farmers' Markets, Fruits and Vegetables",
  },
  {
    sicCode: 5431,
    riskCode: 2,
    description: '5431 2 Fruit or Vegetable Dealers',
  },
  {
    sicCode: 5441,
    riskCode: 1,
    description: '5441 1 Candy, Nut, and Confectionery Stores',
  },
  {
    sicCode: 5451,
    riskCode: 1,
    description:
      '5451 1 Dairy Products or Butter and Egg Stores -- Not For Profit only',
  },
  {
    sicCode: 5451,
    riskCode: 2,
    description:
      '5451 2 Dairy Products or Butter and Egg Stores -- Other than Not For Profit',
  },
  {
    sicCode: 5461,
    riskCode: 1,
    description: '5461 1 Bakeries - Retail',
  },
  {
    sicCode: 5499,
    riskCode: 1,
    description: '5499 1 Miscellaneous Food Stores, NEC',
  },
  {
    sicCode: 5499,
    riskCode: 2,
    description: '5499 2 Health or Natural Food Stores',
  },
  {
    sicCode: 5499,
    riskCode: 3,
    description: '5499 3 Stores--food or drink--Not For Profit only',
  },
  {
    sicCode: 5499,
    riskCode: 4,
    description: '5499 4 Stores--food or drink--Other than Not For Profit',
  },
  {
    sicCode: 5511,
    riskCode: 1,
    description: '5511 1 Motor Vehicle Dealers (New and Used)',
  },
  {
    sicCode: 5521,
    riskCode: 1,
    description: '5521 1 Motor Vehicle Dealers (Used Only)',
  },
  {
    sicCode: 5531,
    riskCode: 1,
    description: '5531 1 Auto and Home Supply Stores',
  },
  {
    sicCode: 5531,
    riskCode: 2,
    description: '5531 2 Tire Dealers',
  },
  {
    sicCode: 5541,
    riskCode: 1,
    description: '5541 1 Gasoline Stations-- full service w/o wreckers',
  },
  {
    sicCode: 5541,
    riskCode: 2,
    description: '5541 2 Gasoline Stations-- full service withÿ wreckers',
  },
  {
    sicCode: 5541,
    riskCode: 3,
    description:
      '5541 3 Gasoline Stations-- self and full service combined with wreckers',
  },
  {
    sicCode: 5541,
    riskCode: 4,
    description:
      '5541 4 Gasoline Stations-- self and full service combined without wreckers',
  },
  {
    sicCode: 5541,
    riskCode: 5,
    description: '5541 5 Gasoline Stations-- self service',
  },
  {
    sicCode: 5541,
    riskCode: 6,
    description: '5541 6 E&S Group Only - Service Station',
  },
  {
    sicCode: 5551,
    riskCode: 1,
    description: '5551 1 Boat Dealers',
  },
  {
    sicCode: 5561,
    riskCode: 1,
    description: '5561 1 Camper, Travel Trailer or Motor home Sales Agencies',
  },
  {
    sicCode: 5561,
    riskCode: 2,
    description: '5561 2 Recreational Vehicle Dealers',
  },
  {
    sicCode: 5571,
    riskCode: 1,
    description: '5571 1 Motorcycle Dealers',
  },
  {
    sicCode: 5599,
    riskCode: 1,
    description: '5599 1 Automotive Dealers, NEC',
  },
  {
    sicCode: 5611,
    riskCode: 1,
    description: "5611 1 Men's and Boys' Clothing and Accessory Stores",
  },
  {
    sicCode: 5621,
    riskCode: 1,
    description: "5621 1 Women's Clothing Stores, NEC",
  },
  {
    sicCode: 5621,
    riskCode: 2,
    description: '5621 2 Bridal Shops',
  },
  {
    sicCode: 5632,
    riskCode: 1,
    description: "5632 1 Women's Accessory and Specialty Stores",
  },
  {
    sicCode: 5632,
    riskCode: 2,
    description: '5632 2 Fur Salons',
  },
  {
    sicCode: 5641,
    riskCode: 1,
    description: "5641 1 Children's & Infants' Wear Stores",
  },
  {
    sicCode: 5651,
    riskCode: 1,
    description: '5651 1 Family Clothing Stores',
  },
  {
    sicCode: 5661,
    riskCode: 1,
    description: '5661 1 Shoe Stores',
  },
  {
    sicCode: 5699,
    riskCode: 1,
    description:
      '5699 1 Clothing or Wearing Apparel Stores-- Not for Profit only',
  },
  {
    sicCode: 5699,
    riskCode: 2,
    description:
      '5699 2 Clothing or Wearing Apparel Stores-- Other than Not For Profit',
  },
  {
    sicCode: 5699,
    riskCode: 3,
    description: '5699 3 Tailor Merchants--men or boys',
  },
  {
    sicCode: 5699,
    riskCode: 4,
    description: '5699 4 Tailoring or Dressmaking Establishments--custom',
  },
  {
    sicCode: 5699,
    riskCode: 5,
    description: '5699 5 Miscellaneous Apparel and Accessory Stores, NEC',
  },
  {
    sicCode: 5712,
    riskCode: 1,
    description: '5712 1 Furniture Stores-- Not for Profit only',
  },
  {
    sicCode: 5712,
    riskCode: 2,
    description: '5712 2 Furniture Stores--Other than Not For Profit',
  },
  {
    sicCode: 5712,
    riskCode: 3,
    description: '5712 3 House Furnishings Installation',
  },
  {
    sicCode: 5712,
    riskCode: 4,
    description: '5712 4 Mattress and Waterbeds',
  },
  {
    sicCode: 5713,
    riskCode: 1,
    description: '5713 1 Flooring Covering Stores',
  },
  {
    sicCode: 5714,
    riskCode: 1,
    description: '5714 1 Drapery, Curtain, and Upholstery Stores',
  },
  {
    sicCode: 5719,
    riskCode: 1,
    description: '5719 1 Miscellaneous Home furnishings Stores',
  },
  {
    sicCode: 5722,
    riskCode: 1,
    description: '5722 1 Household Appliance Stores',
  },
  {
    sicCode: 5722,
    riskCode: 2,
    description: '5722 2 Fireplace and Wood Burning Stove Stores - Retail',
  },
  {
    sicCode: 5722,
    riskCode: 3,
    description:
      '5722 3 Household Appliance Stores: Vacuum Cleaner & Sewing Machine',
  },
  {
    sicCode: 5731,
    riskCode: 1,
    description: '5731 1 Radio, Television, and Consumer Electronics Stores',
  },
  {
    sicCode: 5731,
    riskCode: 2,
    description: '5731 2 Television and Radio Sales and Servicing',
  },
  {
    sicCode: 5734,
    riskCode: 1,
    description: '5734 1 Computer and Computer Software Stores',
  },
  {
    sicCode: 5735,
    riskCode: 1,
    description: '5735 1 Video Stores',
  },
  {
    sicCode: 5735,
    riskCode: 2,
    description: '5735 2 Phonograph Record/CD Stores - Distributors',
  },
  {
    sicCode: 5736,
    riskCode: 1,
    description: '5736 1 Musical Stores',
  },
  {
    sicCode: 5812,
    riskCode: 1,
    description: '5812 1 Caterers',
  },
  {
    sicCode: 5812,
    riskCode: 2,
    description: '5812 2 Commissary Work',
  },
  {
    sicCode: 5812,
    riskCode: 3,
    description: '5812 3 Concessionaires',
  },
  {
    sicCode: 5812,
    riskCode: 4,
    description: '5812 4 Ice Cream Stores',
  },
  {
    sicCode: 5812,
    riskCode: 5,
    description:
      '5812 5 Restaurants--operated by concessionaires-- Not For Profit only',
  },
  {
    sicCode: 5812,
    riskCode: 6,
    description:
      '5812 6 Restaurants--operated by concessionaires-- Other than Not For Profit',
  },
  {
    sicCode: 5812,
    riskCode: 7,
    description:
      '5812 7 Restaurants--with no sale of alcoholic beverages--with table service',
  },
  {
    sicCode: 5812,
    riskCode: 8,
    description:
      '5812 8 Restaurants--with no sale of alcoholic beverages--without table service, with seating',
  },
  {
    sicCode: 5812,
    riskCode: 9,
    description:
      '5812 9 Restaurants - with no sale of alcohol beverages-- without seating',
  },
  {
    sicCode: 5812,
    riskCode: 10,
    description:
      '5812 10 Restaurants--with sale of alcohol beverages that are less than 30% of the annual receipts of the restaurant--with table service',
  },
  {
    sicCode: 5812,
    riskCode: 11,
    description:
      '5812 11 Restaurants--with sale of alcohol beverages that are less than 30% of the annual receipts of the restaurant--without table service',
  },
  {
    sicCode: 5812,
    riskCode: 12,
    description:
      '5812 12 Restaurants--with sales of alcoholic beverages that are 30% or more of but less than 75% of the total annual receipts of the restaurants-- with dance floor',
  },
  {
    sicCode: 5812,
    riskCode: 13,
    description:
      '5812 13 Restaurants--with sales of alcoholic beverages that are 30% or more of but less than 75% of the total annual receipts of the restaurants-- without dance floor',
  },
  {
    sicCode: 5812,
    riskCode: 14,
    description:
      '5812 14 Restaurants--with sales of alcoholic beverages that are  75% or more of the total annual receipts of the restaurants--with tables--with dance floor--with table service',
  },
  {
    sicCode: 5812,
    riskCode: 15,
    description:
      '5812 15 Restaurants--with sales of alcoholic beverages that are 75% or more of the total annual receipts of the restaurants -- with tables--with dance floor--no table service',
  },
  {
    sicCode: 5812,
    riskCode: 16,
    description:
      '5812 16 Restaurants--with sales of alcoholic beverages that are 75% or more of the total annual receipts of the restaurants -- with tables--without dance floor--table service',
  },
  {
    sicCode: 5812,
    riskCode: 17,
    description:
      '5812 17 Restaurants--with sales of alcoholic beverages that are 75% or more of the total annual receipts of the restaurants -- with tables--without dance floor-- no table service',
  },
  {
    sicCode: 5812,
    riskCode: 18,
    description:
      '5812 18 Restaurants--with sales of alcoholic beverages that are 75% or more of the total annual receipts of the restaurants -- Bar service only (no tables)--with dance floor',
  },
  {
    sicCode: 5812,
    riskCode: 19,
    description:
      '5812 19 Restaurants--with sales of alcoholic beverages that are 75% or more of the total annual receipts of the restaurants -- Bar service only (no tables)--without dance floor',
  },
  {
    sicCode: 5812,
    riskCode: 20,
    description: '5812 20 Connecticut branch Only - Eating and Drinking Places',
  },
  {
    sicCode: 5812,
    riskCode: 21,
    description: '5812 21 Restaurant Family Style',
  },
  {
    sicCode: 5812,
    riskCode: 22,
    description: '5812 22 Pizza Shop',
  },
  {
    sicCode: 5812,
    riskCode: 23,
    description: '5812 23 Fast Food in a Convenience Shop',
  },
  {
    sicCode: 5812,
    riskCode: 24,
    description: '5812 24 E&S Group Only - Restaurant',
  },
  {
    sicCode: 5812,
    riskCode: 25,
    description: '5812 25 Concessionaires - OBE only',
  },
  {
    sicCode: 5812,
    riskCode: 26,
    description: '5812 26 Adult Themed Restaurants',
  },
  {
    sicCode: 5812,
    riskCode: 41,
    description: '5812 41 OBSP Specific - Restaurants',
  },
  {
    sicCode: 5813,
    riskCode: 1,
    description: '5813 1 Bars, Taverns, Cocktail Lounges and Nightclubs',
  },
  {
    sicCode: 5813,
    riskCode: 2,
    description: '5813 2 Nightclubs, Cabarets and Comedy Clubs',
  },
  {
    sicCode: 5813,
    riskCode: 3,
    description:
      '5813 3 Restaurants--with sales of alcoholic beverages that are 75% or more of the total annual receipts of the restaurants-- with dance floor',
  },
  {
    sicCode: 5813,
    riskCode: 4,
    description:
      '5813 4 Restaurants--with sales of alcoholic beverages that are 75% or more of the total annual receipts of the restaurants-- without dance floor',
  },
  {
    sicCode: 5813,
    riskCode: 5,
    description:
      '5813 5 BARS, TAVERNS, COCKTAIL LOUNGES, NIGHTCLUBS AND DISCOTHEQUES - Only as part of Performance Venue Risk (See Venue Criteria)',
  },
  {
    sicCode: 5813,
    riskCode: 6,
    description: '5813 6 NIGHT CLUBS',
  },
  {
    sicCode: 5912,
    riskCode: 1,
    description: '5912 1 Drugstores over 10,000 sq feet',
  },
  {
    sicCode: 5912,
    riskCode: 2,
    description: '5912 2 Drugstores under 10,000 sq ft',
  },
  {
    sicCode: 5921,
    riskCode: 1,
    description: '5921 1 Liquor Stores, Open 15 hrs or less/day',
  },
  {
    sicCode: 5921,
    riskCode: 2,
    description: '5921 2 Liquor Stores, Open greater than 15 hrs/day',
  },
  {
    sicCode: 5932,
    riskCode: 1,
    description: '5932 1 Used Merchandise Stores, NEC',
  },
  {
    sicCode: 5932,
    riskCode: 2,
    description: '5932 2 Antique Stores',
  },
  {
    sicCode: 5932,
    riskCode: 3,
    description: '5932 3 Used Bookstores',
  },
  {
    sicCode: 5932,
    riskCode: 4,
    description: '5932 4 Building Material Dealers--secondhand material',
  },
  {
    sicCode: 5932,
    riskCode: 5,
    description: '5932 5 Clothing Stores',
  },
  {
    sicCode: 5932,
    riskCode: 6,
    description: "5932 6 Flea Markets and Farmers' Markets, Used Merchandise",
  },
  {
    sicCode: 5932,
    riskCode: 7,
    description:
      '5932 7 Pawn Shops with sales of weapons and accessories 10% or more of total receipts',
  },
  {
    sicCode: 5932,
    riskCode: 8,
    description:
      '5932 8 Pawn Shops with sales of weapons and accessories less than 10 % of total receipts',
  },
  {
    sicCode: 5932,
    riskCode: 9,
    description:
      '5932 9 Secondhand or Salvage Dealers and Distributors--Thrift Stores and Resale Shops',
  },
  {
    sicCode: 5941,
    riskCode: 1,
    description: '5941 1 Sporting Goods Stores and Bicycle Shops, NEC',
  },
  {
    sicCode: 5941,
    riskCode: 2,
    description:
      '5941 2 Army and Navy Stores - with 10% or more sales of weapons and weapons accessories',
  },
  {
    sicCode: 5941,
    riskCode: 3,
    description:
      '5941 3 Army and Navy Stores - with less than 10% sales of weapons and weapons accessories',
  },
  {
    sicCode: 5941,
    riskCode: 4,
    description: '5941 4 Bait and Tackle Shops',
  },
  {
    sicCode: 5941,
    riskCode: 5,
    description: '5941 5 Bicycle Stores--sales and servicing',
  },
  {
    sicCode: 5941,
    riskCode: 6,
    description: '5941 6 Ski Shops',
  },
  {
    sicCode: 5941,
    riskCode: 7,
    description:
      '5941 7 Sporting Goods or Athletic Equipment Stores with sales of weapons and accessories less than 10 % of total receipts-- ISO GL # 18206',
  },
  {
    sicCode: 5941,
    riskCode: 8,
    description:
      '5941 8 Sporting Goods or Athletic Equipment Stores with sales of weapons, alterations, and/or accessories 10% or more of total receipts',
  },
  {
    sicCode: 5941,
    riskCode: 9,
    description: '5941 9 Tack Shops',
  },
  {
    sicCode: 5942,
    riskCode: 1,
    description: '5942 1 Books and Magazines Stores--Not for Profit only',
  },
  {
    sicCode: 5942,
    riskCode: 2,
    description: '5942 2 Books and Magazines Stores--Other than Not for Profit',
  },
  {
    sicCode: 5943,
    riskCode: 1,
    description: '5943 1 Stationery Stores',
  },
  {
    sicCode: 5944,
    riskCode: 1,
    description: '5944 1 Jewelry Stores',
  },
  {
    sicCode: 5945,
    riskCode: 1,
    description: "5945 1 Hobby, Crafts or Artists' Supply Stores",
  },
  {
    sicCode: 5945,
    riskCode: 2,
    description: '5945 2 Toy Stores',
  },
  {
    sicCode: 5946,
    riskCode: 1,
    description: '5946 1 Camera and Photographic Supply Stores',
  },
  {
    sicCode: 5946,
    riskCode: 2,
    description: '5946 2 CAMERA STORES - PROFESSIONAL',
  },
  {
    sicCode: 5947,
    riskCode: 1,
    description: '5947 1 Gift Shops--Not For Profit only',
  },
  {
    sicCode: 5947,
    riskCode: 2,
    description: '5947 2 Gift Shops--Other than Not For Profit',
  },
  {
    sicCode: 5948,
    riskCode: 1,
    description: '5948 1 Luggage and Leather Goods Stores',
  },
  {
    sicCode: 5949,
    riskCode: 1,
    description: '5949 1 Sewing, Needlework, and Piece Goods Stores',
  },
  {
    sicCode: 5961,
    riskCode: 1,
    description: '5961 1 Mail Order Houses',
  },
  {
    sicCode: 5962,
    riskCode: 1,
    description: '5962 1 Vending Machine Operations',
  },
  {
    sicCode: 5962,
    riskCode: 2,
    description:
      '5962 2 Vending Machine Operations--confection, food, beverage or ice',
  },
  {
    sicCode: 5962,
    riskCode: 3,
    description: '5962 3 Vending Machine Operations--tobacco products',
  },
  {
    sicCode: 5962,
    riskCode: 4,
    description: '5962 4 Automatic Merchandising Machine Operator, NEC',
  },
  {
    sicCode: 5963,
    riskCode: 1,
    description: '5963 1 Direct Selling Establishments, NEC',
  },
  {
    sicCode: 5963,
    riskCode: 2,
    description: '5963 2 E-tailers, Online Retailers',
  },
  {
    sicCode: 5963,
    riskCode: 3,
    description:
      "5963 3 Flea Markets and Farmers' Markets, Direct Selling Establishments",
  },
  {
    sicCode: 5963,
    riskCode: 4,
    description: "5963 4 Manufacturer's Representative",
  },
  {
    sicCode: 5963,
    riskCode: 5,
    description: '5963 5 Mobile Concessions',
  },
  {
    sicCode: 5983,
    riskCode: 1,
    description: '5983 1 Fuel Oil or Kerosene Dealers',
  },
  {
    sicCode: 5983,
    riskCode: 2,
    description: '5983 2 Maine Branch Only - Fuel Oil  Dealers',
  },
  {
    sicCode: 5983,
    riskCode: 3,
    description: '5983 3 New Hampshire Office Only - Fuel Oil Dealers',
  },
  {
    sicCode: 5984,
    riskCode: 1,
    description: '5984 1 Gas Dealers-LPG',
  },
  {
    sicCode: 5984,
    riskCode: 2,
    description:
      '5984 2 Maine Branch Only - Liquefied Petroleum Gas (Bottled Gas) Dealers',
  },
  {
    sicCode: 5984,
    riskCode: 3,
    description:
      '5984 3 New Hampshire Office Only - Liquefied Petroleum Gas (Bottled Gas) Dealers',
  },
  {
    sicCode: 5989,
    riskCode: 1,
    description: '5989 1 Fuel Dealers or Distributors--coal or wood',
  },
  {
    sicCode: 5989,
    riskCode: 2,
    description: '5989 2 Fuel Dealers, NEC',
  },
  {
    sicCode: 5989,
    riskCode: 3,
    description: '5989 3 Maine Branch Only - Fuel Dealers, NEC',
  },
  {
    sicCode: 5989,
    riskCode: 4,
    description: '5989 4 New Hampshire Office Only - Fuel Dealers, NEC',
  },
  {
    sicCode: 5989,
    riskCode: 5,
    description: '5989 5 E&S Group Only - Storage Tanks',
  },
  {
    sicCode: 5992,
    riskCode: 1,
    description: '5992 1 Florists',
  },
  {
    sicCode: 5993,
    riskCode: 1,
    description: '5993 1 Tobacco Stores and Stands',
  },
  {
    sicCode: 5994,
    riskCode: 1,
    description: '5994 1 News Dealers and Newsstands',
  },
  {
    sicCode: 5995,
    riskCode: 1,
    description: '5995 1 Optical Goods Stores',
  },
  {
    sicCode: 5999,
    riskCode: 1,
    description: '5999 1 Miscellaneous Retail Stores, NEC',
  },
  {
    sicCode: 5999,
    riskCode: 2,
    description: '5999 2 Auctions--on premises owned or rented by the insured',
  },
  {
    sicCode: 5999,
    riskCode: 3,
    description: '5999 3 Coin Dealer - excluding Stock',
  },
  {
    sicCode: 5999,
    riskCode: 4,
    description: '5999 4 Coin Dealer - including Stock',
  },
  {
    sicCode: 5999,
    riskCode: 5,
    description: '5999 5 Comic-Books--Collectibles and Memorabilia Stores',
  },
  {
    sicCode: 5999,
    riskCode: 6,
    description: '5999 6 Cosmetic, Hair or Skin Preparation Stores',
  },
  {
    sicCode: 5999,
    riskCode: 7,
    description: '5999 7 Hearing Aid Stores',
  },
  {
    sicCode: 5999,
    riskCode: 8,
    description: '5999 8 Ice Dealers and Distributors',
  },
  {
    sicCode: 5999,
    riskCode: 9,
    description: '5999 9 Medical, Hospital and Surgical Supply Stores',
  },
  {
    sicCode: 5999,
    riskCode: 10,
    description: '5999 10 Office Machines or Appliances -- retail--no repair',
  },
  {
    sicCode: 5999,
    riskCode: 11,
    description: '5999 11 Painting, Picture or Frame Stores',
  },
  {
    sicCode: 5999,
    riskCode: 12,
    description: '5999 12 Pet Stores',
  },
  {
    sicCode: 5999,
    riskCode: 13,
    description:
      '5999 13 MERCHANDISE SALES- Sale of souvenirs such as T-Shirts, posters, badges, CDs, etc.',
  },
  {
    sicCode: 6011,
    riskCode: 1,
    description: '6011 1 Federal Reserve Banks',
  },
  {
    sicCode: 6019,
    riskCode: 1,
    description: '6019 1 Central Reserve Depository Institutions, NEC',
  },
  {
    sicCode: 6021,
    riskCode: 1,
    description: '6021 1 National Commercial Banks',
  },
  {
    sicCode: 6022,
    riskCode: 1,
    description: '6022 1 State Commercial Banks',
  },
  {
    sicCode: 6029,
    riskCode: 1,
    description: '6029 1 Commercial Banks, NEC',
  },
  {
    sicCode: 6035,
    riskCode: 1,
    description: '6035 1 Savings Institutions, Federally Chartered',
  },
  {
    sicCode: 6036,
    riskCode: 1,
    description: '6036 1 Savings institutions, Not Federally Chartered',
  },
  {
    sicCode: 6061,
    riskCode: 1,
    description: '6061 1 Credit Unions, Federally Chartered',
  },
  {
    sicCode: 6062,
    riskCode: 1,
    description: '6062 1 Credit Unions, Not Federally Chartered',
  },
  {
    sicCode: 6081,
    riskCode: 1,
    description: '6081 1 Branches and Agencies of Foreign Banks',
  },
  {
    sicCode: 6082,
    riskCode: 1,
    description: '6082 1 Foreign Trade and International Banking Institutions',
  },
  {
    sicCode: 6091,
    riskCode: 1,
    description: '6091 1 Nondeposit Trust Facilities',
  },
  {
    sicCode: 6099,
    riskCode: 1,
    description: '6099 1 Functions Related to Deposit Banking, NEC',
  },
  {
    sicCode: 6099,
    riskCode: 2,
    description: '6099 2 Private Security Vaults',
  },
  {
    sicCode: 6111,
    riskCode: 1,
    description: '6111 1 Federal and federally sponsored credit agencies',
  },
  {
    sicCode: 6141,
    riskCode: 1,
    description: '6141 1 Personal Credit Institutions',
  },
  {
    sicCode: 6153,
    riskCode: 1,
    description:
      '6153 1 Short-Term Business Credit Institutions, Except Agricultural',
  },
  {
    sicCode: 6159,
    riskCode: 1,
    description: '6159 1 Miscellaneous Business Credit Institutions',
  },
  {
    sicCode: 6162,
    riskCode: 1,
    description: '6162 1 Mortgage Bankers and Loan Correspondents',
  },
  {
    sicCode: 6163,
    riskCode: 1,
    description: '6163 1 Loan Brokers',
  },
  {
    sicCode: 6211,
    riskCode: 1,
    description: '6211 1 Security Brokers, Dealers, and Flotation Companies',
  },
  {
    sicCode: 6221,
    riskCode: 1,
    description: '6221 1 Commodity Contracts Brokers and Dealers',
  },
  {
    sicCode: 6231,
    riskCode: 1,
    description: '6231 1 Security and Commodity Exchanges',
  },
  {
    sicCode: 6282,
    riskCode: 1,
    description: '6282 1 Investment Advice',
  },
  {
    sicCode: 6289,
    riskCode: 1,
    description:
      '6289 1 Services Allied With the Exchange of Securities or Commodities, NEC',
  },
  {
    sicCode: 6311,
    riskCode: 1,
    description: '6311 1 Life Insurance',
  },
  {
    sicCode: 6321,
    riskCode: 1,
    description: '6321 1 Accident and Health Insurance',
  },
  {
    sicCode: 6324,
    riskCode: 1,
    description: '6324 1 Hospital and Medical Service Plans',
  },
  {
    sicCode: 6331,
    riskCode: 1,
    description: '6331 1 Fire, Marine, and Casualty Insurance',
  },
  {
    sicCode: 6351,
    riskCode: 1,
    description: '6351 1 Surety Insurance',
  },
  {
    sicCode: 6361,
    riskCode: 1,
    description: '6361 1 Title Insurance',
  },
  {
    sicCode: 6371,
    riskCode: 1,
    description: '6371 1 Pension, Health, and Welfare Funds',
  },
  {
    sicCode: 6399,
    riskCode: 1,
    description: '6399 1 Insurance Carriers, NEC',
  },
  {
    sicCode: 6411,
    riskCode: 1,
    description:
      '6411 1 Inspecting and Appraisal Companies--inspecting for insurance or valuation purposes',
  },
  {
    sicCode: 6411,
    riskCode: 2,
    description: '6411 2 Insurance Agents',
  },
  {
    sicCode: 6411,
    riskCode: 3,
    description: '6411 3 Insurance Agents, Brokers, and Service, NEC',
  },
  {
    sicCode: 6512,
    riskCode: 1,
    description: '6512 1 Operators of Nonresidential Buildings, NEC',
  },
  {
    sicCode: 6512,
    riskCode: 2,
    description:
      "6512 2 Buildings or Premises--bank or office--mercantile or manufacturing (lessor's risk only)-Not For Profit Only",
  },
  {
    sicCode: 6512,
    riskCode: 3,
    description:
      "6512 3 Buildings or Premises Operators --bank or office--mercantile or manufacturing (lessor's risk only)-Other than Not For Profit",
  },
  {
    sicCode: 6512,
    riskCode: 4,
    description:
      "6512 4 Buildings or Premises--bank or office--mercantile or manufacturing maintained by the insured (lessor's risk only)",
  },
  {
    sicCode: 6512,
    riskCode: 5,
    description:
      "6512 5 Buildings or Premises Operators--bank or office--mercantile or manufacturing maintained by the insured (lessor's risk only)-Other than Not For Profit",
  },
  {
    sicCode: 6512,
    riskCode: 6,
    description:
      '6512 6 Buildings or Premises Operators--office--Not For Profit Only',
  },
  {
    sicCode: 6512,
    riskCode: 7,
    description:
      '6512 7 Buildings or Premises Operators--office--Other than Not For Profit',
  },
  {
    sicCode: 6512,
    riskCode: 8,
    description:
      '6512 8 Buildings or Premises Operators--office--Premises occupied by employees of the insured--Not For Profit Only',
  },
  {
    sicCode: 6512,
    riskCode: 9,
    description:
      '6512 9 Buildings or Premises Operators--office--Premises occupied by employees of the insured--Other than Not For Profit',
  },
  {
    sicCode: 6512,
    riskCode: 10,
    description:
      '6512 10 Convention Centers - Contingent Exposures only Exhibition or Convention Buildings Operators - Contingent Exposures Only',
  },
  {
    sicCode: 6512,
    riskCode: 11,
    description: '6512 11 Convention Centers',
  },
  {
    sicCode: 6512,
    riskCode: 12,
    description:
      "6512 12 Gasoline or Oil Supply Stations Operators --retail--(lessor's risk only)",
  },
  {
    sicCode: 6512,
    riskCode: 13,
    description: '6512 13 Hall Operators-- Not For Profit only',
  },
  {
    sicCode: 6512,
    riskCode: 14,
    description: '6512 14 Hall Operators-- Other than Not For Profit',
  },
  {
    sicCode: 6512,
    riskCode: 15,
    description:
      "6512 15 Shopping Center Operators--buildings, or premises not occupied by the insured (lessor's risk only)",
  },
  {
    sicCode: 6512,
    riskCode: 16,
    description:
      "6512 16 Shopping Center Operators--indoor malls-- buildings, or premises not occupied by the insured (lessor's risk only)",
  },
  {
    sicCode: 6512,
    riskCode: 17,
    description: '6512 17 Stadiums, Arenas and Racetrack',
  },
  {
    sicCode: 6512,
    riskCode: 18,
    description: '6512 18 Vacant Building Operators--factories',
  },
  {
    sicCode: 6512,
    riskCode: 19,
    description:
      '6512 19 Vacant Building Operators--not factories--Not For Profit only Other than Not for Profit',
  },
  {
    sicCode: 6512,
    riskCode: 20,
    description:
      "6512 20 Wharf or Waterfront Property Operators--not occupied by the insured (lessor's risk only)",
  },
  {
    sicCode: 6512,
    riskCode: 21,
    description: '6512 21 E&S Group Only - Commercial',
  },
  {
    sicCode: 6512,
    riskCode: 22,
    description: '6512 22 E&S Group Only - Industrial/Manufacturing',
  },
  {
    sicCode: 6512,
    riskCode: 23,
    description: '6512 23 E&S Group Only - Vacant Land',
  },
  {
    sicCode: 6512,
    riskCode: 24,
    description: '6512 24 VENUES - Under 10,000 ',
  },
  {
    sicCode: 6512,
    riskCode: 25,
    description: '6512 25 VENUES - Over 10,000 & under 25,000',
  },
  {
    sicCode: 6512,
    riskCode: 26,
    description: '6512 26 VENUES - Over 25,000 & under 50,000',
  },
  {
    sicCode: 6512,
    riskCode: 27,
    description: '6512 27 VENUES - Over 50,000',
  },
  {
    sicCode: 6512,
    riskCode: 41,
    description:
      "6512 41 OBSP Specific - Operators of Nonresidential Buildings, NEC - Lessor's Risk",
  },
  {
    sicCode: 6512,
    riskCode: 42,
    description:
      "6512 42 OBSP Specific - Retail - Shop Ctrs - Malls - Lessor's Risk",
  },
  {
    sicCode: 6512,
    riskCode: 43,
    description: "6512 43 OBSP Specific - Retail - Shop Ctrs - Lessor's Risk",
  },
  {
    sicCode: 6513,
    riskCode: 1,
    description: '6513 1 Apartment Buildings Operators',
  },
  {
    sicCode: 6513,
    riskCode: 2,
    description:
      '6513 2 Apartment Buildings or Hotels Timesharing Operators-- less than 4 stories',
  },
  {
    sicCode: 6513,
    riskCode: 3,
    description:
      '6513 3 Apartment Buildings or Hotels Timesharing Operators--4 stories or more',
  },
  {
    sicCode: 6513,
    riskCode: 4,
    description: '6513 4 Apartment Buildings Operators--Garden',
  },
  {
    sicCode: 6513,
    riskCode: 5,
    description: '6513 5 Apartment Hotel Operators-- 4 stories or more',
  },
  {
    sicCode: 6513,
    riskCode: 6,
    description: '6513 6 Apartment Hotel Operators--less than 4 stories',
  },
  {
    sicCode: 6513,
    riskCode: 7,
    description:
      '6513 7 Condominium or Cooperative Apartments (ONLY for construction Masonry Non Combustible (C/S 4) or better)',
  },
  {
    sicCode: 6513,
    riskCode: 8,
    description: '6513 8 Apartment Buildings Operators - Podium',
  },
  {
    sicCode: 6513,
    riskCode: 41,
    description:
      "6513 41 OBSP Specific - Apartment Buildings Operators - Lessor's Risk",
  },
  {
    sicCode: 6514,
    riskCode: 1,
    description: "6514 1 Dwellings Operator - four family (lessor's risk only)",
  },
  {
    sicCode: 6514,
    riskCode: 2,
    description: "6514 2 Dwellings Operator- one family (lessor's risk only)",
  },
  {
    sicCode: 6514,
    riskCode: 3,
    description: "6514 3 Dwellings Operator - three family (lessor's risk only",
  },
  {
    sicCode: 6514,
    riskCode: 4,
    description: "6514 4 Dwellings  Operator- two family (lessor's risk only)",
  },
  {
    sicCode: 6515,
    riskCode: 1,
    description: '6515 1 Mobile Home Parks or Courts  Operator',
  },
  {
    sicCode: 6517,
    riskCode: 1,
    description: "6517 1 Lessor's of Railroad Property",
  },
  {
    sicCode: 6519,
    riskCode: 1,
    description: "6519 1 Lessor's of Real Property, NEC",
  },
  {
    sicCode: 6519,
    riskCode: 2,
    description:
      "6519 2 Property lessor's, Land--occupied by persons other than the insured for business purposes--(lessor's risk only)",
  },
  {
    sicCode: 6519,
    riskCode: 3,
    description:
      "6519 3 Property lessor's, Markets--not open air (lessor's risk only) Not For Profit only",
  },
  {
    sicCode: 6519,
    riskCode: 4,
    description:
      "6519 4 Property lessor's, Markets--not open air (lessor's risk only) Other than Not For Profit",
  },
  {
    sicCode: 6519,
    riskCode: 5,
    description:
      "6519 5 Property lessor's, Markets--open air (lessor's risk only) Not For Profit only",
  },
  {
    sicCode: 6519,
    riskCode: 6,
    description:
      "6519 6 Property lessor's, Markets--open air (lessor's risk only) Other than Not For Profit",
  },
  {
    sicCode: 6519,
    riskCode: 7,
    description: '6519 7 Property Management Firms',
  },
  {
    sicCode: 6519,
    riskCode: 8,
    description:
      "6519 8 Property lessor's, Race Tracks--motorized vehicles--lessor's risk only",
  },
  {
    sicCode: 6519,
    riskCode: 9,
    description: "6519 9 Property lessor's, Racing-- lessor's risk only",
  },
  {
    sicCode: 6519,
    riskCode: 10,
    description: "6519 10 Property lessor's, Agricultural & Airport Properties",
  },
  {
    sicCode: 6531,
    riskCode: 1,
    description: '6531 1 Real Estate Agents and Managers, NEC',
  },
  {
    sicCode: 6531,
    riskCode: 2,
    description: '6531 2 Real Estate Agents',
  },
  {
    sicCode: 6531,
    riskCode: 3,
    description:
      '6531 3 Real Estate Property Managed--residential and/or non-residential',
  },
  {
    sicCode: 6541,
    riskCode: 1,
    description: '6541 1 Title Abstract Offices',
  },
  {
    sicCode: 6552,
    riskCode: 1,
    description: '6552 1 Land Subdividers and Developers, Except Cemeteries',
  },
  {
    sicCode: 6553,
    riskCode: 1,
    description: '6553 1 Cemeteries-- Not For Profit only',
  },
  {
    sicCode: 6553,
    riskCode: 2,
    description: '6553 2 Cemeteries-- Other than Not For Profit',
  },
  {
    sicCode: 6553,
    riskCode: 3,
    description: '6553 3 Mausoleums-- Not For Profit only',
  },
  {
    sicCode: 6553,
    riskCode: 4,
    description: '6553 4 Mausoleums-- Other than Not For Profit',
  },
  {
    sicCode: 6712,
    riskCode: 1,
    description: '6712 1 Offices of Bank Holding Companies',
  },
  {
    sicCode: 6719,
    riskCode: 1,
    description: '6719 1 Offices of Holding Companies, NEC',
  },
  {
    sicCode: 6722,
    riskCode: 1,
    description: '6722 1 Management Investment Offices, Open-End',
  },
  {
    sicCode: 6726,
    riskCode: 1,
    description:
      '6726 1 Unit Investment Trusts, Face-Amount Certificate Offices, and Closed-End Management Investment Offices',
  },
  {
    sicCode: 6732,
    riskCode: 1,
    description: '6732 1 Education, Religious, and Charitable Trusts',
  },
  {
    sicCode: 6733,
    riskCode: 1,
    description: '6733 1 Trusts, Except Educational, Religious, and Charitable',
  },
  {
    sicCode: 6733,
    riskCode: 2,
    description: '6733 2 Land Trust',
  },
  {
    sicCode: 6792,
    riskCode: 1,
    description: '6792 1 Oil Royalty Traders',
  },
  {
    sicCode: 6794,
    riskCode: 1,
    description: "6794 1 Patent Owners and Lessor's",
  },
  {
    sicCode: 6798,
    riskCode: 1,
    description: '6798 1 Real Estate Investment Trusts',
  },
  {
    sicCode: 6798,
    riskCode: 2,
    description:
      '6798 2 Real Estate - Investment (no development and construction)',
  },
  {
    sicCode: 6799,
    riskCode: 1,
    description: '6799 1 Investors, NEC',
  },
  {
    sicCode: 6799,
    riskCode: 2,
    description:
      '6799 2 Miscellaneous Intermediation or Commodity Contracts Dealing',
  },
  {
    sicCode: 6799,
    riskCode: 3,
    description: '6799 3 Portfolio Management',
  },
  {
    sicCode: 7011,
    riskCode: 1,
    description: '7011 1 Bed and Breakfast Inns',
  },
  {
    sicCode: 7011,
    riskCode: 2,
    description: '7011 2 Hotels and Motels, NEC',
  },
  {
    sicCode: 7011,
    riskCode: 3,
    description: '7011 3 Gambling-- casinos--with hotel operations',
  },
  {
    sicCode: 7011,
    riskCode: 4,
    description: '7011 4 Gambling-- incidental to other operations',
  },
  {
    sicCode: 7011,
    riskCode: 5,
    description:
      "7011 5 Hotels and Motels--(lessor's risk only)-- four stories or more",
  },
  {
    sicCode: 7011,
    riskCode: 6,
    description:
      "7011 6 Hotels and Motels--(lessor's risk only)-- less than four stories",
  },
  {
    sicCode: 7011,
    riskCode: 7,
    description:
      '7011 7 Hotels and Motels--with pools or beaches-- less than four stories',
  },
  {
    sicCode: 7011,
    riskCode: 8,
    description:
      '7011 8 Hotels and Motels--with pools or beaches-- more than four stories',
  },
  {
    sicCode: 7011,
    riskCode: 9,
    description:
      '7011 9 Hotels and Motels--without pools or beaches-- four stories or more',
  },
  {
    sicCode: 7011,
    riskCode: 10,
    description:
      '7011 10 Hotels and Motels--without pools or beaches-- less than four stories',
  },
  {
    sicCode: 7011,
    riskCode: 11,
    description: '7011 11 Ski Areas/Resorts',
  },
  {
    sicCode: 7011,
    riskCode: 12,
    description: '7011 12 HOTEL - BOUTIQUE',
  },
  {
    sicCode: 7011,
    riskCode: 13,
    description: '7011 13 HOTEL - MAJOR CHAIN',
  },
  {
    sicCode: 7021,
    riskCode: 1,
    description: '7021 1 Boarding or Rooming Houses',
  },
  {
    sicCode: 7021,
    riskCode: 2,
    description: '7021 2 Schools--dormitory facilities-- Not For Profit only',
  },
  {
    sicCode: 7021,
    riskCode: 3,
    description:
      '7021 3 Schools--dormitory facilities-- Other than Not For Profit',
  },
  {
    sicCode: 7032,
    riskCode: 1,
    description: '7032 1 Camps-- For Profit',
  },
  {
    sicCode: 7032,
    riskCode: 2,
    description: '7032 2 Camps-- Not for Profit',
  },
  {
    sicCode: 7032,
    riskCode: 3,
    description: '7032 3 Dude Ranches',
  },
  {
    sicCode: 7032,
    riskCode: 4,
    description: '7032 4 Sporting and Recreational Camps, NEC',
  },
  {
    sicCode: 7032,
    riskCode: 5,
    description: '7032 5 Camps-- For Profit (Maine Only)',
  },
  {
    sicCode: 7033,
    riskCode: 1,
    description:
      '7033 1 Recreational Vehicle Parks and Campsites, Not For Profit only',
  },
  {
    sicCode: 7033,
    riskCode: 2,
    description:
      '7033 2 Recreational Vehicle Parks and Campsites, Other than Not For Profit only',
  },
  {
    sicCode: 7041,
    riskCode: 1,
    description:
      '7041 1 Organization Hotels and Lodging Houses, on Membership Basis',
  },
  {
    sicCode: 7211,
    riskCode: 1,
    description: '7211 1 Power Laundries, Family and Commercial',
  },
  {
    sicCode: 7212,
    riskCode: 1,
    description:
      '7212 1 Garment Pressing, and Agents for Laundries and Drycleaners',
  },
  {
    sicCode: 7213,
    riskCode: 1,
    description: '7213 1 Linen Supply',
  },
  {
    sicCode: 7215,
    riskCode: 1,
    description: '7215 1 Laundries and Dry Cleaners-- self service',
  },
  {
    sicCode: 7215,
    riskCode: 2,
    description: '7215 2 Washing Machines, Dryers or Ironers--coin meter type',
  },
  {
    sicCode: 7216,
    riskCode: 1,
    description: '7216 1 Laundries and Dry Cleaning Plants',
  },
  {
    sicCode: 7216,
    riskCode: 2,
    description: '7216 2 Laundry and Dry Cleaning or Dyeing Receiving Stations',
  },
  {
    sicCode: 7216,
    riskCode: 3,
    description: '7216 3 E&S Group Only - Dry Cleaner',
  },
  {
    sicCode: 7217,
    riskCode: 1,
    description: '7217 1 Carpet, Rug or Upholstery Cleaning--shop only',
  },
  {
    sicCode: 7217,
    riskCode: 2,
    description:
      "7217 2 Carpet, Rug, Furniture or Upholstery Cleaning--on customers' premises",
  },
  {
    sicCode: 7218,
    riskCode: 1,
    description: '7218 1 Industrial Launderers',
  },
  {
    sicCode: 7219,
    riskCode: 1,
    description: '7219 1 Laundry and Garment Services, NEC',
  },
  {
    sicCode: 7219,
    riskCode: 2,
    description: '7219 2 Diaper Services',
  },
  {
    sicCode: 7219,
    riskCode: 3,
    description: '7219 3 Tailors',
  },
  {
    sicCode: 7219,
    riskCode: 4,
    description: '7219 4 Fur Garments, Cleaning, Repair, Storage',
  },
  {
    sicCode: 7221,
    riskCode: 1,
    description: '7221 1 Photographers',
  },
  {
    sicCode: 7231,
    riskCode: 1,
    description: '7231 1 Beauty Parlors and Hair Styling Salons',
  },
  {
    sicCode: 7231,
    riskCode: 2,
    description: '7231 2 Day Spas',
  },
  {
    sicCode: 7231,
    riskCode: 3,
    description: '7231 3 Nail Salons',
  },
  {
    sicCode: 7241,
    riskCode: 1,
    description: '7241 1 Barber Shops',
  },
  {
    sicCode: 7251,
    riskCode: 1,
    description: '7251 1 Shoe Repair Shops and Shoeshine Parlors',
  },
  {
    sicCode: 7261,
    riskCode: 1,
    description: '7261 1 Crematories -- Not For Profit only',
  },
  {
    sicCode: 7261,
    riskCode: 2,
    description: '7261 2 Crematories -- Other than Not For Profit',
  },
  {
    sicCode: 7261,
    riskCode: 3,
    description: '7261 3 Funeral Homes or Chapels',
  },
  {
    sicCode: 7291,
    riskCode: 1,
    description: '7291 1 Tax Return Preparation Services',
  },
  {
    sicCode: 7299,
    riskCode: 1,
    description: '7299 1 Miscellaneous Personal Services, NEC',
  },
  {
    sicCode: 7299,
    riskCode: 2,
    description: '7299 2 Body Piercing Studios',
  },
  {
    sicCode: 7299,
    riskCode: 3,
    description:
      '7299 3 Concessionaires--Checkroom, shoeshine, or toilet concessions in hotels, restaurants, railroad stations, etc.',
  },
  {
    sicCode: 7299,
    riskCode: 4,
    description: '7299 4 Costume Rental',
  },
  {
    sicCode: 7299,
    riskCode: 5,
    description: '7299 5 Dating Services',
  },
  {
    sicCode: 7299,
    riskCode: 6,
    description: '7299 6 Astrology Offices',
  },
  {
    sicCode: 7299,
    riskCode: 7,
    description: '7299 7 Formal Wear or Costumes--rented to others',
  },
  {
    sicCode: 7299,
    riskCode: 8,
    description: '7299 8 Massage Therapists',
  },
  {
    sicCode: 7299,
    riskCode: 9,
    description: '7299 9 Modeling Agencies',
  },
  {
    sicCode: 7299,
    riskCode: 10,
    description: '7299 10 Personal Care Services, NEC',
  },
  {
    sicCode: 7299,
    riskCode: 11,
    description: '7299 11 Personal Trainers',
  },
  {
    sicCode: 7299,
    riskCode: 12,
    description: '7299 12 Sun Tanning Salons',
  },
  {
    sicCode: 7299,
    riskCode: 13,
    description: '7299 13 Tattoo Parlors',
  },
  {
    sicCode: 7299,
    riskCode: 14,
    description: '7299 14 Wedding Consultants',
  },
  {
    sicCode: 7299,
    riskCode: 15,
    description: '7299 15 Weight Loss Centers',
  },
  {
    sicCode: 7311,
    riskCode: 1,
    description: '7311 1 Advertising Agencies',
  },
  {
    sicCode: 7311,
    riskCode: 2,
    description: '7311 2 Sponsorship Liability',
  },
  {
    sicCode: 7312,
    riskCode: 1,
    description:
      '7312 1 Advertising Sign Companies-- outdoor--No erecting or preparing billboards',
  },
  {
    sicCode: 7312,
    riskCode: 2,
    description:
      '7312 2 Advertising Sign Companies-- outdoor--With erecting or preparing billboards',
  },
  {
    sicCode: 7312,
    riskCode: 3,
    description: '7312 3 Marketing and Advertising Companies',
  },
  {
    sicCode: 7313,
    riskCode: 1,
    description:
      "7313 1 Radio, Television, and Publishers' Advertising Representatives",
  },
  {
    sicCode: 7319,
    riskCode: 1,
    description: '7319 1 Aerial Advertising',
  },
  {
    sicCode: 7319,
    riskCode: 2,
    description: '7319 2 Advertising, NEC',
  },
  {
    sicCode: 7322,
    riskCode: 1,
    description: '7322 1 Adjustment & Collection Services',
  },
  {
    sicCode: 7323,
    riskCode: 1,
    description: '7323 1 Credit Reporting Services',
  },
  {
    sicCode: 7331,
    riskCode: 1,
    description: '7331 1 Direct Mail Advertising Services',
  },
  {
    sicCode: 7334,
    riskCode: 1,
    description:
      '7334 1 Copying and Duplicating Services- retail with delivery',
  },
  {
    sicCode: 7334,
    riskCode: 2,
    description:
      '7334 2 Copying and Duplicating Services- retail without delivery',
  },
  {
    sicCode: 7335,
    riskCode: 1,
    description: '7335 1 Commercial Photography',
  },
  {
    sicCode: 7335,
    riskCode: 2,
    description: '7335 2 ABC Program Only-Aerial Photographic Service',
  },
  {
    sicCode: 7336,
    riskCode: 1,
    description: '7336 1 Commercial Art and Graphic Design',
  },
  {
    sicCode: 7338,
    riskCode: 1,
    description: '7338 1 Secretarial and Court Reporting Services',
  },
  {
    sicCode: 7342,
    riskCode: 1,
    description: '7342 1 Exterminators',
  },
  {
    sicCode: 7342,
    riskCode: 2,
    description: '7342 2 Fumigating',
  },
  {
    sicCode: 7342,
    riskCode: 3,
    description: '7342 3 Pest Control Services',
  },
  {
    sicCode: 7349,
    riskCode: 1,
    description: '7349 1 Building Cleaning and Maintenance Services, NEC',
  },
  {
    sicCode: 7349,
    riskCode: 2,
    description: '7349 2 Chimney Cleaning',
  },
  {
    sicCode: 7349,
    riskCode: 3,
    description: '7349 3 Floor Waxing',
  },
  {
    sicCode: 7349,
    riskCode: 4,
    description: '7349 4 Janitorial Services',
  },
  {
    sicCode: 7349,
    riskCode: 5,
    description: '7349 5 Window Cleaning',
  },
  {
    sicCode: 7349,
    riskCode: 6,
    description: '7349 6 E&S Group only - Janitorial',
  },
  {
    sicCode: 7352,
    riskCode: 1,
    description: '7352 1 Medical Equipment Rental and Leasing',
  },
  {
    sicCode: 7353,
    riskCode: 1,
    description:
      '7353 1 Contractors Equipment -- cranes, derricks, power shovels and equipment incidental thereto-- rented to others with operators',
  },
  {
    sicCode: 7353,
    riskCode: 2,
    description:
      '7353 2 Contractors Equipment -- cranes, derricks, power shovels and equipment incidental thereto-- rented to others without operators',
  },
  {
    sicCode: 7353,
    riskCode: 3,
    description:
      '7353 3 Contractors Equipment -- earth moving equipment other than cranes, derricks and power shovels--rented to others with operators',
  },
  {
    sicCode: 7353,
    riskCode: 4,
    description:
      '7353 4 Contractors Equipment -- earth moving equipment other than cranes, derricks and power shovels--rented to others without operators',
  },
  {
    sicCode: 7353,
    riskCode: 5,
    description:
      '7353 5 Contractors Equipment -- excluding automobiles-- rented to others without operators',
  },
  {
    sicCode: 7353,
    riskCode: 6,
    description:
      '7353 6 Contractors Equipment -- excluding automobiles--rented to others with operators',
  },
  {
    sicCode: 7353,
    riskCode: 7,
    description:
      '7353 7 Contractors Equipment -- hod or material platform hoists and equipment incidental thereto--rented to others with operators',
  },
  {
    sicCode: 7353,
    riskCode: 8,
    description:
      '7353 8 Contractors Equipment -- hod or material platform hoists and equipment incidental thereto--rented to others without operators',
  },
  {
    sicCode: 7353,
    riskCode: 9,
    description:
      '7353 9 Contractors Equipment -- ladders, scaffolding, sidewalk bridges, towers and equipment incidental thereto--rented to others',
  },
  {
    sicCode: 7353,
    riskCode: 10,
    description:
      '7353 10 Contractors Equipment -- steam boilers, compressors, air pressure tanks, pneumatic tools and equipment incidental thereto--rented to others with operators',
  },
  {
    sicCode: 7353,
    riskCode: 11,
    description:
      '7353 11 Contractors Equipment -- steam boilers, compressors, air pressure tanks, pneumatic tools and equipment incidental thereto--rented to others without operators',
  },
  {
    sicCode: 7353,
    riskCode: 12,
    description: '7353 12 Heavy Construction Equipment Rental and Leasing, NEC',
  },
  {
    sicCode: 7359,
    riskCode: 1,
    description:
      '7359 1 Rental Houses - Mainly Cameras & Grip (No Lighting, Sound or Installation)',
  },
  {
    sicCode: 7359,
    riskCode: 2,
    description:
      '7359 2 Rental Houses - Stage or Bleacher construction or rentals',
  },
  {
    sicCode: 7359,
    riskCode: 3,
    description: '7359 3 Rental Houses (Lighting, Sound or Installation)',
  },
  {
    sicCode: 7359,
    riskCode: 4,
    description: '7359 4 Rental and Leasing, Other Commercial and Industrial',
  },
  {
    sicCode: 7359,
    riskCode: 5,
    description: '7359 5 Rental and Leasing, Pianos',
  },
  {
    sicCode: 7359,
    riskCode: 6,
    description: '7359 6 Contractors Equipment Rental - Entertainment ',
  },
  {
    sicCode: 7359,
    riskCode: 7,
    description: '7359 7 Rental Stores',
  },
  {
    sicCode: 7359,
    riskCode: 8,
    description: '7359 8 Auto - Equipment Rental Agencies - Entertainment ',
  },
  {
    sicCode: 7359,
    riskCode: 9,
    description: '7359 9 Tent or Canopies--loaned or rented to others',
  },
  {
    sicCode: 7359,
    riskCode: 10,
    description:
      '7359 10 Energy Program Only - Rental and Leasing, Other Commercial and Industrial',
  },
  {
    sicCode: 7361,
    riskCode: 1,
    description: '7361 1 Employee Placement Services',
  },
  {
    sicCode: 7361,
    riskCode: 2,
    description: '7361 2 Employment Agencies - Government Non-Government',
  },
  {
    sicCode: 7361,
    riskCode: 3,
    description: '7361 3 Medical Staffing',
  },
  {
    sicCode: 7363,
    riskCode: 1,
    description: '7363 1 Employee Leasing',
  },
  {
    sicCode: 7363,
    riskCode: 2,
    description: '7363 2 Connecticut Branch Only - Temporary Help',
  },
  {
    sicCode: 7371,
    riskCode: 1,
    description: '7371 1 Computer Consulting or Programming',
  },
  {
    sicCode: 7371,
    riskCode: 2,
    description:
      '7371 2 Computer Consulting or Programming - Low Hazard: Calculations, Computational Pgrms, Computer Based Training, Educational Graphics, Home Recreational, Office Automation, Staff Outsourcing, Personal Productivity, Temp Staffing Services, Wordprocessing',
  },
  {
    sicCode: 7371,
    riskCode: 3,
    description: '7371 3 Computer Consulting or Programming - Medium Hazard:',
  },
  {
    sicCode: 7371,
    riskCode: 4,
    description: '7371 4 Computer Consulting or Programming - High Hazard',
  },
  {
    sicCode: 7372,
    riskCode: 1,
    description:
      '7372 1 Computer Software Mfg.--Pre-packaged / Software Development Firms',
  },
  {
    sicCode: 7372,
    riskCode: 2,
    description:
      '7372 2 Computer Software Mfg.--Pre-packaged/ Software Development Firms- Low Hazard: Calculations, Computational Pgrms, Computer Based Training, Educational Graphics, Home Recreational, Office Automation, Staff Outsourcing, Personal Productivity, Wordprocessing.',
  },
  {
    sicCode: 7372,
    riskCode: 3,
    description:
      '7372 3 Computer Software Mfg.--Pre-packaged / Software Development Firms - Medium Hazard',
  },
  {
    sicCode: 7372,
    riskCode: 4,
    description:
      '7372 4 Computer Software Mfg.--Pre-packaged / Software Development Firms - High Hazard',
  },
  {
    sicCode: 7373,
    riskCode: 1,
    description: '7373 1 Computer Integrated Systems Design',
  },
  {
    sicCode: 7373,
    riskCode: 2,
    description: '7373 2 Website Design Firms',
  },
  {
    sicCode: 7374,
    riskCode: 1,
    description: '7374 1 Computer Data Processing-operations',
  },
  {
    sicCode: 7374,
    riskCode: 2,
    description: '7374 2 Computer Data Processing-time sharing',
  },
  {
    sicCode: 7375,
    riskCode: 1,
    description: '7375 1 Information Retrieval Services - NEC',
  },
  {
    sicCode: 7375,
    riskCode: 2,
    description:
      '7375 2 Information Retrieval Services - High Hazard: Application Service Providers, Database Information Retrieval, Data Verification, Document Retrieval, E-Commerce Enabling, Information Retrieval, Internet Service Providers.',
  },
  {
    sicCode: 7376,
    riskCode: 1,
    description: '7376 1 Computer Facilities Management Services',
  },
  {
    sicCode: 7377,
    riskCode: 1,
    description: '7377 1 Computer Rental and Leasing',
  },
  {
    sicCode: 7378,
    riskCode: 1,
    description: '7378 1 Computer Maintenance and Repair',
  },
  {
    sicCode: 7379,
    riskCode: 1,
    description: '7379 1 Computer Related Services, NEC',
  },
  {
    sicCode: 7379,
    riskCode: 2,
    description: '7379 2 Disaster Recovery Services, computer related only',
  },
  {
    sicCode: 7379,
    riskCode: 3,
    description: '7379 3 Computer Related Services - Low Hazard',
  },
  {
    sicCode: 7379,
    riskCode: 4,
    description: '7379 4 Computer Related Services - Medium Hazard',
  },
  {
    sicCode: 7379,
    riskCode: 5,
    description: '7379 5 Computer Related Services - High Hazard',
  },
  {
    sicCode: 7381,
    riskCode: 1,
    description: '7381 1 Armored Car Service Companies',
  },
  {
    sicCode: 7381,
    riskCode: 2,
    description: '7381 2 Detective or Investigative Agencies--private',
  },
  {
    sicCode: 7381,
    riskCode: 3,
    description: '7381 3 Security and Patrol Agencies',
  },
  {
    sicCode: 7382,
    riskCode: 1,
    description: '7382 1 Alarm Systems Dealers and Installers',
  },
  {
    sicCode: 7382,
    riskCode: 2,
    description:
      '7382 2 Alarms--security systems--monitoring ( Including Central Station Alarm Monitoring Facilities)',
  },
  {
    sicCode: 7383,
    riskCode: 1,
    description: '7383 1 News Syndicates',
  },
  {
    sicCode: 7384,
    riskCode: 1,
    description: '7384 1 Photofinishing Laboratories',
  },
  {
    sicCode: 7389,
    riskCode: 1,
    description: '7389 1 Business Services, NEC',
  },
  {
    sicCode: 7389,
    riskCode: 2,
    description: '7389 2 Alternative Dispute Resolution Firms',
  },
  {
    sicCode: 7389,
    riskCode: 3,
    description: '7389 3 Appraisers',
  },
  {
    sicCode: 7389,
    riskCode: 4,
    description:
      '7389 4 Auctioneers--sales conducted away from the insured premises',
  },
  {
    sicCode: 7389,
    riskCode: 5,
    description: '7389 5 Bail Bondsmen',
  },
  {
    sicCode: 7389,
    riskCode: 6,
    description: '7389 6 Commercial Diving Contractors',
  },
  {
    sicCode: 7389,
    riskCode: 7,
    description: '7389 7 Consultants--NEC',
  },
  {
    sicCode: 7389,
    riskCode: 8,
    description:
      "7389 8 Conventions (sponsor's risk only)- Not For Profit only",
  },
  {
    sicCode: 7389,
    riskCode: 9,
    description:
      "7389 9 Conventions (sponsor's risk only)- Other than Not For Profit",
  },
  {
    sicCode: 7389,
    riskCode: 10,
    description:
      '7389 10 Disaster Recovery Services (other than computer related)',
  },
  {
    sicCode: 7389,
    riskCode: 11,
    description: '7389 11 Draftsmen',
  },
  {
    sicCode: 7389,
    riskCode: 12,
    description: '7389 12 Interior Designers',
  },
  {
    sicCode: 7389,
    riskCode: 13,
    description: '7389 13 Inventory Services',
  },
  {
    sicCode: 7389,
    riskCode: 14,
    description:
      '7389 14 Mail Receiving Services, Mail Box or Packaging Stores',
  },
  {
    sicCode: 7389,
    riskCode: 15,
    description: '7389 15 Micrographic Service Bureaus',
  },
  {
    sicCode: 7389,
    riskCode: 16,
    description: '7389 16 Online Auction Houses',
  },
  {
    sicCode: 7389,
    riskCode: 17,
    description: '7389 17 Recording Studios',
  },
  {
    sicCode: 7389,
    riskCode: 18,
    description: '7389 18 Recycling Collection Centers--Not For Profit only',
  },
  {
    sicCode: 7389,
    riskCode: 19,
    description:
      '7389 19 Recycling Collection Centers--Other than Not For Profit',
  },
  {
    sicCode: 7389,
    riskCode: 20,
    description:
      '7389 20 Sales or Service Organizations--including Telemarketing Bureaus',
  },
  {
    sicCode: 7389,
    riskCode: 21,
    description: '7389 21 Sign Painting or Lettering--inside of buildings',
  },
  {
    sicCode: 7389,
    riskCode: 22,
    description:
      '7389 22 Sign Painting or Lettering--on buildings or structures',
  },
  {
    sicCode: 7389,
    riskCode: 23,
    description: '7389 23 Swimming Pool Servicing',
  },
  {
    sicCode: 7389,
    riskCode: 24,
    description: '7389 24 Telephone Answering Services',
  },
  {
    sicCode: 7389,
    riskCode: 25,
    description: '7389 25 Window Decorating',
  },
  {
    sicCode: 7389,
    riskCode: 26,
    description: '7389 26 NON APPEARANCE',
  },
  {
    sicCode: 7389,
    riskCode: 27,
    description:
      '7389 27 CANCELLATION of the EVENT - Not including Non Appearance',
  },
  {
    sicCode: 7389,
    riskCode: 28,
    description: '7389 28 WEATHER',
  },
  {
    sicCode: 7389,
    riskCode: 29,
    description: '7389 29 Prize indemnity Risk',
  },
  {
    sicCode: 7389,
    riskCode: 30,
    description: '7389 30 OVER REDEMPTION',
  },
  {
    sicCode: 7389,
    riskCode: 31,
    description:
      '7389 31 TRANSMISSION FAILURE - Point to Point Cover not Pay per View',
  },
  {
    sicCode: 7389,
    riskCode: 32,
    description: '7389 32 PAY per VIEW - Transmission Cover to the Customer',
  },
  {
    sicCode: 7389,
    riskCode: 33,
    description: '7389 33 CONTRACT BONUS',
  },
  {
    sicCode: 7389,
    riskCode: 34,
    description: '7389 34 FILM BONDS',
  },
  {
    sicCode: 7389,
    riskCode: 35,
    description: '7389 35 EXCESS PORTFOLIO COVER',
  },
  {
    sicCode: 7513,
    riskCode: 1,
    description: '7513 1 Truck Rental and Leasing, Without Drivers',
  },
  {
    sicCode: 7514,
    riskCode: 1,
    description: '7514 1 Automobile Renting or Leasing Companies',
  },
  {
    sicCode: 7515,
    riskCode: 1,
    description: '7515 1 Passenger Car Leasing',
  },
  {
    sicCode: 7519,
    riskCode: 1,
    description: '7519 1 Utility Trailer and Recreational Vehicle Rental',
  },
  {
    sicCode: 7521,
    riskCode: 1,
    description: '7521 1 Automobile Storage',
  },
  {
    sicCode: 7521,
    riskCode: 2,
    description: '7521 2 Automotive Parking--private',
  },
  {
    sicCode: 7521,
    riskCode: 3,
    description: '7521 3 Automotive Parking--public--not open air',
  },
  {
    sicCode: 7521,
    riskCode: 4,
    description: '7521 4 Automotive Parking--public--open air',
  },
  {
    sicCode: 7521,
    riskCode: 5,
    description:
      "7521 5 Automotive Parking--public--shopping centers--maintained by lessee (lessor's risk only)",
  },
  {
    sicCode: 7521,
    riskCode: 6,
    description:
      "7521 6 Automotive Parking--public--shopping centers--maintained by the insured (lessor's risk only)",
  },
  {
    sicCode: 7521,
    riskCode: 41,
    description:
      "7521 41 OBSP Specific - Automotive Parking - public - not open air - Lessor's Risk",
  },
  {
    sicCode: 7532,
    riskCode: 1,
    description:
      '7532 1 Automotive Top, Body, and Upholstery Repair Shops and Paint Shops',
  },
  {
    sicCode: 7533,
    riskCode: 1,
    description: '7533 1 Automotive Exhaust System Repair Shops',
  },
  {
    sicCode: 7534,
    riskCode: 1,
    description: '7534 1 Tire Retreading and Repair Shops',
  },
  {
    sicCode: 7536,
    riskCode: 1,
    description: '7536 1 Automotive Glass Replacement Shops',
  },
  {
    sicCode: 7537,
    riskCode: 1,
    description: '7537 1 Automotive Transmission Repair Shops',
  },
  {
    sicCode: 7538,
    riskCode: 1,
    description: '7538 1 General Automotive Repair Shops',
  },
  {
    sicCode: 7539,
    riskCode: 1,
    description:
      '7539 1 Automobile Repair or Service Mechanical Only-- no brake or clutch work',
  },
  {
    sicCode: 7539,
    riskCode: 2,
    description:
      '7539 2 Automobile Repair or Service Mechanical Only--with brake or clutch work',
  },
  {
    sicCode: 7539,
    riskCode: 3,
    description: '7539 3 Automobile Repair Shops--self service',
  },
  {
    sicCode: 7542,
    riskCode: 1,
    description: '7542 1 Car Washes-- other than self service',
  },
  {
    sicCode: 7542,
    riskCode: 2,
    description: '7542 2 Car Washes--self service',
  },
  {
    sicCode: 7549,
    riskCode: 1,
    description: '7549 1 Automobile Quick Lubrication Services',
  },
  {
    sicCode: 7549,
    riskCode: 2,
    description: '7549 2 Automobile Rust proofing',
  },
  {
    sicCode: 7549,
    riskCode: 3,
    description: '7549 3 Automotive Towing and Recovery',
  },
  {
    sicCode: 7549,
    riskCode: 4,
    description: '7549 4 Automotive services, NEC',
  },
  {
    sicCode: 7622,
    riskCode: 1,
    description: '7622 1 Automotive Stereo Shops (Sales and Installation)',
  },
  {
    sicCode: 7622,
    riskCode: 2,
    description: '7622 2 Radio and Television Repair Shops',
  },
  {
    sicCode: 7623,
    riskCode: 1,
    description:
      '7623 1 Refrigeration and Air-Conditioning Services and Repair Shops',
  },
  {
    sicCode: 7629,
    riskCode: 1,
    description: '7629 1 Appliance Distributors--household type',
  },
  {
    sicCode: 7629,
    riskCode: 2,
    description:
      '7629 2 Appliance Distributors--household-type--radio, television or compact disc players',
  },
  {
    sicCode: 7629,
    riskCode: 3,
    description:
      '7629 3 Appliances and Accessories--installation, servicing or repair--commercial',
  },
  {
    sicCode: 7629,
    riskCode: 4,
    description:
      '7629 4 Appliances and Accessories--installation, servicing or repair--household',
  },
  {
    sicCode: 7629,
    riskCode: 5,
    description:
      '7629 5 Office Machines or Appliances --installation, inspection, adjustment or repair-',
  },
  {
    sicCode: 7629,
    riskCode: 6,
    description: '7629 6 Electrical and Electronic Repair Shops, NEC',
  },
  {
    sicCode: 7631,
    riskCode: 1,
    description: '7631 1 Watch, Clock, and Jewelry Repair',
  },
  {
    sicCode: 7641,
    riskCode: 1,
    description:
      '7641 1 Furniture or Woodwork Stripping, Refinishing or Repairing',
  },
  {
    sicCode: 7641,
    riskCode: 2,
    description: '7641 2 Reupholstering',
  },
  {
    sicCode: 7692,
    riskCode: 1,
    description: '7692 1 Welding Repair',
  },
  {
    sicCode: 7694,
    riskCode: 1,
    description: '7694 1 Armature Rewinding Shops',
  },
  {
    sicCode: 7699,
    riskCode: 1,
    description: '7699 1 Agricultural Equipment and Machinery',
  },
  {
    sicCode: 7699,
    riskCode: 2,
    description: '7699 2 Repair Shops and Related Services, NEC',
  },
  {
    sicCode: 7699,
    riskCode: 3,
    description: '7699 3 Appliance Repair',
  },
  {
    sicCode: 7699,
    riskCode: 4,
    description: '7699 4 Bicycle Shops - Repair',
  },
  {
    sicCode: 7699,
    riskCode: 5,
    description:
      '7699 5 Blacksmithing with 10% or more sales of weapons and weapons accessories',
  },
  {
    sicCode: 7699,
    riskCode: 6,
    description:
      '7699 6 Blacksmithing with less than 10% sales of weapons and weapons accessories',
  },
  {
    sicCode: 7699,
    riskCode: 7,
    description: '7699 7 Boiler Maintenance Contractors',
  },
  {
    sicCode: 7699,
    riskCode: 8,
    description:
      '7699 8 Commercial and Industrial Machinery and Equipment (except Automotive and Electronic)',
  },
  {
    sicCode: 7699,
    riskCode: 9,
    description: '7699 9 Computer and Office Machine',
  },
  {
    sicCode: 7699,
    riskCode: 10,
    description: '7699 10 Consumer Electronics',
  },
  {
    sicCode: 7699,
    riskCode: 11,
    description: '7699 11 Gunsmiths',
  },
  {
    sicCode: 7699,
    riskCode: 12,
    description: '7699 12 Hazardous Waste Site Mitigation Contractors',
  },
  {
    sicCode: 7699,
    riskCode: 13,
    description: '7699 13 Home and Garden Equipment',
  },
  {
    sicCode: 7699,
    riskCode: 14,
    description: '7699 14 Locksmiths',
  },
  {
    sicCode: 7699,
    riskCode: 15,
    description: '7699 15 Electronic and Precision Equipment Repair, NEC',
  },
  {
    sicCode: 7699,
    riskCode: 16,
    description: '7699 16 Personal and Household Goods Repair, NEC',
  },
  {
    sicCode: 7699,
    riskCode: 17,
    description: '7699 17 Piano Tuning',
  },
  {
    sicCode: 7699,
    riskCode: 18,
    description: '7699 18 Septic Tank Systems--cleaning',
  },
  {
    sicCode: 7699,
    riskCode: 19,
    description: '7699 19 Sewer Cleaning',
  },
  {
    sicCode: 7699,
    riskCode: 20,
    description: '7699 20 Ship Ceiling or Scaling',
  },
  {
    sicCode: 7699,
    riskCode: 21,
    description: '7699 21 Taxidermists',
  },
  {
    sicCode: 7812,
    riskCode: 1,
    description:
      '7812 1 Television - Reality Television - GPC of $1 - $10 Million',
  },
  {
    sicCode: 7812,
    riskCode: 2,
    description:
      '7812 2 Television - Scripted Television - GPC of $1 - $10 Million',
  },
  {
    sicCode: 7812,
    riskCode: 3,
    description: '7812 3 DICE - Standard DICE',
  },
  {
    sicCode: 7812,
    riskCode: 4,
    description: '7812 4 DICE - Wrap-Up',
  },
  {
    sicCode: 7812,
    riskCode: 5,
    description: '7812 5 DICE - Online',
  },
  {
    sicCode: 7812,
    riskCode: 6,
    description:
      '7812 6 Motion Picture (Feature Films) - Made for TV Movie (Movie of the Week)',
  },
  {
    sicCode: 7812,
    riskCode: 7,
    description:
      '7812 7 Motion Picture (Feature Films) - $1 Million GPC to $10 Million GPC',
  },
  {
    sicCode: 7812,
    riskCode: 8,
    description:
      '7812 8 Motion Picture (Feature Films) - $10 Million GPC to $60 Million GPC',
  },
  {
    sicCode: 7812,
    riskCode: 9,
    description: '7812 9 Blanket Film and TV Program',
  },
  {
    sicCode: 7812,
    riskCode: 10,
    description:
      '7812 10 Motion Picture (Feature Films) - Over $60 Million GPC',
  },
  {
    sicCode: 7812,
    riskCode: 11,
    description:
      '7812 11 Television - Reality Television - GPC of $10 - $60 Million',
  },
  {
    sicCode: 7812,
    riskCode: 12,
    description:
      '7812 12 Television - Scripted Television - GPC of $10 - $60 Million',
  },
  {
    sicCode: 7812,
    riskCode: 13,
    description: '7812 13 DICE - Small DICE (GPC Below $1 Million)',
  },
  {
    sicCode: 7812,
    riskCode: 14,
    description: '7812 14 DICE - Documentaries (60 Minutes or More)',
  },
  {
    sicCode: 7812,
    riskCode: 17,
    description:
      '7812 17 Motion Picture (Feature Films) - Animation - GPC of $1 - $10 Million',
  },
  {
    sicCode: 7812,
    riskCode: 18,
    description:
      '7812 18 Motion Picture (Feature Films) - Animation - GPC of $10 - $60 Million',
  },
  {
    sicCode: 7812,
    riskCode: 19,
    description:
      '7812 19 Motion Picture (Feature Films) - Blanket Feature Film Program',
  },
  {
    sicCode: 7812,
    riskCode: 20,
    description:
      '7812 20 Motion Picture (Feature Films) - Animation - GPC over $60 Million',
  },
  {
    sicCode: 7812,
    riskCode: 21,
    description:
      '7812 21 Television - Reality Television - GPC over $60 Million',
  },
  {
    sicCode: 7812,
    riskCode: 22,
    description:
      '7812 22 Television - Scripted Television - GPC over $60 Million',
  },
  {
    sicCode: 7812,
    riskCode: 25,
    description: '7812 25 FILM BONDS',
  },
  {
    sicCode: 7812,
    riskCode: 26,
    description: '7812 26 AVAILABLE',
  },
  {
    sicCode: 7812,
    riskCode: 41,
    description: '7812 41 Television - Animation - GPC of $1 - $10 Million',
  },
  {
    sicCode: 7812,
    riskCode: 42,
    description: '7812 42 Television - Animation - GPC of $10 - $60 Million',
  },
  {
    sicCode: 7812,
    riskCode: 51,
    description: '7812 51 Television - Animation - GPC over $60 Million',
  },
  {
    sicCode: 7812,
    riskCode: 61,
    description: '7812 61 Television - Blanket Television Program',
  },
  {
    sicCode: 7819,
    riskCode: 1,
    description: '7819 1 Editing Facilities Including Post Production',
  },
  {
    sicCode: 7819,
    riskCode: 2,
    description: '7819 2 Studio Rental',
  },
  {
    sicCode: 7819,
    riskCode: 3,
    description: '7819 3 FILM DEVELOPING AND PRINTING',
  },
  {
    sicCode: 7822,
    riskCode: 1,
    description: '7822 1 Distributors - Film, Music & other media',
  },
  {
    sicCode: 7829,
    riskCode: 1,
    description: '7829 1 Services Allied to Motion Picture Distribution',
  },
  {
    sicCode: 7832,
    riskCode: 1,
    description: '7832 1 Motion Picture Theaters-- Not For Profit only',
  },
  {
    sicCode: 7832,
    riskCode: 2,
    description: '7832 2 Movie Theaters-- Indoor ',
  },
  {
    sicCode: 7833,
    riskCode: 1,
    description: '7833 1 Drive-In Motion Picture Theaters',
  },
  {
    sicCode: 7841,
    riskCode: 1,
    description: '7841 1 Video Tape Rental',
  },
  {
    sicCode: 7841,
    riskCode: 2,
    description: '7841 2 Adult Entertainment',
  },
  {
    sicCode: 7911,
    riskCode: 1,
    description: '7911 1 Dance Studios, Schools, and Halls',
  },
  {
    sicCode: 7922,
    riskCode: 1,
    description: '7922 1 Theatre Producers - On Broadway',
  },
  {
    sicCode: 7922,
    riskCode: 2,
    description: '7922 2 Theatres - Live Travelling',
  },
  {
    sicCode: 7922,
    riskCode: 3,
    description: '7922 3 Theatre Plays - Off Broadway',
  },
  {
    sicCode: 7922,
    riskCode: 4,
    description: '7922 4 PROMOTERS - Theatrical',
  },
  {
    sicCode: 7922,
    riskCode: 5,
    description: '7922 5 THEATERS PLAYS - OTHER AREAS STATIC',
  },
  {
    sicCode: 7922,
    riskCode: 6,
    description: '7922 6 Ticket Agencies',
  },
  {
    sicCode: 7929,
    riskCode: 1,
    description: '7929 1 Shell',
  },
  {
    sicCode: 7929,
    riskCode: 2,
    description: '7929 2 Touring Entertainers',
  },
  {
    sicCode: 7929,
    riskCode: 3,
    description: '7929 3 Promoters - Concerts',
  },
  {
    sicCode: 7929,
    riskCode: 4,
    description: '7929 4 Promoters - Events NOC',
  },
  {
    sicCode: 7929,
    riskCode: 5,
    description: '7929 5 PROMOTERS -Sporting Events',
  },
  {
    sicCode: 7929,
    riskCode: 6,
    description: '7929 6 TOURING ENTERTAINERS - Country',
  },
  {
    sicCode: 7929,
    riskCode: 7,
    description: '7929 7 PROMOTERS - Corporate Events',
  },
  {
    sicCode: 7929,
    riskCode: 8,
    description: '7929 8 PRODUCERS - Contingent Exposure',
  },
  {
    sicCode: 7929,
    riskCode: 9,
    description: '7929 9 FOR FUTURE USE',
  },
  {
    sicCode: 7929,
    riskCode: 10,
    description:
      '7929 10 PARTY PLANNERS. Entities that primarily organize corporate events, corporate parties. Inflatables and Over 5,000 persons',
  },
  {
    sicCode: 7929,
    riskCode: 11,
    description: '7929 11 SHELL, TOURING, ENTERTAINERS, Class 4',
  },
  {
    sicCode: 7929,
    riskCode: 12,
    description: '7929 12 FOR FUTURE USE',
  },
  {
    sicCode: 7929,
    riskCode: 13,
    description: '7929 13 FOR FUTURE USE',
  },
  {
    sicCode: 7933,
    riskCode: 1,
    description: '7933 1 Bowling Centers',
  },
  {
    sicCode: 7941,
    riskCode: 1,
    description: '7941 1 Professional Sports Clubs and Promoters, NEC',
  },
  {
    sicCode: 7941,
    riskCode: 2,
    description:
      '7941 2 Athletic Teams--professional or semi- professional--(sport teams and clubs)',
  },
  {
    sicCode: 7941,
    riskCode: 3,
    description:
      '7941 3 SPORTS ASSOCIATION - PROFESSIONAL - Major Sports such as NBA, NFL, etc. ',
  },
  {
    sicCode: 7948,
    riskCode: 1,
    description:
      '7948 1 Motor Sports Motorracng Venue - Over 10,000 attendance',
  },
  {
    sicCode: 7948,
    riskCode: 2,
    description: "7948 2 Race Tracks--motorized vehicles--sponsor's risk only",
  },
  {
    sicCode: 7948,
    riskCode: 3,
    description:
      '7948 3 Motor Sports Motorracng Venue - Under 10,000 attendance',
  },
  {
    sicCode: 7948,
    riskCode: 4,
    description: '7948 4 Equestrian - Horse Racing Tracks',
  },
  {
    sicCode: 7948,
    riskCode: 5,
    description:
      '7948 5 Stables and Riding Academies - Only as part of a Venue',
  },
  {
    sicCode: 7948,
    riskCode: 6,
    description:
      '7948 6 MOTOR SPORTS ASSOCIATION - Major National/International ',
  },
  {
    sicCode: 7948,
    riskCode: 7,
    description: '7948 7 MOTOR SPORTS ASSOCIATION - Small Associations',
  },
  {
    sicCode: 7948,
    riskCode: 8,
    description: '7948 8 MOTOR SPORTS-KARTING CENTRE - MOTOR RACING',
  },
  {
    sicCode: 7948,
    riskCode: 9,
    description: '7948 9 Motor Racing - TULIP ',
  },
  {
    sicCode: 7948,
    riskCode: 10,
    description: '7948 10 SPORTS SCHOOL - MOTOR RACING ',
  },
  {
    sicCode: 7948,
    riskCode: 11,
    description: '7948 11 MOTOR SPORTS TEAMS ',
  },
  {
    sicCode: 7948,
    riskCode: 12,
    description: '7948 12 DOG TRACKS',
  },
  {
    sicCode: 7991,
    riskCode: 1,
    description: '7991 1 Exercise Studios',
  },
  {
    sicCode: 7991,
    riskCode: 2,
    description: '7991 2 Health or Exercise Clubs',
  },
  {
    sicCode: 7991,
    riskCode: 3,
    description: '7991 3 Health or Exercise Facilities-- commercially operated',
  },
  {
    sicCode: 7991,
    riskCode: 4,
    description: '7991 4 Racquet Sports and Handball Facilities',
  },
  {
    sicCode: 7991,
    riskCode: 5,
    description: '7991 5 Physical Fitness Facilities, NEC',
  },
  {
    sicCode: 7991,
    riskCode: 6,
    description: '7991 6 HEALTH CLUB',
  },
  {
    sicCode: 7992,
    riskCode: 1,
    description:
      '7992 1 Golf Courses--municipal or public--not golf or country clubs-',
  },
  {
    sicCode: 7992,
    riskCode: 2,
    description: '7992 2 GOLF DRIVING RANGES ',
  },
  {
    sicCode: 7992,
    riskCode: 3,
    description: '7992 3 GOLF COURSES - Public',
  },
  {
    sicCode: 7993,
    riskCode: 1,
    description: '7993 1 Video Game Arcades',
  },
  {
    sicCode: 7993,
    riskCode: 2,
    description: '7993 2 Casinos - Gambling Operators',
  },
  {
    sicCode: 7993,
    riskCode: 3,
    description: '7993 3 CASINO & HOTEL ',
  },
  {
    sicCode: 7993,
    riskCode: 4,
    description: '7993 4 CASINO & HOTEL - Indian Gaming',
  },
  {
    sicCode: 7993,
    riskCode: 5,
    description:
      '7993 5 MACHINE - SLOT, VENDING AND AMUSEMENT MACHINE OPERATORS - Casino Operations',
  },
  {
    sicCode: 7996,
    riskCode: 1,
    description: '7996 1 Water Parks',
  },
  {
    sicCode: 7996,
    riskCode: 2,
    description: '7996 2 Amusement Parks--(Permanently Located)--',
  },
  {
    sicCode: 7996,
    riskCode: 3,
    description: '7996 3 Parks or Playgrounds',
  },
  {
    sicCode: 7997,
    riskCode: 1,
    description: '7997 1 Sports Association - Amateur',
  },
  {
    sicCode: 7997,
    riskCode: 2,
    description: '7997 2 Sports Teams -- Amateur Children (18 and under)',
  },
  {
    sicCode: 7997,
    riskCode: 3,
    description: '7997 3 Sports Teams -- Amateur Adults (Over 18)',
  },
  {
    sicCode: 7997,
    riskCode: 4,
    description:
      '7997 4 Clubs--horseback riding--no commercial riding instructions',
  },
  {
    sicCode: 7997,
    riskCode: 5,
    description: '7997 5 Country Clubs ',
  },
  {
    sicCode: 7997,
    riskCode: 6,
    description: '7997 6 Racquet, Tennis, Sports Clubs - Indoor',
  },
  {
    sicCode: 7997,
    riskCode: 7,
    description: '7997 7 Clubs-- swimming',
  },
  {
    sicCode: 7997,
    riskCode: 8,
    description: '7997 8 GOLF COURSES - Private',
  },
  {
    sicCode: 7999,
    riskCode: 1,
    description: '7999 1 Amusement and Recreation Services, NEC',
  },
  {
    sicCode: 7999,
    riskCode: 2,
    description:
      '7999 2 Amusement Devices -- operated in connection with carnivals or fairs- Not for Profit only',
  },
  {
    sicCode: 7999,
    riskCode: 3,
    description:
      '7999 3 Amusement Devices -- operated in connection with carnivals or fairs- Other than Not For Profit',
  },
  {
    sicCode: 7999,
    riskCode: 4,
    description: '7999 4 Soap Box Derbies',
  },
  {
    sicCode: 7999,
    riskCode: 5,
    description: '7999 5 Recreation Services Animals --saddle --private',
  },
  {
    sicCode: 7999,
    riskCode: 6,
    description: '7999 6 Recreation Services Animals --saddle--for rent',
  },
  {
    sicCode: 7999,
    riskCode: 7,
    description:
      '7999 7 Archery Ranges--indoor - with 10% or more sales of weapons and weapons accessories',
  },
  {
    sicCode: 7999,
    riskCode: 8,
    description:
      '7999 8 Archery Ranges--indoor - with less than 10% sales of weapons and weapons accessories',
  },
  {
    sicCode: 7999,
    riskCode: 9,
    description:
      '7999 9 Archery Ranges--other than indoor - with 10% or more sales of weapons and weapons accessories',
  },
  {
    sicCode: 7999,
    riskCode: 10,
    description:
      '7999 10 Archery Ranges--other than indoor - with less than 10% sales of weapons and weapons accessories',
  },
  {
    sicCode: 7999,
    riskCode: 11,
    description:
      '7999 11 Athletic Games Sponsored by the Insured--Not For Profit only',
  },
  {
    sicCode: 7999,
    riskCode: 12,
    description:
      '7999 12 Athletic Games Sponsored by the Insured--Other than Not For Profit',
  },
  {
    sicCode: 7999,
    riskCode: 13,
    description: '7999 13 Bathhouses or Bathing Pavilions',
  },
  {
    sicCode: 7999,
    riskCode: 14,
    description: '7999 14 Bazaars--operated by the insured-Not For Profit only',
  },
  {
    sicCode: 7999,
    riskCode: 15,
    description:
      '7999 15 Bazaars--operated by the insured-Other than Not For Profit',
  },
  {
    sicCode: 7999,
    riskCode: 16,
    description: '7999 16 Beach Chairs and Umbrellas--rented to others',
  },
  {
    sicCode: 7999,
    riskCode: 17,
    description: '7999 17 Beaches--bathing-- commercially operated',
  },
  {
    sicCode: 7999,
    riskCode: 18,
    description: '7999 18 Bicycles--rented to others',
  },
  {
    sicCode: 7999,
    riskCode: 19,
    description: '7999 19 Billiard or Pool Halls',
  },
  {
    sicCode: 7999,
    riskCode: 20,
    description:
      '7999 20 Bingo Games--in public halls or theaters--commercially operated',
  },
  {
    sicCode: 7999,
    riskCode: 21,
    description: '7999 21 Boats-- motor or sail--rented to others',
  },
  {
    sicCode: 7999,
    riskCode: 22,
    description: '7999 22 Bungee Jumping Operations',
  },
  {
    sicCode: 7999,
    riskCode: 23,
    description: '7999 23 Carnival or Circus Companies',
  },
  {
    sicCode: 7999,
    riskCode: 24,
    description:
      "7999 24 Carnivals or Circuses--in tents (sponsor's risk only) Not For Profit only",
  },
  {
    sicCode: 7999,
    riskCode: 25,
    description:
      "7999 25 Carnivals or Circuses--in tents (sponsor's risk only) Other than Not for Profit",
  },
  {
    sicCode: 7999,
    riskCode: 26,
    description: '7999 26 Circus',
  },
  {
    sicCode: 7999,
    riskCode: 27,
    description:
      "7999 27 Carnivals--outside (sponsor's risk only) Other than Not For Profit",
  },
  {
    sicCode: 7999,
    riskCode: 28,
    description: '7999 28 Caves--tourist attraction',
  },
  {
    sicCode: 7999,
    riskCode: 29,
    description: '7999 29 Family Fun Centers',
  },
  {
    sicCode: 7999,
    riskCode: 30,
    description:
      '7999 30 Community Recreational Facilities-- not operated by governmental agency',
  },
  {
    sicCode: 7999,
    riskCode: 31,
    description: '7999 31 Recreation Services Diving--marine',
  },
  {
    sicCode: 7999,
    riskCode: 32,
    description:
      '7999 32 Special Event Exhibitions --outside--in stadiums or on premises having grandstands or bleachers not erected by or for the insured-- ushers or other attendants in stands not provided by the insured',
  },
  {
    sicCode: 7999,
    riskCode: 33,
    description:
      '7999 33 Exhibitions--in buildings--no admission charged--Not For Profit only',
  },
  {
    sicCode: 7999,
    riskCode: 34,
    description:
      '7999 34 Exhibitions--in buildings--no admission charged--Other than Not For Profit',
  },
  {
    sicCode: 7999,
    riskCode: 35,
    description: '7999 35 Exhibitions--in buildings--Not For Profit only',
  },
  {
    sicCode: 7999,
    riskCode: 36,
    description: '7999 36 Exhibitions--in buildings--Other than Not For Profit',
  },
  {
    sicCode: 7999,
    riskCode: 37,
    description: '7999 37 Exhibitions--outside--not stadiums or grandstands',
  },
  {
    sicCode: 7999,
    riskCode: 38,
    description: '7999 38 Fair Grounds',
  },
  {
    sicCode: 7999,
    riskCode: 39,
    description: "7999 39 Fairs--outside (operator's risk only)",
  },
  {
    sicCode: 7999,
    riskCode: 40,
    description: '7999 40 Fireworks Exhibitions-- Contractors risk only',
  },
  {
    sicCode: 7999,
    riskCode: 41,
    description: '7999 41 Special Effects Operation - With Pyrotechnics',
  },
  {
    sicCode: 7999,
    riskCode: 42,
    description: '7999 42 Special Effects Operation - Without Pyrotechnics',
  },
  {
    sicCode: 7999,
    riskCode: 43,
    description: '7999 43 Fishing Piers',
  },
  {
    sicCode: 7999,
    riskCode: 44,
    description: '7999 44 Fishing Ponds or Lakes-- commercially operated',
  },
  {
    sicCode: 7999,
    riskCode: 45,
    description: '7999 45 Golf Courses--miniature',
  },
  {
    sicCode: 7999,
    riskCode: 46,
    description: '7999 46 Golf Driving Ranges',
  },
  {
    sicCode: 7999,
    riskCode: 47,
    description:
      '7999 47 Golf mobiles--loaned or rented to others - not for golf course use',
  },
  {
    sicCode: 7999,
    riskCode: 48,
    description:
      '7999 48 Outfitters & Guides - Tours organized in the outdoors',
  },
  {
    sicCode: 7999,
    riskCode: 49,
    description: '7999 49 Parades',
  },
  {
    sicCode: 7999,
    riskCode: 50,
    description: '7999 50 Picnic Grounds--commercially operated',
  },
  {
    sicCode: 7999,
    riskCode: 51,
    description: '7999 51 Recreational Facilities',
  },
  {
    sicCode: 7999,
    riskCode: 52,
    description: '7999 52 Riding Academies',
  },
  {
    sicCode: 7999,
    riskCode: 53,
    description: '7999 53 Shooting Range Operations - Indoor and Outdoor',
  },
  {
    sicCode: 7999,
    riskCode: 54,
    description:
      '7999 54 Rifle or Pistol Ranges with sales of weapons and accessories less than 10 % of total receipts',
  },
  {
    sicCode: 7999,
    riskCode: 55,
    description:
      '7999 55 Rifle or Pistol Ranges, indoor with sales of weapons and accessories 10% or more of total receipts',
  },
  {
    sicCode: 7999,
    riskCode: 56,
    description:
      '7999 56 Rifle or Pistol Ranges, indoor with sales of weapons and accessories less than 10 % of total receipts',
  },
  {
    sicCode: 7999,
    riskCode: 57,
    description: '7999 57 Rodeos',
  },
  {
    sicCode: 7999,
    riskCode: 58,
    description: '7999 58 Sauna and Baths--Public',
  },
  {
    sicCode: 7999,
    riskCode: 59,
    description: '7999 59 Skating Rinks-- ice',
  },
  {
    sicCode: 7999,
    riskCode: 60,
    description: '7999 60 Skating Rinks-- roller',
  },
  {
    sicCode: 7999,
    riskCode: 61,
    description:
      '7999 61 Skeet Shooting or Trap Shooting Ranges with sales of weapons and accessories less than 10 % of total receipts',
  },
  {
    sicCode: 7999,
    riskCode: 62,
    description:
      '7999 62 Skeet Shooting or Trap Shooting Ranges with sales of weapons, alterations, and/or accessories 10% or more of total receipts',
  },
  {
    sicCode: 7999,
    riskCode: 63,
    description: '7999 63 Ski Areas',
  },
  {
    sicCode: 7999,
    riskCode: 65,
    description: '7999 65 Spas or Personal Enhancement Facilities',
  },
  {
    sicCode: 7999,
    riskCode: 66,
    description: '7999 66 Swimming Pools--commercially operated',
  },
  {
    sicCode: 7999,
    riskCode: 67,
    description: '7999 67 Guides or Outfitters (Maine Only)',
  },
  {
    sicCode: 7999,
    riskCode: 68,
    description: '7999 68 SKATEBOARD PARKS',
  },
  {
    sicCode: 7999,
    riskCode: 69,
    description: '7999 69 ZOOS',
  },
  {
    sicCode: 7999,
    riskCode: 70,
    description: '7999 70 TULIP',
  },
  {
    sicCode: 7999,
    riskCode: 71,
    description: '7999 71 PAINT BALL OPERATIONS / SALES',
  },
  {
    sicCode: 7999,
    riskCode: 72,
    description: '7999 72 GatherGuard',
  },
  {
    sicCode: 8011,
    riskCode: 1,
    description: '8011 1 Abortion Facilities',
  },
  {
    sicCode: 8011,
    riskCode: 2,
    description: '8011 2 Anesthesia Groups',
  },
  {
    sicCode: 8011,
    riskCode: 3,
    description: '8011 3 Birth Centers',
  },
  {
    sicCode: 8011,
    riskCode: 4,
    description: '8011 4 Cosmetic Surgery Centers (Outpatient)',
  },
  {
    sicCode: 8011,
    riskCode: 5,
    description: "8011 5 Dermatologists' Offices",
  },
  {
    sicCode: 8011,
    riskCode: 6,
    description: '8011 6 Emergency Centers (Freestanding)',
  },
  {
    sicCode: 8011,
    riskCode: 7,
    description: '8011 7 Mammography Centers',
  },
  {
    sicCode: 8011,
    riskCode: 8,
    description: '8011 8 Medical Offices',
  },
  {
    sicCode: 8011,
    riskCode: 9,
    description: "8011 9 Psychologists' and Psychiatrists'",
  },
  {
    sicCode: 8011,
    riskCode: 10,
    description: '8011 10 Rehabilitation, Substance Abuse',
  },
  {
    sicCode: 8011,
    riskCode: 11,
    description: '8011 11 Surgical Center (Outpatient)',
  },
  {
    sicCode: 8011,
    riskCode: 12,
    description: '8011 12 Offices and Clinics of Doctors of Medicine, NEC',
  },
  {
    sicCode: 8021,
    riskCode: 1,
    description: '8021 1 Offices and Clinics of Dentists',
  },
  {
    sicCode: 8031,
    riskCode: 1,
    description: '8031 1 Offices and Clinics of Doctors of Osteopathy',
  },
  {
    sicCode: 8041,
    riskCode: 1,
    description: '8041 1 Offices and Clinics of Chiropractors',
  },
  {
    sicCode: 8042,
    riskCode: 1,
    description: '8042 1 Offices and Clinics of Optometrists',
  },
  {
    sicCode: 8043,
    riskCode: 1,
    description: '8043 1 Offices and Clinics of Podiatrists',
  },
  {
    sicCode: 8049,
    riskCode: 1,
    description: '8049 1 Acupuncturists',
  },
  {
    sicCode: 8049,
    riskCode: 2,
    description: '8049 2 Offices and Clinics of Health Practitioners, NEC',
  },
  {
    sicCode: 8049,
    riskCode: 3,
    description: '8049 3 Alternative Health Centers',
  },
  {
    sicCode: 8049,
    riskCode: 4,
    description: '8049 4 Audiologists',
  },
  {
    sicCode: 8049,
    riskCode: 5,
    description: '8049 5 Speech-Language Pathologists',
  },
  {
    sicCode: 8049,
    riskCode: 6,
    description: '8049 6 Offices of Midwives',
  },
  {
    sicCode: 8049,
    riskCode: 7,
    description: '8049 7 Dieticians (Consulting)',
  },
  {
    sicCode: 8049,
    riskCode: 8,
    description: '8049 8 Hypnosis Centers',
  },
  {
    sicCode: 8049,
    riskCode: 9,
    description: '8049 9 Psychotherapists, except M.D.',
  },
  {
    sicCode: 8051,
    riskCode: 1,
    description: '8051 1 Health Care / Non Profit',
  },
  {
    sicCode: 8051,
    riskCode: 2,
    description: '8051 2 Health Care / For Profit',
  },
  {
    sicCode: 8051,
    riskCode: 3,
    description: '8051 3 Nursing Homes',
  },
  {
    sicCode: 8052,
    riskCode: 1,
    description: '8052 1 Hospice Facilities',
  },
  {
    sicCode: 8059,
    riskCode: 1,
    description: '8059 1 Assisted Living Facilities',
  },
  {
    sicCode: 8059,
    riskCode: 2,
    description: '8059 2 Independent Living',
  },
  {
    sicCode: 8059,
    riskCode: 4,
    description: '8059 4 Hospice',
  },
  {
    sicCode: 8062,
    riskCode: 1,
    description: '8062 1 Health Care Facilities--hospitals Not for Profit only',
  },
  {
    sicCode: 8062,
    riskCode: 2,
    description:
      '8062 2 Health Care Facilities--hospitals Other than Not For Profit',
  },
  {
    sicCode: 8062,
    riskCode: 3,
    description:
      '8062 3 Health Care Facilities--mental--psychopathic institutions Not For Profit only',
  },
  {
    sicCode: 8062,
    riskCode: 4,
    description:
      '8062 4 Health Care Facilities--mental--psychopathic institutions Other than Not For Profit',
  },
  {
    sicCode: 8063,
    riskCode: 1,
    description: '8063 1 Psychiatric Hospitals, Other than Not for Profit',
  },
  {
    sicCode: 8063,
    riskCode: 2,
    description: '8063 2 Psychiatric Hospitals, Not for Profit',
  },
  {
    sicCode: 8069,
    riskCode: 1,
    description: '8069 1 Specialty Hospitals, Except Psychiatric, NEC',
  },
  {
    sicCode: 8069,
    riskCode: 2,
    description: '8069 2 E&S Group Only - Medical Facility',
  },
  {
    sicCode: 8071,
    riskCode: 1,
    description: '8071 1 Diagnostic Testing Laboratories',
  },
  {
    sicCode: 8071,
    riskCode: 2,
    description: '8071 2 DNA Testing Services',
  },
  {
    sicCode: 8071,
    riskCode: 3,
    description: '8071 3 Medical Laboratories, NEC',
  },
  {
    sicCode: 8072,
    riskCode: 2,
    description: '8072 2 Dental Laboratories - FDA Class 1',
  },
  {
    sicCode: 8072,
    riskCode: 3,
    description: '8072 3 Dental Laboratories - FDA Class 2',
  },
  {
    sicCode: 8072,
    riskCode: 4,
    description: '8072 4 Dental Laboratories - FDA Class 3',
  },
  {
    sicCode: 8082,
    riskCode: 1,
    description: '8082 1 Home Health Care Services--Not For Profit only',
  },
  {
    sicCode: 8082,
    riskCode: 2,
    description:
      '8082 2 Home Health Care Services--Other than Not For Profit only',
  },
  {
    sicCode: 8082,
    riskCode: 3,
    description: '8082 3 Home Health Care Services',
  },
  {
    sicCode: 8092,
    riskCode: 1,
    description: '8092 1 Kidney Dialysis Centers',
  },
  {
    sicCode: 8093,
    riskCode: 1,
    description: '8093 1 Specialty Outpatient Facilities, NEC',
  },
  {
    sicCode: 8099,
    riskCode: 1,
    description: '8099 1 Health and Allied Services, NEC',
  },
  {
    sicCode: 8099,
    riskCode: 2,
    description: '8099 2 Audiometric Testing Companies',
  },
  {
    sicCode: 8099,
    riskCode: 3,
    description: '8099 3 Blood Banks-- Other then Not For Profit',
  },
  {
    sicCode: 8099,
    riskCode: 4,
    description: '8099 4 Blood Banks--Not For Profit only',
  },
  {
    sicCode: 8099,
    riskCode: 5,
    description: '8099 5 Sperm Banks',
  },
  {
    sicCode: 8099,
    riskCode: 6,
    description: '8099 6 Plasmapheresis Centers',
  },
  {
    sicCode: 8099,
    riskCode: 7,
    description: '8099 7 Healthcare Consulting',
  },
  {
    sicCode: 8111,
    riskCode: 1,
    description: '8111 1 Lawyers Offices-- Not For Profit only',
  },
  {
    sicCode: 8111,
    riskCode: 2,
    description: '8111 2 Lawyers Offices-- Other than Not For Profit only',
  },
  {
    sicCode: 8111,
    riskCode: 3,
    description: '8111 3 Paralegal Offices',
  },
  {
    sicCode: 8111,
    riskCode: 4,
    description: '8111 4 Legal Services, NEC',
  },
  {
    sicCode: 8211,
    riskCode: 1,
    description: '8211 1 Schools - public - elementary, junior high',
  },
  {
    sicCode: 8211,
    riskCode: 2,
    description:
      '8211 2 Schools--faculty liability for corporal punishment of students',
  },
  {
    sicCode: 8211,
    riskCode: 4,
    description:
      '8211 4 Schools--private--elementary, kindergarten or junior high--Not For Profit only',
  },
  {
    sicCode: 8211,
    riskCode: 5,
    description:
      '8211 5 Schools--private--elementary, kindergarten or junior high--Other than Not For Profit',
  },
  {
    sicCode: 8211,
    riskCode: 6,
    description: '8211 6 Schools--private--high--Not For Profit only',
  },
  {
    sicCode: 8211,
    riskCode: 7,
    description: '8211 7 Schools--private--high--Other than Not For Profit',
  },
  {
    sicCode: 8211,
    riskCode: 8,
    description: '8211 8 Schools--public--high school',
  },
  {
    sicCode: 8211,
    riskCode: 41,
    description: '8211 41 OBSP Specific - K-12',
  },
  {
    sicCode: 8221,
    riskCode: 1,
    description:
      '8221 1 Colleges, Universities, and Professional Schools, Not For Profit only',
  },
  {
    sicCode: 8221,
    riskCode: 2,
    description:
      '8221 2 Colleges, Universities, and Professional Schools, Other Than Not For Profit only',
  },
  {
    sicCode: 8222,
    riskCode: 1,
    description:
      '8222 1 Junior Colleges and Technical Institutes, Other than Not For Profit only',
  },
  {
    sicCode: 8222,
    riskCode: 2,
    description:
      '8222 2 Junior Colleges and Technical Institutes, Not For Profit only',
  },
  {
    sicCode: 8231,
    riskCode: 1,
    description: '8231 1 Libraries',
  },
  {
    sicCode: 8243,
    riskCode: 1,
    description: '8243 1 Data Processing Schools',
  },
  {
    sicCode: 8244,
    riskCode: 1,
    description: '8244 1 Business and Secretarial Schools',
  },
  {
    sicCode: 8249,
    riskCode: 1,
    description: '8249 1 Schools--correspondence',
  },
  {
    sicCode: 8249,
    riskCode: 2,
    description: '8249 2 Truck driving schools',
  },
  {
    sicCode: 8249,
    riskCode: 3,
    description: '8249 3 Aviation schools, excluding flying instruction',
  },
  {
    sicCode: 8249,
    riskCode: 4,
    description: '8249 4 Vocational Schools, NEC',
  },
  {
    sicCode: 8249,
    riskCode: 5,
    description: '8249 5 ABC Program Only-Flight Schools / Training',
  },
  {
    sicCode: 8299,
    riskCode: 1,
    description: '8299 1 Schools and Educational Services, NEC',
  },
  {
    sicCode: 8299,
    riskCode: 2,
    description: '8299 2 Driver Training Schools',
  },
  {
    sicCode: 8299,
    riskCode: 3,
    description: '8299 3 Modeling Schools',
  },
  {
    sicCode: 8299,
    riskCode: 4,
    description:
      '8299 4 Vocational-Technical Schools - Public and Private - Services',
  },
  {
    sicCode: 8322,
    riskCode: 1,
    description: '8322 1 Adoption Agencies',
  },
  {
    sicCode: 8322,
    riskCode: 2,
    description: '8322 2 Adult Day Care-- Not For Profit Only',
  },
  {
    sicCode: 8322,
    riskCode: 3,
    description: '8322 3 Adult Day Care--Other than Not For Profit',
  },
  {
    sicCode: 8322,
    riskCode: 4,
    description: '8322 4 Marriage and Family Counseling',
  },
  {
    sicCode: 8322,
    riskCode: 5,
    description: '8322 5 Shelters for Battered Women',
  },
  {
    sicCode: 8322,
    riskCode: 6,
    description:
      '8322 6 Social Services--Consulting Services only--operated by the Private Sector',
  },
  {
    sicCode: 8322,
    riskCode: 7,
    description: '8322 7 Individual and Family Social Services, NEC',
  },
  {
    sicCode: 8331,
    riskCode: 1,
    description: '8331 1 Job Training and Vocational Rehabilitation Services',
  },
  {
    sicCode: 8351,
    riskCode: 1,
    description: '8351 1 Child Day Care Centers -- Not For Profit only',
  },
  {
    sicCode: 8351,
    riskCode: 2,
    description: '8351 2 Child Day Care Centers -- Other than Not For Profit',
  },
  {
    sicCode: 8361,
    riskCode: 1,
    description:
      '8361 1 Health Care Facilities--alcohol and drug-- Not For Profit only',
  },
  {
    sicCode: 8361,
    riskCode: 2,
    description:
      '8361 2 Health Care Facilities--alcohol and drug-- Other than Not For Profit',
  },
  {
    sicCode: 8361,
    riskCode: 3,
    description:
      '8361 3 Health Care Facilities--homes for the aged--Not For Profit Only',
  },
  {
    sicCode: 8361,
    riskCode: 4,
    description:
      '8361 4 Health Care Facilities--homes for the aged--Other than Not For Profit',
  },
  {
    sicCode: 8361,
    riskCode: 5,
    description:
      '8361 5 Health Care Facilities--homes for the physically handicapped or orphaned--Not For Profit Only',
  },
  {
    sicCode: 8361,
    riskCode: 6,
    description:
      '8361 6 Health Care Facilities--homes for the physically handicapped or orphaned--Other than Not For Profit',
  },
  {
    sicCode: 8361,
    riskCode: 7,
    description: '8361 7 Orphan Homes',
  },
  {
    sicCode: 8361,
    riskCode: 8,
    description:
      '8361 8 Shelters, Mission, Settlement or Halfway House--Not Church or Office Building',
  },
  {
    sicCode: 8361,
    riskCode: 9,
    description: '8361 9 Residential Care, NEC',
  },
  {
    sicCode: 8399,
    riskCode: 1,
    description: '8399 1 Social Services, NEC',
  },
  {
    sicCode: 8412,
    riskCode: 1,
    description: '8412 1 Art Galleries-- Not For Profit Only',
  },
  {
    sicCode: 8412,
    riskCode: 2,
    description: '8412 2 Art Galleries-- Other then Not for Profit',
  },
  {
    sicCode: 8412,
    riskCode: 3,
    description: '8412 3 Museums--Not For Profit only',
  },
  {
    sicCode: 8412,
    riskCode: 4,
    description: '8412 4 Museums--Other than Not for Profit',
  },
  {
    sicCode: 8412,
    riskCode: 5,
    description: '8412 5 Planetariums',
  },
  {
    sicCode: 8412,
    riskCode: 6,
    description: '8412 6 ABC Program Only-Aviation Museums',
  },
  {
    sicCode: 8422,
    riskCode: 1,
    description: '8422 1 Aquariums',
  },
  {
    sicCode: 8422,
    riskCode: 2,
    description: '8422 2 Botanical Gardens',
  },
  {
    sicCode: 8422,
    riskCode: 3,
    description: '8422 3 Zoos-- Not For Profit only',
  },
  {
    sicCode: 8422,
    riskCode: 4,
    description: '8422 4 Zoos-- Other than Not For Profit',
  },
  {
    sicCode: 8422,
    riskCode: 5,
    description: '8422 5 Arboreta',
  },
  {
    sicCode: 8611,
    riskCode: 1,
    description:
      '8611 1 Professional Business and Trade Associations--no building or premises owned or leased except as offices-- Not For Profit only',
  },
  {
    sicCode: 8611,
    riskCode: 2,
    description:
      '8611 2 Professional business and Trade Associations--no building or premises owned or leased except as offices-- Other than Not For Profit',
  },
  {
    sicCode: 8621,
    riskCode: 1,
    description: '8621 1 Professional Membership Organizations',
  },
  {
    sicCode: 8631,
    riskCode: 1,
    description: '8631 1 Labor Unions and Similar Labor Organizations',
  },
  {
    sicCode: 8641,
    riskCode: 1,
    description: '8641 1 Boy or Girl Scout Councils',
  },
  {
    sicCode: 8641,
    riskCode: 2,
    description:
      '8641 2 Club-civic, service or social--having buildings or premises owned or leased-- Other than Not For Profit-- ISO GL # 41667',
  },
  {
    sicCode: 8641,
    riskCode: 3,
    description:
      '8641 3 Club-civic, service or social--having buildings or premises owned or leased--Not for Profit only',
  },
  {
    sicCode: 8641,
    riskCode: 4,
    description:
      '8641 4 Clubs--civic, service or social--no buildings or premises owned or leased except for office purposes--Not For Profit only',
  },
  {
    sicCode: 8641,
    riskCode: 5,
    description:
      '8641 5 Clubs--civic, service or social--no buildings or premises owned or leased except for office purposes--Other than Not For Profit',
  },
  {
    sicCode: 8641,
    riskCode: 6,
    description:
      '8641 6 Condominiums - commercial warehouses--manufacturing or private (association risk only)',
  },
  {
    sicCode: 8641,
    riskCode: 7,
    description: '8641 7 Condominiums -residential-- (association risk only)',
  },
  {
    sicCode: 8641,
    riskCode: 8,
    description:
      '8641 8 Condominiums--commercial-- commercial shopping centers (association risk only)',
  },
  {
    sicCode: 8641,
    riskCode: 9,
    description:
      '8641 9 Condominiums--commercial--bank, mercantile, or office (association risk only)',
  },
  {
    sicCode: 8641,
    riskCode: 10,
    description: '8641 10 Fraternities',
  },
  {
    sicCode: 8641,
    riskCode: 11,
    description:
      '8641 11 Social Gatherings and Meetings--on premises not owned or operated by the insured--Not For Profit only',
  },
  {
    sicCode: 8641,
    riskCode: 12,
    description:
      '8641 12 Social Gatherings and Meetings--on premises not owned or operated by the insured--Other than Not For Profit only',
  },
  {
    sicCode: 8641,
    riskCode: 13,
    description: '8641 13 Sororities',
  },
  {
    sicCode: 8641,
    riskCode: 14,
    description:
      '8641 14 Townhouses or Similar Associations (association risk only)',
  },
  {
    sicCode: 8641,
    riskCode: 15,
    description: '8641 15 YMCA, YWCA or Similar Institutions',
  },
  {
    sicCode: 8641,
    riskCode: 16,
    description: '8641 16 Youth Recreation Programs--Not For Profit only',
  },
  {
    sicCode: 8641,
    riskCode: 17,
    description: '8641 17 Youth Recreation Programs--Other than Not For Profit',
  },
  {
    sicCode: 8641,
    riskCode: 18,
    description: '8641 18 Civic, Social, and Fraternal Associations, NEC',
  },
  {
    sicCode: 8641,
    riskCode: 19,
    description:
      '8641 19 Clubs--civic, service or social--no buildings or premises owned or leased except for office purposes--Not For Profit only (Hagerty Car Clubs only)',
  },
  {
    sicCode: 8651,
    riskCode: 1,
    description: '8651 1 Political Campaign Headquarters or Offices',
  },
  {
    sicCode: 8651,
    riskCode: 2,
    description: '8651 2 Political Organizations',
  },
  {
    sicCode: 8661,
    riskCode: 1,
    description: '8661 1 Churches or Other Houses of Worship',
  },
  {
    sicCode: 8661,
    riskCode: 2,
    description: '8661 2 Convents or Monasteries',
  },
  {
    sicCode: 8661,
    riskCode: 3,
    description: '8661 3 Rectories',
  },
  {
    sicCode: 8699,
    riskCode: 1,
    description: '8699 1 Membership Organizations, NEC',
  },
  {
    sicCode: 8711,
    riskCode: 1,
    description: '8711 1 Engineering Services',
  },
  {
    sicCode: 8711,
    riskCode: 2,
    description: '8711 2 Energy Program Only - Engineering Services',
  },
  {
    sicCode: 8711,
    riskCode: 3,
    description: '8711 3 E&S Group Only - Air Quality Testing',
  },
  {
    sicCode: 8711,
    riskCode: 4,
    description: '8711 4 E&S Group Only - Asbestos and Lead Consulting',
  },
  {
    sicCode: 8711,
    riskCode: 5,
    description: '8711 5 E&S Group Only - Environmental Consultant - NEC',
  },
  {
    sicCode: 8711,
    riskCode: 6,
    description: '8711 6 E&S Group Only - Mold Consulting',
  },
  {
    sicCode: 8711,
    riskCode: 7,
    description: '8711 7 E&S Group Only - Waste Broker',
  },
  {
    sicCode: 8711,
    riskCode: 8,
    description: '8711 8 E&S Group only - Engineering Services',
  },
  {
    sicCode: 8711,
    riskCode: 9,
    description: '8711 9 E&S Group only - Environmental Project Management',
  },
  {
    sicCode: 8711,
    riskCode: 10,
    description: '8711 10 E&S Group only - Environmental Consultant',
  },
  {
    sicCode: 8711,
    riskCode: 11,
    description:
      '8711 11 E&S Group only - Environmental Risk/Site Assessments/Impact Studies',
  },
  {
    sicCode: 8711,
    riskCode: 12,
    description:
      '8711 12 E&S Group only - Health/Safety and Industrial Hygiene Services',
  },
  {
    sicCode: 8711,
    riskCode: 13,
    description: '8711 13 E&S Group only - Non-Environmental Professional',
  },
  {
    sicCode: 8711,
    riskCode: 14,
    description: '8711 14 E&S Group only - Regulatory/Permitting',
  },
  {
    sicCode: 8711,
    riskCode: 15,
    description: '8711 15 E&S Group only - Storage Tank Services',
  },
  {
    sicCode: 8711,
    riskCode: 16,
    description:
      '8711 16 E&S Group only - Water/Westewater Treatment Design/Testing',
  },
  {
    sicCode: 8711,
    riskCode: 17,
    description: '8711 17 E&S Group only - Wetlands/Biological/ Wildlife',
  },
  {
    sicCode: 8712,
    riskCode: 1,
    description: '8712 1 Architectural Preservationists',
  },
  {
    sicCode: 8712,
    riskCode: 2,
    description:
      '8712 2 Engineers or Architects-- consulting--not engaged in actual construction',
  },
  {
    sicCode: 8713,
    riskCode: 1,
    description: '8713 1 Marine Appraisers or Surveyors',
  },
  {
    sicCode: 8713,
    riskCode: 2,
    description: '8713 2 Surveyors--land--not engaged in actual construction',
  },
  {
    sicCode: 8721,
    riskCode: 1,
    description: '8721 1 Certified Public Accountants',
  },
  {
    sicCode: 8721,
    riskCode: 2,
    description: '8721 2 Accounting, Auditing, and Bookkeeping Services, NEC',
  },
  {
    sicCode: 8721,
    riskCode: 3,
    description: '8721 3 Payroll Services',
  },
  {
    sicCode: 8731,
    riskCode: 4,
    description: '8731 4 Commercial Physical & Biological Research',
  },
  {
    sicCode: 8732,
    riskCode: 1,
    description: '8732 1 Marketing Research and Public Opinion Polling',
  },
  {
    sicCode: 8732,
    riskCode: 2,
    description:
      '8732 2 Research and Development in the Social Sciences and Humanities',
  },
  {
    sicCode: 8732,
    riskCode: 3,
    description:
      '8732 3 Commercial Economic, Sociological, and Educational Research, NEC',
  },
  {
    sicCode: 8733,
    riskCode: 1,
    description:
      '8733 1 Archeological expeditions, noncommercial organizations',
  },
  {
    sicCode: 8733,
    riskCode: 2,
    description: '8733 2 Biological research, noncommercial organizations',
  },
  {
    sicCode: 8733,
    riskCode: 3,
    description:
      '8733 3 Physical, Engineering, and Life Sciences research, noncommercial organizations',
  },
  {
    sicCode: 8733,
    riskCode: 4,
    description: '8733 4 Economic research, noncommercial organizations',
  },
  {
    sicCode: 8733,
    riskCode: 5,
    description:
      '8733 5 Social Sciences and Humanities research, noncommercial organizations',
  },
  {
    sicCode: 8733,
    riskCode: 6,
    description: '8733 6 Noncommercial Research Organizations, NEC',
  },
  {
    sicCode: 8733,
    riskCode: 7,
    description: '8733 7 Noncommercial Research Organizations, NEC - MedTech',
  },
  {
    sicCode: 8734,
    riskCode: 1,
    description: '8734 1 Testing Laboratories',
  },
  {
    sicCode: 8734,
    riskCode: 2,
    description: '8734 2 E&S Group Only - Analytical Laboratory',
  },
  {
    sicCode: 8734,
    riskCode: 3,
    description: '8734 3 E&S Group Only - Laboratory',
  },
  {
    sicCode: 8734,
    riskCode: 4,
    description: '8734 4 Laboratories (Analytical/Clinical)',
  },
  {
    sicCode: 8741,
    riskCode: 1,
    description: '8741 1 Management Services',
  },
  {
    sicCode: 8741,
    riskCode: 2,
    description: '8741 2 BUSINESS MANAGEMENT CO',
  },
  {
    sicCode: 8741,
    riskCode: 3,
    description: '8741 3 TALENT AGENCY',
  },
  {
    sicCode: 8742,
    riskCode: 1,
    description: '8742 1 Management Consulting Services',
  },
  {
    sicCode: 8743,
    riskCode: 1,
    description: '8743 1 Public Relations Services',
  },
  {
    sicCode: 8744,
    riskCode: 1,
    description: '8744 1 Facilities Support Management Services',
  },
  {
    sicCode: 8748,
    riskCode: 1,
    description: '8748 1 Academic Testing Services',
  },
  {
    sicCode: 8748,
    riskCode: 2,
    description: '8748 2 Business Consulting Services, NEC',
  },
  {
    sicCode: 8748,
    riskCode: 3,
    description: '8748 3 Environmental Consulting Firms',
  },
  {
    sicCode: 8748,
    riskCode: 4,
    description: '8748 4 Occupational Safety and Health Consultants',
  },
  {
    sicCode: 8748,
    riskCode: 5,
    description: '8748 5 Traffic consultants',
  },
  {
    sicCode: 8748,
    riskCode: 6,
    description: '8748 6 Economic consulting',
  },
  {
    sicCode: 8748,
    riskCode: 7,
    description:
      '8748 7 Energy Program Only - Business Consulting Services, NEC',
  },
  {
    sicCode: 8811,
    riskCode: 1,
    description: '8811 1 Private Households, Domestic Service',
  },
  {
    sicCode: 8811,
    riskCode: 2,
    description: '8811 2 E&S Group Only - Residential',
  },
  {
    sicCode: 8999,
    riskCode: 1,
    description: '8999 1 Services, NEC',
  },
  {
    sicCode: 8999,
    riskCode: 2,
    description: '8999 2 Analytical Chemists',
  },
  {
    sicCode: 8999,
    riskCode: 3,
    description: '8999 3 Art Conservators',
  },
  {
    sicCode: 8999,
    riskCode: 4,
    description: '8999 4 Demonstrative Evidence Firms',
  },
  {
    sicCode: 8999,
    riskCode: 5,
    description: '8999 5 Actuaries',
  },
  {
    sicCode: 8999,
    riskCode: 6,
    description: '8999 6 Stained Glass Studios',
  },
  {
    sicCode: 8999,
    riskCode: 7,
    description: '8999 7 Weather Forecast Services (Private)',
  },
  {
    sicCode: 8999,
    riskCode: 8,
    description: '8999 8 Energy Program Only - Services, NEC',
  },
  {
    sicCode: 9111,
    riskCode: 1,
    description: '9111 1 Executive Offices',
  },
  {
    sicCode: 9121,
    riskCode: 1,
    description: '9121 1 Legislative Bodies',
  },
  {
    sicCode: 9131,
    riskCode: 1,
    description: '9131 1 Executive and Legislative Offices, Combined',
  },
  {
    sicCode: 9199,
    riskCode: 1,
    description:
      '9199 1 Governmental Sub-division- Not State or Federal - Municipalities, Counties or Parishes-- no police and no Firemen',
  },
  {
    sicCode: 9199,
    riskCode: 2,
    description:
      '9199 2 Governmental Sub-division- Not State or Federal - Municipalities, Counties or Parishes--with police and Firemen',
  },
  {
    sicCode: 9199,
    riskCode: 3,
    description: '9199 3 General Government, NEC',
  },
  {
    sicCode: 9199,
    riskCode: 4,
    description: '9199 4 E&S Group Only - Public Entity - NEC',
  },
  {
    sicCode: 9199,
    riskCode: 41,
    description:
      '9199 41 OBGR Only - Towns, Cities, Townships General Government',
  },
  {
    sicCode: 9199,
    riskCode: 42,
    description: '9199 42 OBGR Only - Counties General Government',
  },
  {
    sicCode: 9199,
    riskCode: 43,
    description: '9199 43 OBGR Only - Water Districts General Government',
  },
  {
    sicCode: 9199,
    riskCode: 44,
    description: '9199 44 OBGR Only - Special Districts General Government',
  },
  {
    sicCode: 9199,
    riskCode: 45,
    description: '9199 45 OBGR Only - All Other General Government',
  },
  {
    sicCode: 9199,
    riskCode: 46,
    description: '9199 46 OBGR Only - All Transit Systems',
  },
  {
    sicCode: 9211,
    riskCode: 1,
    description: '9211 1 Courts',
  },
  {
    sicCode: 9221,
    riskCode: 1,
    description: '9221 1 Police Protection',
  },
  {
    sicCode: 9222,
    riskCode: 1,
    description: '9222 1 Legal Counsel and Prosecution',
  },
  {
    sicCode: 9223,
    riskCode: 1,
    description: '9223 1 Correctional Institutions',
  },
  {
    sicCode: 9224,
    riskCode: 1,
    description: '9224 1 Fire Departments-- other than volunteer',
  },
  {
    sicCode: 9224,
    riskCode: 2,
    description: '9224 2 Fire Departments-- volunteer',
  },
  {
    sicCode: 9224,
    riskCode: 3,
    description: '9224 3 OBGR Only - Emergency Services / Fire',
  },
  {
    sicCode: 9224,
    riskCode: 4,
    description: '9224 4 OBGR Only - Fire - PE - Volunteer',
  },
  {
    sicCode: 9224,
    riskCode: 5,
    description: '9224 5 OBGR Only - Fire - PE- Professional',
  },
  {
    sicCode: 9224,
    riskCode: 6,
    description: '9224 6 OBGR Only - Fire - NFP - Volunteer',
  },
  {
    sicCode: 9224,
    riskCode: 7,
    description: '9224 7 OBGR Only - Fire - NFP - Professional',
  },
  {
    sicCode: 9229,
    riskCode: 1,
    description: '9229 1 Public Order and Safety, NEC',
  },
  {
    sicCode: 9311,
    riskCode: 1,
    description: '9311 1 Public Finance, Taxation, and Monetary Policy',
  },
  {
    sicCode: 9411,
    riskCode: 1,
    description: '9411 1 Administration of Educational Programs',
  },
  {
    sicCode: 9431,
    riskCode: 1,
    description: '9431 1 Administration of Public Health Programs',
  },
  {
    sicCode: 9441,
    riskCode: 1,
    description:
      '9441 1 Administration of Social, Human Resource and Income Maintenance Programs',
  },
  {
    sicCode: 9451,
    riskCode: 1,
    description:
      "9451 1 Administration of Veterans' Affairs, Except Health Insurance",
  },
  {
    sicCode: 9511,
    riskCode: 1,
    description: '9511 1 Air and Water Resource and Solid Waste Management',
  },
  {
    sicCode: 9512,
    riskCode: 1,
    description: '9512 1 Land, mineral, wildlife and forest conservation',
  },
  {
    sicCode: 9531,
    riskCode: 1,
    description: '9531 1 Housing Projects--federal, state, local',
  },
  {
    sicCode: 9532,
    riskCode: 1,
    description:
      '9532 1 Administration of Urban Planning and Community and Rural Development',
  },
  {
    sicCode: 9611,
    riskCode: 1,
    description: '9611 1 Administration of General Economic Programs',
  },
  {
    sicCode: 9621,
    riskCode: 1,
    description:
      '9621 1 Regulation and Administration of Transportation Programs',
  },
  {
    sicCode: 9631,
    riskCode: 1,
    description:
      '9631 1 Regulation and Administration of Communications, Electric, Gas, and Other Utilities',
  },
  {
    sicCode: 9641,
    riskCode: 1,
    description: '9641 1 Regulation of Agricultural Marketing and Commodities',
  },
  {
    sicCode: 9651,
    riskCode: 1,
    description:
      '9651 1 Regulation, Licensing, and Inspection of Miscellaneous Commercial Sectors',
  },
  {
    sicCode: 9661,
    riskCode: 1,
    description: '9661 1 Space Research and Technology',
  },
  {
    sicCode: 9711,
    riskCode: 1,
    description: '9711 1 National Security',
  },
  {
    sicCode: 9721,
    riskCode: 1,
    description: '9721 1 International Affairs',
  },
  {
    sicCode: 9999,
    riskCode: 1,
    description: '9999 1 Nonclassifiable Establishments',
  },
]

/**
 * Helper to get mock SICs API response
 */
export const getMockSICs = (): SICApiResponse => {
  return {
    data: mockSICsData,
  }
}
