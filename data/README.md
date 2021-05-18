# Data
This page provides technical documentation of all datasets used, their sources and any analysis or manipulations performed. The data is listed in order of project.

## Project 1: High Risk Assessment of Old Law Tenements

### Map of Incidences in Old Law Tenements 
This dataset was created using the Incident & Accident database. This database contains all Incidents or Accidents the Department of Buildings responds to. This database contains information regarding the location, description of accident and other related information. As this data is taken from a private database, alternatively this data can be taken from the DOB Received Complaints - Using the complaint numbers listed.

The data was filtered for incidents which took place in Old Law Tenements. 

    HPD = Old Law Tenement

The dataset which contained more than 20 fields was reduced to the following fields:

* Incident date (MM/DD/YYYY) ➡️ Incident Date
* Check2 Description ➡️ Incident Category Description
* BISComplaint Number ➡️ Related BIS Complaint Number
* HPD ➡️ Housing Preservation & Development Classification
* Address Number ➡️ Address Number
* Street ➡️ Street Number
* Record Type Description ➡️ Description of the Record Type
* EOC Final Description ➡️ The Final Description of the Incident

This data was then merged with the Building Footprints shapefile to produce a dataset for mapping. Certain fields were manually updated as data related to BINs was missing. This was vital as the BIN field was used to merge the Incidents file to the shapefile. 

Once merged this file was imported to Mapbox GLJS and styled.

