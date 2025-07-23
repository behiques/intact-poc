import { NextResponse } from 'next/server'

const mockBusinessUnits = [
  {
    name: '5500 Search',
    url: 'https://www.efast.dol.gov/5500Search/',
  },
  {
    name: 'AM Best',
    url: 'https://web.ambest.com/home',
  },
  {
    name: 'Authority Database',
    url: 'https://myportal.internal.local/underwriterauthority/authorityLimits.do',
  },
  {
    name: 'BUR Report (ProMetrix)',
    url: 'https://gateway-login.verisk.com/app/prometrix/auth/login',
  },
  {
    name: 'BVS',
    url: 'https://onebeacon.msbcommercial.com/Administration/Account/LogOn?isExpired=False',
  },
  {
    name: 'Bank Find',
    url: 'https://banks.data.fdic.gov/bankfind-suite/bankfind',
  },
  {
    name: 'Bankrate bank reviews',
    url: 'https://www.bankrate.com/banking/reviews/',
  },
  {
    name: 'BatchGeo',
    url: 'https://batchgeo.com/',
  },
  {
    name: 'Better View',
    url: 'https://betterview.com',
  },
  {
    name: 'BitSight',
    url: 'http://bitsighttech.com',
  },
  {
    name: 'CA WC Bureau',
    url: 'https://connect.wcirb.com/STAROnline/Account/Login.aspx?ReturnUrl=%2fSTAROnline%2fDefault.aspx',
  },
  {
    name: 'CAB Report',
    url: 'http://cabfinancial.com/',
  },
  {
    name: 'CDX WC',
    url: 'https://www.cdxworkcomp.org/',
  },
  {
    name: 'CWS Workstation',
    url: 'https://aneclmwebapp.internal.local/claims/cws/Desktop/Desktop/Desktop.aspx',
  },
  {
    name: 'Cap IQ',
    url: 'https://www.capitaliq.spglobal.com/',
  },
  {
    name: 'Cap IQ - Dashboard',
    url: 'https://www.capitaliq.com/CIQDotNet/my/dashboard.aspx',
  },
  {
    name: 'Clinical Trials',
    url: 'https://clinicaltrials.gov/',
  },
  {
    name: 'Cloud (Catastrophe Load UW Database)',
    url: 'https://dataservicesweb.internal.local/eBusiness/CATLoadUWTool/',
  },
  {
    name: 'Construction Equipment Guide',
    url: 'https://www.constructionequipmentguide.com/',
  },
  {
    name: 'DE WC Bureau',
    url: 'https://www.pcrbdata.com/ul/Default.aspx?StateCode=DE',
  },
  {
    name: 'Daily Med',
    url: 'https://dailymed.nlm.nih.gov/dailymed/',
  },
  {
    name: 'Deposit Accounts',
    url: 'https://www.depositaccounts.com/',
  },
  {
    name: 'E-FAC',
    url: 'https://dataservicesweb.internal.local/eBusiness/EFAC/',
  },
  {
    name: 'EPA - ECHO',
    url: 'https://echo.epa.gov/',
  },
  {
    name: 'Endorsement Request Tool',
    url: 'https://legal.internal.local/EndorsementRequest/Lists/EndorsementRequestTool/AllItems.aspx',
  },
  {
    name: 'Experian Averages on Mortgage Debt by state',
    url: 'https://www.experian.com/blogs/ask-experian/how-much-americans-owe-on-their-mortgages-in-every-state/',
  },
  {
    name: 'FDA',
    url: 'https://www.fda.gov/',
  },
  {
    name: 'FDA Dashboard',
    url: 'https://datadashboard.fda.gov/ora/fd/fser.htm',
  },
  {
    name: 'FDIC',
    url: 'https://www.fdic.gov/',
  },
  {
    name: 'FDIC Orders',
    url: 'https://orders.fdic.gov/s/searchform',
  },
  {
    name: 'FEMA',
    url: 'http://www.fema.gov/',
  },
  {
    name: 'FEMA Flood Map Service Center',
    url: 'https://msc.fema.gov/portal/home',
  },
  {
    name: 'FEMA Flood Zone Definitions',
    url: 'https://www.fema.gov/glossary/flood-zones',
  },
  {
    name: 'FFEIC',
    url: 'https://www.ffiec.gov/npw/',
  },
  {
    name: 'FFEIC - Call & UBPR Reports',
    url: 'https://cdr.ffiec.gov/public/ManageFacsimiles.aspx',
  },
  {
    name: 'FINRA BrokerCheck',
    url: 'https://brokercheck.finra.org/',
  },
  {
    name: 'Federal Reserve Enf Orders',
    url: 'https://www.federalreserve.gov/supervisionreg/enforcementactions.htm',
  },
  {
    name: 'Forms Library',
    url: 'https://intranet.internal.local/FormsLibrary',
  },
  {
    name: 'GenRe Connect',
    url: 'https://connect-us.genre.com/user/webuserindex.nsf/genreconnect',
  },
  {
    name: 'Google',
    url: 'https://www.google.com/',
  },
  {
    name: 'Google Maps',
    url: 'https://google.com/maps',
  },
  {
    name: 'Guidestar',
    url: 'https://www.guidestar.org/',
  },
  {
    name: 'HCTERS',
    url: 'https://www.accessdata.fda.gov/scripts/cber/CFAppsPub/tiss/index.cfm',
  },
  {
    name: 'Hazard Hub (Agent Risk View)',
    url: 'https://app.agentriskview.com/',
  },
  {
    name: 'ID WC Bureau',
    url: 'https://isrb.com/',
  },
  {
    name: 'IRMI',
    url: 'https://www.irmi.com/please-sign-in?ReturnUrl=%2fonline',
  },
  {
    name: 'ISO',
    url: 'https://products.iso.com/',
  },
  {
    name: 'ISONET',
    url: 'http://myportal.internal.local/isoRFA/link.aspx?app=https://authorization.iso.com/auth/global/federated.do?req_url=https://info.iso.com&prdid=94',
  },
  {
    name: 'MA WC Bureau',
    url: 'https://www.wcribma.org/mass/',
  },
  {
    name: 'MI WC Bureau',
    url: 'https://caom.com/',
  },
  {
    name: 'MN WC Bureau',
    url: 'https://www.mwcia.org/WebMembership/Login.aspx',
  },
  {
    name: 'MSB BVS Express Insurance to value Calculator',
    url: 'https://onebeacon.msbcommercial.com/',
  },
  {
    name: 'Machinery Trader',
    url: 'https://www.machinerytrader.com/',
  },
  {
    name: 'MunichRe-Location Risk Intelligence',
    url: 'https://byoid.b2clogin.com/17cd4695-aff3-4df3-8d9f-e42a48074485/b2c_1a_stdsigninonlycustomui/oauth2/v2.0/authorize?client_id=40149a1a-a88b-4ec4-bc59-20a5c0657827&scope=https%3A%2F%2Fbyoid.onmicrosoft.com%2Flri%2Flri%20openid%20profile%20offline_access&redirect_uri=https%3A%2F%2Frisksuite.munichre.com%2F&client-request-id=87c45d41-a58a-4e53-849d-c77acbe5cec1&response_mode=fragment&response_type=code&x-client-SKU=msal.js.browser&x-client-VER=3.5.0&client_info=1&code_challenge=6WtzR_5He5GDkB9p7MAPlCAz11-Ma8Mpp5OnL3R9BU8&code_challenge_method=S256&login_hint=ciam_d5b8be2d585b4247a807de6a21124f3b%40byoid.onmicrosoft.com&X-AnchorMailbox=Oid%3A3811a3bb-65ee-487d-b2d1-651fa6f44e6a-b2c_1a_stdsigninonlycustomui%4017cd4695-aff3-4df3-8d9f-e42a48074485&nonce=0ad76171-dbfe-4afa-b9a8-db02e2432a1d&state=eyJpZCI6ImY3NTNiNzE1LTAxYWItNGEzOC1iNzNkLWZiY2NkMWUxMzQ0YiIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicmVkaXJlY3QifX0%3D',
  },
  {
    name: 'NASU',
    url: 'https://enterpriseunderwriting.internal.local/SitePages/Home.aspx',
  },
  {
    name: 'NASU UW Toolbox',
    url: 'https://enterpriseunderwriting.internal.local/Training/SitePages/Home.aspx',
  },
  {
    name: 'NC WC Bureau',
    url: 'https://webportal.ncrb.org/NCRBPortal/PortalLogon.aspx',
  },
  {
    name: 'NCCI',
    url: 'https://www.ncci.com/pages/default.aspx',
  },
  {
    name: 'NCUA Credit Union Call Reports',
    url: 'https://mapping.ncua.gov/',
  },
  {
    name: 'NETR Free Stie Radius Report',
    url: 'https://environmental.netronline.com/',
  },
  {
    name: 'NJ WC Bureau',
    url: 'https://www.njcrib.com/',
  },
  {
    name: 'NY WC Bureau',
    url: 'https://centralsecurity.nycirb.org',
  },
  {
    name: 'National Flood Hazard Layer Web Map Service (WMS) in Google Earth',
    url: 'https://hazards.fema.gov/femaportal/wps/portal/NFHLWMSkmzdownload',
  },
  {
    name: 'NorthStar',
    url: 'https://northstar.internal.local/Pages/Default.aspx',
  },
  {
    name: 'OCC Enforcement Orders',
    url: 'https://apps.occ.gov/EASearch',
  },
  {
    name: 'ODEN',
    url: 'https://www.odenonline.com/oden/oden_login.phtml?username=onebeacon&password=dee',
  },
  {
    name: 'Online Producer Services',
    url: 'https://intranet.internal.local/Producer/home',
  },
  {
    name: 'PA WC Bureau',
    url: 'https://www.pcrbdata.com/ul/Default.aspx?StateCode=PA',
  },
  {
    name: 'Pandora',
    url: 'https://intact.pharm3r.com/',
  },
  {
    name: 'Producer Management 2.1',
    url: 'https://myportal.internal.local/AProducerManagement2new/#/home',
  },
  {
    name: 'Product Depot',
    url: 'https://legal.internal.local/ProductDepot/default.aspx',
  },
  {
    name: 'RAIN (Risk Aggregation Information)',
    url: 'https://dataservicesweb.internal.local/eBusiness/RAINUWTool/',
  },
  {
    name: 'Risk Meter - Natural Hazard Risk Reports (CoreLogic)',
    url: 'https://riskmeter.corelogic.com',
  },
  {
    name: 'Riskmeter',
    url: 'https://riskmeter.corelogic.com/login?destinationUrl=https:%2F%2Friskmeter.corelogic.com%2F',
  },
  {
    name: 'SEC',
    url: 'https://www.sec.gov/search-filings',
  },
  {
    name: 'SEC Adviser Info',
    url: 'https://adviserinfo.sec.gov/',
  },
  {
    name: 'Safer report',
    url: 'http://safer.fmcsa.dot.gov/CompanySnapshot.aspx',
  },
  {
    name: 'SharePoint - NASU',
    url: 'https://enterpriseunderwriting.internal.local/SitePages/QuickLinks.aspx',
  },
  {
    name: 'Stanford Securities Filings',
    url: 'https://securities.stanford.edu/filings-case.html?id=107683',
  },
  {
    name: 'State Information Page',
    url: 'https://myportal.internal.local/StaticFiles/intranet/advantage/manuals/phs/toc_state_info_ob.html',
  },
  {
    name: 'State Status/Information',
    url: 'https://myportal.internal.local/StaticFiles/intranet/advantage/manuals/PHS/index.htm',
  },
  {
    name: 'WA WC Bureau',
    url: 'https://www1.wsrb.com/login',
  },
  {
    name: 'WI WC Bureau',
    url: 'https://www.wcrb.org',
  },
  {
    name: 'Zip Code Finder',
    url: 'https://tools.usps.com/go/ZipLookupAction!input.action',
  },
]

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Return mock data
    return NextResponse.json({ data: mockBusinessUnits })
  } catch (error) {
    return NextResponse.json(
      { error: error, message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