**Source:** 
| [Raw Data](https://data.cityofnewyork.us/Housing-Development/DOB-Complaints-Received/eabe-havv) | [Processed Data]() |

### Bar-graph of Old Law Tenements by Borough
This dataset was created using the Buildings Subject to HPD Jurisdiction filtered for Old Law Tenements. This data was then aggregated to form a table with the following fields:

* Borough ➡️ Borough Name 
* Count ➡️ count of Old Law Tenements 

**Source:** 
| [Raw Data](https://data.cityofnewyork.us/Housing-Development/Buildings-Subject-to-HPD-Jurisdiction/kj4p-ruqc) | [Processed Data](https://github.com/evasilva1/Portfolio-Interactive-Data-Vis-Sp2021/blob/main/data/OLT_Boro.csv) |

### Line-graph of Construction Permits Issued in New York City
This dataset was created using the DOB Permit Issuance cleaned data files. Each datset was aggregated and merge to create a table with the following fields:

* Year ➡️ the permit year
* A1 ➡️ count of Alteration 1 permits
* DM ➡️ count of Demolition permits
* NB ➡️ count of New Building permits

**Source:** 
| [Raw Data](https://data.cityofnewyork.us/Housing-Development/DOB-Permit-Issuance/ipu4-2q9a) | [Processed Data](https://github.com/evasilva1/Portfolio-Interactive-Data-Vis-Sp2021/blob/main/data/Permits_Year.csv) |

## Project 2: Demo: Community Board# 301

### Map of Community Board 301's Building Population

#### 301 Building Footprints
To create the geojson file containing Community Board 301's Building Population, (2) datasets were used: 
(I) Community Districts and (II) Building Footprint shapefiles. Using QGIS, I selected the 301 Community District polygon from the shapefile using the following expression.

    boro_cd = 301.00

And, exported it as it's own shapefile. Using the newly created 301 Community District shapefile as a reference polygon, the Building Footprints shapefile was imported and clipped for Building Footprints within the 301 Community District polygon. This new set of Building Footprints corresponding to Community District 301 were exported as a new shapefile. Most features were deleted with exception to the following:

* bin ➡️ building identification number
* cnstrct_yr ➡️ year of construction
* shape_area*
* shape_len*

All other data was merged to the 301 Building Footprints shapefile.

**I. Source** | [Raw Data](https://data.cityofnewyork.us/City-Government/Community-Districts/yfnk-k7r4) | **II. Source** | [Raw Data](https://data.cityofnewyork.us/Housing-Development/Building-Footprints/nqwf-w8eh) |

#### HPD Old Law Classification
To identify whether a building was classified as an Old Law Tenement, the Buildings Subject to HPD Jurisdiction data was used. This data was pre-filtered using the filters available on the platform. The data was filtered for:

    DoBBuildingClass = OLD LAW TENEMENT

All original fields were kept and exported out as a csv file. The csv file was then imported in QGIS and joined to the **301 Building Footprints** data using *bin* as the joining field. The following fields were kept and joined to the main Building Footprint file:

* DoBBuildingClass ➡️ HPD Classification of Multiple Dwellings
* LegalStories ➡️ number of legal stories in building
* LifeCycle ➡️ the stage in the building life cycle
* RecordStatus ➡️ the status of record

Once the join was finalized and saved out as a new named file, an OLT field was created recoding the DoBBuilding field to a 0-1 using the following expression:

    if DoBBuilding = OLD LAW TENEMENT == 1
    else 0

The new field:

* OLT ➡️ 0-1 if it has OLT classification

Once the new field was finalized the data was saved out and given a new name.


**Source** | [Raw Data](https://data.cityofnewyork.us/Housing-Development/Buildings-Subject-to-HPD-Jurisdiction/kj4p-ruqc) |

#### Construction Site Classification
To identify whether a building is home to construction activity, the DOB Permit Issuance data was used. This data was pre-filtered using the filters available on the platform. The data was filtered for:

    Job Type = DM or NB or A1 

where,

    DM ➡️ Demolition job
    NB ➡️ New Building job
    A1 ➡️ Alteration 1 job

As the data file resulted to big of a file to open on my computer, I downloaded each Job Type as it own indiviual file. In other words, I had (3) csv files, one for each of the Job Types listed above.

Each data file was then cleaned for the following:
| Job Type | Data Cleaned For |
| -------- | ---------------- |
| DM | Job Start Date >= 1/1/2010 ▪️ Expiration Date >= 1/1/2010 ▪️ Permit Type = DM ▪️ Work Type is NULL |
| NB | Job Start Date >= 1/1/2010 ▪️ Expiration Date >= 1/1/2010 ▪️ Permit Type = NB or FO ▪️ Work Type is NULL |
| A1 | Job Start Date >= 1/1/2010 ▪️ Expiration Date >= 1/1/2010 ▪️ Permit Type = AL or FO ▪️ Work Type is NULL |

Each one of these cleaned data files were joined to the 301 Building Footprints data by BIN using QGIS, like the OLT Classification. The fields that were kept from the csv files were the following:

* Job Type ➡️ the type of job
* Permit Type ➡️ the type of permit
* Issuance Date ➡️ the date the permit was issued
* Expiration Date ➡️ the date the permit will expire
* Job Start Date ➡️ the data the job started

Once the join was finalized and saved out as a new named file, a Construction Activity Present field was created recoding the Job Type fields (one for each Job Type) to a 0-1 using the following expression:

    if Job Type is NOT NULL or aJob Type is NOT NULL or dJob Type is NOT NULL == 1
    else 0

The new field:

* Construction ➡️ 0-1 if there is construction

Once the new field was finalize the data was saved out and given a new name.

**Source** | [Raw Data](https://data.cityofnewyork.us/Housing-Development/DOB-Permit-Issuance/ipu4-2q9a) | 

#### Adjacent to Construction Site Classification
To identify if a building was adjacent to a construction site, I had to create a separate dataset containing Construction Only sites. To do this, the following expressions was used:

    Construction = 1

Once these sites were selected, a new shapefile was created by saving out using the selected feature save as method. With this new dataset, a buffer shapefile was created. Approximately 5 meter buffers were created for all Constructon Only polygons. As the data used were in decimal degrees the following calculations had to be made to produce the buffers.

    1.00 decimal degree = 111 km
    0.001 decimal degree = 111 m
    0.000009 decimal degree = 1 m
    0.000045 decimal degree = 5 m

A new output file is created for these buffers and used alongside the running master 301 Building Footprint file. Using a research tool *Select by Location* and selecting *overlap*, QGIS selects all polygons in 301 Building Footprint file that overlap with polygons. They cannot be completely covered by these buffer zones, which eliminates the possibilit of a construction zone being counted as an adjacent site unless it is adjacent to construction as well.

Once these adjacent sites are selected, a new field created where

    if polygon is selected = 1
    else 0

The new field:

* AdjConst ➡️ 0-1 if adjacent to construction

Once the new field was finalize the data was saved out and given a new name.

#### Complaints Received 
To identify if a building filed a complaint with the Department of Building specifically regarding the status of the building, the DOB Complaints Received dataset was used. This data was pre-filtered using the filters provided by the platform for the following Complaint Categories:

    Complaint Category = 01 or 10 or 30 or 73

where,

    01 is Accident - Construction/Plumbing
    10 is Debris/Building - Falling or in Danger of Falling
    30 is Building Shaking/Vibrating/Structural Stability Affected
    73 is Failure to Maintain

These Complaint Categories were specifically chosen as they provide information regarding the strutural status of the building. This data was then aggregated by BIN and Complaint Category. 

| BIN# | 01 | 10 | 30 | 73 | Total |
| ---- | -- | -- | -- | -- | ----- |
| 123456789 | 0 | 0 | 0 | 1 | 1 |

Each row contains the count of each type of complaint received in that BIN. 

* 01 ➡️ number of 01 Complaints received
* 10 ➡️ number of 10 Complaints received
* 30 ➡️ number of 30 Complaints received
* 73 ➡️ number of 73 Complaints received
* Total ➡️ total number of Complaints received

This aggregated data is then merged to the master dataset by BIN and a new data field is using the following expression:

    if 01 is NOT NULL or 10 is NOT NULL or 30 is NOT NULL or 73 is NOT = 1
    else 0

The new field:

* Complaint ➡️ 0-1 if a complaint was received

Once the new field was finalize the data was saved out and given a new name.

**Source** | [Raw Data](https://data.cityofnewyork.us/Housing-Development/DOB-Complaints-Received/eabe-havv) | [Complaint Desc](https://www1.nyc.gov/assets/buildings/pdf/complaint_category.pdf) |

### 301 Building Population with Classifications
This master dataset is a merged dataset of the containing the following items:

* 301 Building Foot Prints
* Old Law Tenement Classification
* Construction Classification
* Adjacent to Construction Classification
* Complaint Received Classification

This dataset is used to create the map for Project 2.

Please note: that due to data restrictions this file was parsed by classification, each classification made into separate geojson files, with an additional file created for any buildings that didn't fall into any of the categories.

**Source** | [Processed Data]() |




