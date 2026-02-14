(function () {
    'use strict';

    var config = window.crmzeTourConfig;
    if (!config) return;

    var lang = config.langCode === 'sq' ? 'sq' : 'en';
    var webroot = config.webroot || '';
    var panelOpen = false;
    var welcomeShown = false;

    // ─── UI Translations ───

    var ui = {
        sq: {
            title: 'Ndihm\u00eb',
            placeholder: 'Shkruani pyetjen tuaj...',
            welcome: 'P\u00ebrsh\u00ebndetje! Un\u00eb jam asistenti i ndihm\u00ebs. Si mund t\'ju ndihmoj?',
            noResults: 'Nuk gjeta p\u00ebrgjigje. Provoni nj\u00eb nga temat:',
            tourBtn: 'Fillo Udh\u00ebzuesin',
            langLabel: 'EN',
            categories: {
                patient: 'Pacienti',
                calendar: 'Kalendari',
                encounter: 'Vizitat',
                billing: 'Faturimi',
                reports: 'Raportet',
                admin: 'Administrimi',
                general: 'T\u00eb P\u00ebrgjithshme'
            },
            chips: ['Regjistro pacient', 'Cakto takim', 'Krijo vizit\u00eb', 'Faturimi', 'Raportet', 'Cil\u00ebsimet']
        },
        en: {
            title: 'Help',
            placeholder: 'Type your question...',
            welcome: 'Hello! I\'m the help assistant. How can I help you?',
            noResults: 'I couldn\'t find an answer. Try one of these topics:',
            tourBtn: 'Start Tour',
            langLabel: 'SQ',
            categories: {
                patient: 'Patients',
                calendar: 'Calendar',
                encounter: 'Encounters',
                billing: 'Billing',
                reports: 'Reports',
                admin: 'Admin',
                general: 'General'
            },
            chips: ['Register patient', 'Schedule appointment', 'Create visit', 'Billing', 'Reports', 'Settings']
        }
    };

    // ─── Knowledge Base ───

    var KB = [
        {
            id: 'patient-new', category: 'patient',
            kw: { en: ['patient','client','register','add','new','create','enroll'], sq: ['pacient','klient','regjistro','shto','ri','krijo'] },
            syn: { en: {customer:'patient',person:'patient',enroll:'register'}, sq: {konsumator:'klient',blerjes:'klient'} },
            title: { en: 'Register a new patient', sq: 'Regjistro pacient t\u00eb ri' },
            answer: {
                en: '<ol><li>Click <strong>"Patient/Client"</strong> in the menu</li><li>Click <strong>"New/Search"</strong></li><li>Fill in: First Name, Last Name, Date of Birth, Gender</li><li>Add phone and email (optional)</li><li>Click <strong>"Create New Patient"</strong></li></ol>',
                sq: '<ol><li>Klikoni <strong>"Pacienti/Klienti"</strong> n\u00eb meny</li><li>Klikoni <strong>"K\u00ebrkim/i Ri"</strong></li><li>Plot\u00ebsoni: Emri, Mbiemri, Dat\u00eblindja, Gjinia</li><li>Shtoni telefonin dhe email (opsionale)</li><li>Klikoni <strong>"Krijo Pacientin e Ri"</strong></li></ol>'
            },
            actions: [{ label: { en: 'Open Registration', sq: 'Hap Regjistrimin' }, target: 'pat', url: '/interface/new/new.php' }],
            related: ['patient-search', 'patient-edit']
        },
        {
            id: 'patient-search', category: 'patient',
            kw: { en: ['search','find','look','patient','existing','locate','chart'], sq: ['k\u00ebrko','gjej','pacient','ekzistues','kartel\u00eb'] },
            syn: { en: {lookup:'search',browse:'search'}, sq: {} },
            title: { en: 'Search for a patient', sq: 'K\u00ebrko pacient' },
            answer: {
                en: '<ol><li>Use the <strong>search box</strong> at the top \u2013 type a name or chart number</li><li>OR click <strong>"Patient/Client" > "New/Search"</strong></li><li>OR use the <strong>Finder</strong> for advanced search with filters</li></ol>',
                sq: '<ol><li>P\u00ebrdorni <strong>fush\u00ebn e k\u00ebrkimit</strong> n\u00eb krye \u2013 shkruani emrin ose numrin e kartel\u00ebs</li><li>OSE klikoni <strong>"Pacienti/Klienti" > "K\u00ebrkim/i Ri"</strong></li><li>OSE p\u00ebrdorni <strong>Finder</strong> p\u00ebr k\u00ebrkim t\u00eb avancuar me filtra</li></ol>'
            },
            actions: [
                { label: { en: 'Open Search', sq: 'Hap K\u00ebrkimin' }, target: 'pat', url: '/interface/new/new.php' },
                { label: { en: 'Open Finder', sq: 'Hap Finder' }, target: 'fin', url: '/interface/main/finder/dynamic_finder.php' }
            ],
            related: ['patient-new', 'patient-edit']
        },
        {
            id: 'patient-edit', category: 'patient',
            kw: { en: ['edit','update','change','modify','demographics','info','details','address','phone'], sq: ['ndrysho','p\u00ebrditsuo','modifiko','t\u00eb dh\u00ebna','informacion','adres\u00eb','telefon'] },
            syn: { en: {update:'edit',modify:'edit',correct:'edit'}, sq: {} },
            title: { en: 'Edit patient details', sq: 'Ndrysho t\u00eb dh\u00ebnat e pacientit' },
            answer: {
                en: '<ol><li>Search for and select the patient</li><li>The patient dashboard opens</li><li>Click <strong>"Demographics"</strong> or the edit icon</li><li>Update the fields</li><li>Click <strong>"Save"</strong></li></ol>',
                sq: '<ol><li>K\u00ebrkoni dhe zgjidhni pacientin</li><li>Hapet dashboard-i i pacientit</li><li>Klikoni <strong>"Demografike"</strong> ose ikon\u00ebn e modifikimit</li><li>P\u00ebrditsoni fushat</li><li>Klikoni <strong>"Ruaj"</strong></li></ol>'
            },
            actions: [{ label: { en: 'Find Patient', sq: 'Gjej Pacientin' }, target: 'fin', url: '/interface/main/finder/dynamic_finder.php' }],
            related: ['patient-search', 'patient-new']
        },
        {
            id: 'patient-history', category: 'patient',
            kw: { en: ['history','record','past','visits','medical','chart','summary'], sq: ['historik','kartel\u00eb','vizita','t\u00eb kaluara','mj\u00ebksor','p\u00ebrmbledh\u00eb'] },
            syn: { en: {}, sq: {} },
            title: { en: 'View patient history', sq: 'Shiko historikun e pacientit' },
            answer: {
                en: '<ol><li>Select the patient from search or Finder</li><li>The dashboard shows all past encounters and documents</li><li>Click any encounter to see details</li><li>Use <strong>"History"</strong> for medical/surgical history</li></ol>',
                sq: '<ol><li>Zgjidhni pacientin nga k\u00ebrkimi ose Finder</li><li>Dashboard-i tregon t\u00eb gjitha vizitat dhe dokumentet</li><li>Klikoni mbi nj\u00eb vizit\u00eb p\u00ebr detaje</li><li>P\u00ebrdorni <strong>"Historiku"</strong> p\u00ebr historikun mj\u00ebk\u00ebsor</li></ol>'
            },
            actions: [{ label: { en: 'Find Patient', sq: 'Gjej Pacientin' }, target: 'fin', url: '/interface/main/finder/dynamic_finder.php' }],
            related: ['patient-search', 'encounter-create']
        },
        {
            id: 'calendar-view', category: 'calendar',
            kw: { en: ['calendar','schedule','appointments','view','today','week','month'], sq: ['kalendar','orar','takime','shiko','sot','jav\u00eb','muaj'] },
            syn: { en: {schedule:'calendar',agenda:'calendar',timetable:'calendar',booking:'appointment',slot:'appointment'}, sq: {orar:'kalendar',axhend\u00eb:'kalendar',rezervim:'takim'} },
            title: { en: 'View the calendar', sq: 'Shiko kalendarin' },
            answer: {
                en: '<ol><li>Click <strong>"Calendar"</strong> in the menu</li><li>Today\'s appointments are shown</li><li>Switch views with <strong>Day/Week/Month</strong> buttons</li><li>Colors indicate appointment categories</li><li>Click any appointment for details</li></ol>',
                sq: '<ol><li>Klikoni <strong>"Kalendari"</strong> n\u00eb meny</li><li>Shfaqen takimet e sotme</li><li>Ndryshoni pamjen me butonat <strong>Dit\u00eb/Jav\u00eb/Muaj</strong></li><li>Ngjyrat tregojn\u00eb kategorit\u00eb</li><li>Klikoni mbi nj\u00eb takim p\u00ebr detaje</li></ol>'
            },
            actions: [{ label: { en: 'Open Calendar', sq: 'Hap Kalendarin' }, target: 'cal', url: '/interface/main/main_info.php' }],
            related: ['calendar-add', 'calendar-checkin']
        },
        {
            id: 'calendar-add', category: 'calendar',
            kw: { en: ['appointment','schedule','book','create','new','slot','time','reserve'], sq: ['takim','cakto','rezervo','krijo','ri','koh\u00eb','orari'] },
            syn: { en: {book:'schedule',reserve:'schedule',booking:'appointment'}, sq: {rezervo:'cakto'} },
            title: { en: 'Schedule an appointment', sq: 'Cakto nj\u00eb takim' },
            answer: {
                en: '<ol><li>Click <strong>"Calendar"</strong> in the menu</li><li>Click an <strong>empty time slot</strong></li><li>Select the <strong>patient</strong></li><li>Choose the <strong>provider</strong> and <strong>category</strong></li><li>Set the <strong>duration</strong></li><li>Click <strong>"Save"</strong></li></ol>',
                sq: '<ol><li>Klikoni <strong>"Kalendari"</strong> n\u00eb meny</li><li>Klikoni n\u00eb nj\u00eb <strong>slot t\u00eb lir\u00eb</strong></li><li>Zgjidhni <strong>pacientin</strong></li><li>Zgjidhni <strong>mjekun</strong> dhe <strong>kategorin\u00eb</strong></li><li>Vendosni <strong>koh\u00ebzgjatjen</strong></li><li>Klikoni <strong>"Ruaj"</strong></li></ol>'
            },
            actions: [{ label: { en: 'Open Calendar', sq: 'Hap Kalendarin' }, target: 'cal', url: '/interface/main/main_info.php' }],
            related: ['calendar-view', 'calendar-checkin']
        },
        {
            id: 'calendar-checkin', category: 'calendar',
            kw: { en: ['check','checkin','arrive','arrived','front','desk','walkin'], sq: ['regjistrim','check','mb\u00ebrritje','recepsion'] },
            syn: { en: {walkin:'checkin',arrived:'checkin',arrival:'checkin'}, sq: {} },
            title: { en: 'Check in a patient', sq: 'Regjistro pacientin n\u00eb klinik\u00eb' },
            answer: {
                en: '<ol><li>Open the <strong>Calendar</strong></li><li>Find the patient\'s appointment</li><li>Click on the appointment</li><li>Select <strong>"Check In"</strong></li><li>Status changes to "Checked In"</li></ol>',
                sq: '<ol><li>Hapni <strong>Kalendarin</strong></li><li>Gjeni takimin e pacientit</li><li>Klikoni mbi takimin</li><li>Zgjidhni <strong>"Check In"</strong></li><li>Statusi ndryshon n\u00eb "I regjistruar"</li></ol>'
            },
            actions: [{ label: { en: 'Open Calendar', sq: 'Hap Kalendarin' }, target: 'cal', url: '/interface/main/main_info.php' }],
            related: ['calendar-view', 'calendar-add']
        },
        {
            id: 'encounter-create', category: 'encounter',
            kw: { en: ['encounter','visit','clinical','consultation','exam','examination'], sq: ['vizit\u00eb','klinike','konsult\u00eb','ekzaminim'] },
            syn: { en: {consultation:'encounter',exam:'encounter'}, sq: {konsult\u00eb:'vizit\u00eb'} },
            title: { en: 'Create a clinical encounter', sq: 'Krijo nj\u00eb vizit\u00eb klinike' },
            answer: {
                en: '<ol><li>Select a patient first</li><li>Click <strong>"New Encounter"</strong> or <strong>"Create Visit"</strong></li><li>Select the visit category and reason</li><li>The encounter opens for documentation</li></ol>',
                sq: '<ol><li>Zgjidhni nj\u00eb pacient s\u00eb pari</li><li>Klikoni <strong>"Vizit\u00eb e Re"</strong> ose <strong>"Krijo Vizit\u00eb"</strong></li><li>Zgjidhni kategorin\u00eb dhe arsyen e vizit\u00ebs</li><li>Vizita hapet p\u00ebr dokumentim</li></ol>'
            },
            actions: [{ label: { en: 'Find Patient', sq: 'Gjej Pacientin' }, target: 'fin', url: '/interface/main/finder/dynamic_finder.php' }],
            related: ['encounter-soap', 'encounter-procedures']
        },
        {
            id: 'encounter-soap', category: 'encounter',
            kw: { en: ['soap','notes','clinical','subjective','objective','assessment','plan','complaint','diagnosis'], sq: ['sh\u00ebnime','soap','subjektive','objektive','vl\u00ebre\u00ebsim','plan','ankesa','diagnoz\u00eb'] },
            syn: { en: {complaint:'subjective',diagnosis:'assessment',treatment:'plan'}, sq: {} },
            title: { en: 'Add SOAP notes', sq: 'Shto sh\u00ebnime SOAP' },
            answer: {
                en: '<ol><li>Open the patient\'s active encounter</li><li>Click <strong>"Clinical"</strong> or find <strong>"SOAP"</strong></li><li>Fill in: <strong>S</strong>ubjective, <strong>O</strong>bjective, <strong>A</strong>ssessment, <strong>P</strong>lan</li><li>Click <strong>"Save"</strong></li></ol>',
                sq: '<ol><li>Hapni vizit\u00ebn aktive t\u00eb pacientit</li><li>Klikoni <strong>"Klinike"</strong> ose gjeni <strong>"SOAP"</strong></li><li>Plot\u00ebsoni: <strong>S</strong>ubjektive, <strong>O</strong>bjektive, <strong>A</strong>ssessment, <strong>P</strong>lan</li><li>Klikoni <strong>"Ruaj"</strong></li></ol>'
            },
            actions: [],
            related: ['encounter-create', 'encounter-procedures']
        },
        {
            id: 'encounter-procedures', category: 'encounter',
            kw: { en: ['procedure','dental','cleaning','filling','extraction','crown','root','canal','treatment','service','tooth'], sq: ['procedur\u00eb','dentare','pastrim','mbushje','nx\u00ebrrje','kuror\u00eb','kanal','trajtim','dh\u00ebmb'] },
            syn: { en: {}, sq: {} },
            title: { en: 'Add dental procedures', sq: 'Shto procedura dentare' },
            answer: {
                en: '<ol><li>Open the patient\'s encounter</li><li>Go to clinical forms</li><li>Select the dental procedure form</li><li>Choose: cleaning, filling, extraction, etc.</li><li>Select tooth number if applicable</li><li>Click <strong>"Save"</strong></li></ol>',
                sq: '<ol><li>Hapni vizit\u00ebn e pacientit</li><li>Shkoni te formular\u00ebt klinik\u00eb</li><li>Zgjidhni formularin e procedur\u00ebs dentare</li><li>Zgjidhni: pastrim, mbushje, nx\u00ebrrje, etj.</li><li>Zgjidhni numrin e dh\u00ebmbit n\u00ebse nevojitet</li><li>Klikoni <strong>"Ruaj"</strong></li></ol>'
            },
            actions: [],
            related: ['encounter-create', 'billing-feesheet']
        },
        {
            id: 'encounter-prescriptions', category: 'encounter',
            kw: { en: ['prescription','medication','medicine','drug','prescribe','pharmacy','rx'], sq: ['recet\u00eb','medikament','ila\u00e7','bar','farmaci'] },
            syn: { en: {drug:'medication',medicine:'medication',meds:'medication',rx:'prescription'}, sq: {} },
            title: { en: 'Add prescriptions', sq: 'Shto receta' },
            answer: {
                en: '<ol><li>Open the patient\'s encounter</li><li>Click <strong>"Prescriptions"</strong></li><li>Enter medication name, dosage, frequency</li><li>Add pharmacy info if needed</li><li>Click <strong>"Save"</strong></li></ol>',
                sq: '<ol><li>Hapni vizit\u00ebn e pacientit</li><li>Klikoni <strong>"Recetat"</strong></li><li>Vendosni emrin e medikamentit, dozimin, frekuenc\u00ebn</li><li>Shtoni informacionin e farmacis\u00eb n\u00ebse nevojitet</li><li>Klikoni <strong>"Ruaj"</strong></li></ol>'
            },
            actions: [],
            related: ['encounter-create', 'encounter-soap']
        },
        {
            id: 'encounter-vitals', category: 'encounter',
            kw: { en: ['vitals','vital','blood','pressure','temperature','weight','height','bmi','pulse'], sq: ['vitale','presion','temperatur\u00eb','pesh\u00eb','gjat\u00ebsi','puls'] },
            syn: { en: {}, sq: {} },
            title: { en: 'Record vital signs', sq: 'Regjistro sh\u00ebnime vitale' },
            answer: {
                en: '<ol><li>Open the patient\'s encounter</li><li>Click <strong>"Vitals"</strong></li><li>Enter: blood pressure, temperature, pulse, weight, height</li><li>BMI calculates automatically</li><li>Click <strong>"Save"</strong></li></ol>',
                sq: '<ol><li>Hapni vizit\u00ebn e pacientit</li><li>Klikoni <strong>"Vitale"</strong></li><li>Vendosni: presionin, temperatur\u00ebn, pulsin, pesh\u00ebn, gjat\u00ebsin\u00eb</li><li>BMI llogaritet automatikisht</li><li>Klikoni <strong>"Ruaj"</strong></li></ol>'
            },
            actions: [],
            related: ['encounter-create', 'encounter-soap']
        },
        {
            id: 'billing-feesheet', category: 'billing',
            kw: { en: ['fee','feesheet','charge','price','billing','cost','service','cpt','code'], sq: ['tarif\u00eb','flet\u00eb','\u00e7mim','faturim','kosto','sh\u00ebrbim','kodi'] },
            syn: { en: {price:'fee',cost:'fee',charge:'fee',invoice:'billing'}, sq: {cmim:'tarif\u00eb',kosto:'tarif\u00eb'} },
            title: { en: 'Add charges to fee sheet', sq: 'Shto tarifa n\u00eb flet\u00ebn e tarifave' },
            answer: {
                en: '<ol><li>Select a patient with an active encounter</li><li>Click <strong>"Fees"</strong> in the menu</li><li>Click <strong>"Fee Sheet"</strong></li><li>Select the procedure/service</li><li>CPT code and price load automatically</li><li>Click <strong>"Save"</strong></li></ol>',
                sq: '<ol><li>Zgjidhni pacientin me vizit\u00eb aktive</li><li>Klikoni <strong>"Tarifa"</strong> n\u00eb meny</li><li>Klikoni <strong>"Fleta e Tarifave"</strong></li><li>Zgjidhni procedur\u00ebn/sh\u00ebrbimin</li><li>Kodi CPT dhe \u00e7mimi ngarkohen automatikisht</li><li>Klikoni <strong>"Ruaj"</strong></li></ol>'
            },
            actions: [{ label: { en: 'Open Fee Sheet', sq: 'Hap Flet\u00ebn e Tarifave' }, target: 'enc', url: '/interface/patient_file/encounter/load_form.php?formname=fee_sheet' }],
            related: ['billing-manager', 'billing-payment']
        },
        {
            id: 'billing-manager', category: 'billing',
            kw: { en: ['billing','manager','invoices','claims','outstanding','balance','unbilled'], sq: ['menaxher','faturimi','fatura','bilanc','papaguara'] },
            syn: { en: {invoice:'billing',unpaid:'outstanding'}, sq: {} },
            title: { en: 'Use the billing manager', sq: 'P\u00ebrdor menaxherin e faturimit' },
            answer: {
                en: '<ol><li>Click <strong>"Fees" > "Billing Manager"</strong></li><li>See all unbilled encounters</li><li>Select encounters to process</li><li>Generate claims or mark as billed</li><li>Track payments and balances</li></ol>',
                sq: '<ol><li>Klikoni <strong>"Tarifa" > "Menaxheri i Faturimit"</strong></li><li>Shihni t\u00eb gjitha vizitat e pafaturuara</li><li>Zgjidhni vizitat p\u00ebr procesim</li><li>Gjeneroni faturat ose sh\u00ebnojini si t\u00eb faturuara</li><li>Ndiqni pagesat dhe bilancet</li></ol>'
            },
            actions: [{ label: { en: 'Open Billing', sq: 'Hap Faturimin' }, target: 'bil0', url: '/interface/billing/billing_report.php' }],
            related: ['billing-feesheet', 'billing-payment']
        },
        {
            id: 'billing-payment', category: 'billing',
            kw: { en: ['payment','pay','cash','card','collect','receipt','transaction','money'], sq: ['pages\u00eb','paguaj','para','kart\u00eb','ark\u00eb','d\u00ebshmi','transaksion'] },
            syn: { en: {cash:'payment',money:'payment'}, sq: {} },
            title: { en: 'Record a payment', sq: 'Regjistro nj\u00eb pages\u00eb' },
            answer: {
                en: '<ol><li>Select the patient</li><li>Go to <strong>"Fees" > "Payment"</strong></li><li>Enter the payment amount</li><li>Select method (cash, card, etc.)</li><li>Add reference number if needed</li><li>Click <strong>"Save"</strong></li></ol>',
                sq: '<ol><li>Zgjidhni pacientin</li><li>Shkoni te <strong>"Tarifa" > "Pagesa"</strong></li><li>Vendosni shum\u00ebn e pages\u00ebs</li><li>Zgjidhni m\u00ebnyr\u00ebn (para n\u00eb dor\u00eb, kart\u00eb, etj.)</li><li>Shtoni numrin e referenc\u00ebs n\u00ebse nevojitet</li><li>Klikoni <strong>"Ruaj"</strong></li></ol>'
            },
            actions: [{ label: { en: 'Open Billing', sq: 'Hap Faturimin' }, target: 'bil0', url: '/interface/billing/billing_report.php' }],
            related: ['billing-manager', 'billing-feesheet']
        },
        {
            id: 'reports-overview', category: 'reports',
            kw: { en: ['report','reports','analytics','statistics','data','overview','summary'], sq: ['raport','raportet','analitik\u00eb','statistika','t\u00eb dh\u00ebna','p\u00ebrmbledh\u00eb'] },
            syn: { en: {analytics:'reports',stats:'statistics'}, sq: {} },
            title: { en: 'View reports', sq: 'Shiko raportet' },
            answer: {
                en: '<ol><li>Click <strong>"Reports"</strong> in the menu</li><li>Choose: Patient Lists, Financial, Visits, Prescriptions</li><li>Set date ranges and filters</li><li>Click <strong>"Submit"</strong></li><li>Export to CSV or print</li></ol>',
                sq: '<ol><li>Klikoni <strong>"Raportet"</strong> n\u00eb meny</li><li>Zgjidhni: Lista Pacient\u00ebve, Financiare, Vizitat, Recetat</li><li>Vendosni periudh\u00ebn dhe filtrat</li><li>Klikoni <strong>"D\u00ebrgo"</strong></li><li>Eksportoni n\u00eb CSV ose printoni</li></ol>'
            },
            actions: [],
            related: ['reports-patients', 'reports-financial']
        },
        {
            id: 'reports-patients', category: 'reports',
            kw: { en: ['patient','list','roster','demographics'], sq: ['lista','pacient\u00ebve','regjistri','demografike'] },
            syn: { en: {}, sq: {} },
            title: { en: 'Patient list report', sq: 'Raporti i list\u00ebs s\u00eb pacient\u00ebve' },
            answer: {
                en: '<ol><li>Go to <strong>"Reports"</strong></li><li>Select <strong>"Patient List"</strong></li><li>Apply filters: date, provider, insurance</li><li>Click <strong>"Submit"</strong></li><li>Export to CSV if needed</li></ol>',
                sq: '<ol><li>Shkoni te <strong>"Raportet"</strong></li><li>Zgjidhni <strong>"Lista e Pacient\u00ebve"</strong></li><li>Aplikoni filtrat: periudha, mjeku, sigurimi</li><li>Klikoni <strong>"D\u00ebrgo"</strong></li><li>Eksportoni n\u00eb CSV n\u00ebse nevojitet</li></ol>'
            },
            actions: [],
            related: ['reports-overview', 'reports-financial']
        },
        {
            id: 'reports-financial', category: 'reports',
            kw: { en: ['financial','revenue','income','earnings','daily','monthly','profit','collections'], sq: ['financiar','t\u00eb ardhura','fitim','ditore','mujore','mbledhje'] },
            syn: { en: {income:'revenue',earnings:'revenue',profit:'revenue',money:'revenue'}, sq: {} },
            title: { en: 'Financial reports', sq: 'Raportet financiare' },
            answer: {
                en: '<ol><li>Go to <strong>"Reports"</strong></li><li>Find financial options: Collections, Summary, Receipts</li><li>Set the date range</li><li>Select provider or view all</li><li>Click <strong>"Submit"</strong></li></ol>',
                sq: '<ol><li>Shkoni te <strong>"Raportet"</strong></li><li>Gjeni opsionet financiare: Mbledhjet, P\u00ebrmbledhja, Faturat</li><li>Vendosni periudh\u00ebn kohore</li><li>Zgjidhni mjekun ose shikoni t\u00eb gjitha</li><li>Klikoni <strong>"D\u00ebrgo"</strong></li></ol>'
            },
            actions: [],
            related: ['reports-overview', 'reports-patients']
        },
        {
            id: 'admin-config', category: 'admin',
            kw: { en: ['settings','configuration','config','admin','global','system','preferences'], sq: ['cil\u00ebsimet','konfigurimi','admin','globale','sistemi','preferenca'] },
            syn: { en: {settings:'config',preferences:'config',options:'config'}, sq: {} },
            title: { en: 'System settings', sq: 'Cil\u00ebsimet e sistemit' },
            answer: {
                en: '<ol><li>Click <strong>"Admin"</strong> in the menu</li><li>Click <strong>"Config"</strong> or <strong>"Globals"</strong></li><li>Browse settings categories on the left</li><li>Modify as needed</li><li>Click <strong>"Save"</strong> at the bottom</li></ol><p><em>Only administrators have access.</em></p>',
                sq: '<ol><li>Klikoni <strong>"Admin"</strong> n\u00eb meny</li><li>Klikoni <strong>"Konfigurim"</strong> ose <strong>"Globale"</strong></li><li>Shfletoni kategorit\u00eb n\u00eb t\u00eb majt\u00eb</li><li>Modifikoni sipas nevoj\u00ebs</li><li>Klikoni <strong>"Ruaj"</strong> n\u00eb fund</li></ol><p><em>Vet\u00ebm administrator\u00ebt kan\u00eb akses.</em></p>'
            },
            actions: [{ label: { en: 'Open Settings', sq: 'Hap Cil\u00ebsimet' }, target: 'adm', url: '/interface/super/edit_globals.php' }],
            related: ['admin-users']
        },
        {
            id: 'admin-users', category: 'admin',
            kw: { en: ['user','users','staff','employee','account','access','permissions','role'], sq: ['p\u00ebrdorues','staf','punonj\u00ebs','llogari','akses','leje','rol'] },
            syn: { en: {staff:'user',employee:'user',personnel:'user'}, sq: {} },
            title: { en: 'Manage users', sq: 'Menaxho p\u00ebrdoruesit' },
            answer: {
                en: '<ol><li>Click <strong>"Admin"</strong></li><li>Click <strong>"Users"</strong></li><li>To add: click "Add User", fill in details</li><li>To edit: click a username</li><li>Assign roles and access controls</li></ol>',
                sq: '<ol><li>Klikoni <strong>"Admin"</strong></li><li>Klikoni <strong>"P\u00ebrdoruesit"</strong></li><li>P\u00ebr t\u00eb shtuar: klikoni "Shto P\u00ebrdorues", plot\u00ebsoni detajet</li><li>P\u00ebr t\u00eb modifikuar: klikoni mbi emrin</li><li>Caktoni rolet dhe akseset</li></ol>'
            },
            actions: [{ label: { en: 'Open Settings', sq: 'Hap Cil\u00ebsimet' }, target: 'adm', url: '/interface/super/edit_globals.php' }],
            related: ['admin-config']
        },
        {
            id: 'general-messages', category: 'general',
            kw: { en: ['message','messages','internal','inbox','send','communicate','notification'], sq: ['mesazh','mesazhet','inbox','d\u00ebrgo','komuniko','njoftim'] },
            syn: { en: {inbox:'messages',mail:'messages',notification:'messages'}, sq: {} },
            title: { en: 'Internal messages', sq: 'Mesazhet e brendshme' },
            answer: {
                en: '<ol><li>Click <strong>"Messages"</strong> in the menu</li><li>Your inbox shows received messages</li><li>Click "New Message" to compose</li><li>Select recipient (staff member)</li><li>Type and click <strong>"Send"</strong></li></ol>',
                sq: '<ol><li>Klikoni <strong>"Mesazhet"</strong> n\u00eb meny</li><li>Inbox-i tregon mesazhet e marra</li><li>Klikoni "Mesazh i Ri" p\u00ebr t\u00eb kompozuar</li><li>Zgjidhni marr\u00ebsin (an\u00ebtar stafi)</li><li>Shkruani dhe klikoni <strong>"D\u00ebrgo"</strong></li></ol>'
            },
            actions: [{ label: { en: 'Open Messages', sq: 'Hap Mesazhet' }, target: 'msg', url: '/interface/main/messages/messages.php?form_active=1' }],
            related: ['general-profile']
        },
        {
            id: 'general-profile', category: 'general',
            kw: { en: ['profile','password','change','logout','sign','account','username'], sq: ['profili','fjal\u00ebkalimi','ndrysho','dil','llogaria','p\u00ebrdoruesi'] },
            syn: { en: {signout:'logout',logoff:'logout'}, sq: {} },
            title: { en: 'Profile & password', sq: 'Profili & fjal\u00ebkalimi' },
            answer: {
                en: '<ol><li>Click your <strong>name</strong> in the top-right</li><li>Select "My Account" or "Change Password"</li><li>Enter current and new password</li><li>Click <strong>"Save"</strong></li><li>To log out: click name \u2192 "Log Out"</li></ol>',
                sq: '<ol><li>Klikoni <strong>emrin tuaj</strong> n\u00eb krye djathtas</li><li>Zgjidhni "Llogaria Ime" ose "Ndrysho Fjal\u00ebkalimin"</li><li>Vendosni fjal\u00ebkalimin aktual dhe t\u00eb riun</li><li>Klikoni <strong>"Ruaj"</strong></li><li>P\u00ebr t\u00eb dal\u00eb: klikoni emrin \u2192 "Dil"</li></ol>'
            },
            actions: [],
            related: ['admin-config']
        },
        {
            id: 'general-navigation', category: 'general',
            kw: { en: ['navigate','menu','navigation','how','use','help','interface','tabs','layout','where'], sq: ['navigo','meny','navigim','si','p\u00ebrdor','ndihm\u00eb','nd\u00ebrfaqe','skeda','ku'] },
            syn: { en: {}, sq: {} },
            title: { en: 'How to navigate', sq: 'Si t\u00eb navigoni' },
            answer: {
                en: '<ol><li>The top <strong>navigation bar</strong> has all sections</li><li>Click a section to see its submenu</li><li>Pages open in <strong>tabs</strong> \u2013 work with multiple at once</li><li>The <strong>search box</strong> at top finds patients quickly</li><li>Click <strong>?</strong> for a guided tour anytime</li></ol>',
                sq: '<ol><li><strong>Shiriti i navigimit</strong> n\u00eb krye ka t\u00eb gjitha seksionet</li><li>Klikoni nj\u00eb seksion p\u00ebr n\u00ebn-menyn\u00eb</li><li>Faqet hapen n\u00eb <strong>skeda</strong> \u2013 punoni me disa nj\u00ebkoh\u00ebsisht</li><li><strong>Fusha e k\u00ebrkimit</strong> n\u00eb krye gjen pacient\u00ebt shpejt</li><li>Klikoni <strong>?</strong> p\u00ebr udh\u00ebzuesin n\u00eb \u00e7do koh\u00eb</li></ol>'
            },
            actions: [],
            related: ['general-profile', 'patient-search']
        },
        {
            id: 'general-shortcuts', category: 'general',
            kw: { en: ['shortcut','keyboard','tip','trick','fast','quick','efficiency','hotkey'], sq: ['shkurtor\u00eb','tastier\u00eb','k\u00ebshill\u00eb','truk','shpejt','efikasitet'] },
            syn: { en: {}, sq: {} },
            title: { en: 'Tips & shortcuts', sq: 'K\u00ebshilla & shkurtore' },
            answer: {
                en: '<ul><li>Use the <strong>top search bar</strong> to find any patient fast</li><li>Open <strong>multiple tabs</strong> for multitasking</li><li>Use <strong>browser back</strong> button to navigate</li><li>Bookmark frequently used pages</li><li>Click <strong>?</strong> to replay the guided tour</li></ul>',
                sq: '<ul><li>P\u00ebrdorni <strong>fush\u00ebn e k\u00ebrkimit</strong> p\u00ebr t\u00eb gjetur pacient\u00ebt shpejt</li><li>Hapni <strong>disa skeda</strong> p\u00ebr multitasking</li><li>P\u00ebrdorni butonin <strong>mbrapa</strong> t\u00eb shfletuesit</li><li>Ruani n\u00eb sh\u00ebnues faqet e p\u00ebrdorura shpesh</li><li>Klikoni <strong>?</strong> p\u00ebr t\u00eb rifilluar udh\u00ebzuesin</li></ul>'
            },
            actions: [],
            related: ['general-navigation']
        }
    ];

    // ─── Matching Engine ───

    function levenshtein(a, b) {
        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;
        var matrix = [];
        for (var i = 0; i <= b.length; i++) matrix[i] = [i];
        for (var j = 0; j <= a.length; j++) matrix[0][j] = j;
        for (i = 1; i <= b.length; i++) {
            for (j = 1; j <= a.length; j++) {
                matrix[i][j] = b[i - 1] === a[j - 1]
                    ? matrix[i - 1][j - 1]
                    : Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
            }
        }
        return matrix[b.length][a.length];
    }

    function normalize(text) {
        return text.toLowerCase().replace(/[^\w\s\u00e0-\u024f]/g, '').trim().split(/\s+/).filter(function (w) { return w.length > 1; });
    }

    function expandSynonyms(words, topic) {
        var syns = topic.syn && topic.syn[lang] ? topic.syn[lang] : {};
        var expanded = [];
        for (var i = 0; i < words.length; i++) {
            expanded.push(words[i]);
            if (syns[words[i]]) expanded.push(syns[words[i]]);
        }
        return expanded;
    }

    function matchQuery(query) {
        var words = normalize(query);
        if (words.length === 0) return [];

        var scores = [];
        for (var i = 0; i < KB.length; i++) {
            var topic = KB[i];
            var kws = topic.kw[lang] || [];
            var expanded = expandSynonyms(words, topic);
            var score = 0;

            // Title match
            var titleWords = normalize(topic.title[lang] || '');
            var titleMatch = 0;
            for (var w = 0; w < expanded.length; w++) {
                for (var tw = 0; tw < titleWords.length; tw++) {
                    if (titleWords[tw] === expanded[w]) titleMatch++;
                }
            }
            if (titleMatch >= 2) score += 50;
            else if (titleMatch === 1) score += 15;

            // Keyword match
            for (w = 0; w < expanded.length; w++) {
                for (var k = 0; k < kws.length; k++) {
                    if (kws[k] === expanded[w]) {
                        score += 10;
                    } else if (kws[k].indexOf(expanded[w]) === 0 || expanded[w].indexOf(kws[k]) === 0) {
                        if (expanded[w].length >= 3 || kws[k].length >= 3) score += 5;
                    } else if (expanded[w].length >= 4 && kws[k].length >= 4 && levenshtein(expanded[w], kws[k]) <= 2) {
                        score += 3;
                    }
                }
            }

            if (score > 0) scores.push({ topic: topic, score: score });
        }

        scores.sort(function (a, b) { return b.score - a.score; });
        return scores.slice(0, 3).map(function (s) { return s.topic; });
    }

    function getTopicById(id) {
        for (var i = 0; i < KB.length; i++) {
            if (KB[i].id === id) return KB[i];
        }
        return null;
    }

    function getTopicsByCategory(cat) {
        return KB.filter(function (t) { return t.category === cat; });
    }

    // ─── DOM Builder ───

    var els = {};

    function createWidget() {
        var widget = document.createElement('div');
        widget.id = 'crmze-help-widget';

        // Button
        var btn = document.createElement('button');
        btn.id = 'crmze-help-btn';
        btn.textContent = '?';
        btn.title = ui[lang].title;
        widget.appendChild(btn);
        els.btn = btn;

        // Panel
        var panel = document.createElement('div');
        panel.id = 'crmze-help-panel';

        // Header
        var header = document.createElement('div');
        header.className = 'crmze-help-header';
        var title = document.createElement('span');
        title.className = 'crmze-help-title';
        title.textContent = ui[lang].title;
        els.title = title;

        var actions = document.createElement('div');
        actions.className = 'crmze-help-actions';

        var tourBtn = document.createElement('button');
        tourBtn.innerHTML = '&#9654;';
        tourBtn.title = ui[lang].tourBtn;
        tourBtn.addEventListener('click', function () {
            closePanel();
            setTimeout(function () {
                if (typeof window.crmzeTourRestart === 'function') window.crmzeTourRestart();
            }, 300);
        });

        var langBtn = document.createElement('button');
        langBtn.textContent = ui[lang].langLabel;
        langBtn.title = 'Switch language';
        els.langBtn = langBtn;
        langBtn.addEventListener('click', function () {
            lang = lang === 'sq' ? 'en' : 'sq';
            langBtn.textContent = ui[lang].langLabel;
            title.textContent = ui[lang].title;
            tourBtn.title = ui[lang].tourBtn;
            els.input.placeholder = ui[lang].placeholder;
            els.messages.innerHTML = '';
            welcomeShown = false;
            showWelcome();
        });

        var closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.title = 'Close';
        closeBtn.addEventListener('click', closePanel);

        actions.appendChild(tourBtn);
        actions.appendChild(langBtn);
        actions.appendChild(closeBtn);
        header.appendChild(title);
        header.appendChild(actions);
        panel.appendChild(header);

        // Messages
        var messages = document.createElement('div');
        messages.className = 'crmze-help-messages';
        panel.appendChild(messages);
        els.messages = messages;

        // Input
        var inputArea = document.createElement('div');
        inputArea.className = 'crmze-help-input-area';
        var input = document.createElement('input');
        input.className = 'crmze-help-input';
        input.type = 'text';
        input.placeholder = ui[lang].placeholder;
        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') handleSend();
        });
        els.input = input;

        var sendBtn = document.createElement('button');
        sendBtn.className = 'crmze-help-send';
        sendBtn.innerHTML = '&#10148;';
        sendBtn.addEventListener('click', handleSend);

        inputArea.appendChild(input);
        inputArea.appendChild(sendBtn);
        panel.appendChild(inputArea);

        widget.appendChild(panel);
        els.panel = panel;

        // Remove old tour button if exists
        var oldBtn = document.getElementById('crmze-tour-btn');
        if (oldBtn) oldBtn.style.display = 'none';

        document.body.appendChild(widget);

        btn.addEventListener('click', function () {
            if (panelOpen) { closePanel(); } else { openPanel(); }
        });
    }

    function openPanel() {
        panelOpen = true;
        els.panel.classList.add('crmze-panel-open');
        els.btn.classList.add('crmze-btn-active');
        els.btn.textContent = '+';
        if (!welcomeShown) showWelcome();
        setTimeout(function () { els.input.focus(); }, 250);
    }

    function closePanel() {
        panelOpen = false;
        els.panel.classList.remove('crmze-panel-open');
        els.btn.classList.remove('crmze-btn-active');
        els.btn.textContent = '?';
    }

    // ─── Chat Logic ───

    function addMessage(type, html, actions, chips) {
        var msg = document.createElement('div');
        msg.className = 'crmze-msg crmze-msg-' + type;

        var text = document.createElement('div');
        text.className = 'crmze-msg-text';
        if (type === 'user') {
            text.textContent = html;
        } else {
            text.innerHTML = html;
        }
        msg.appendChild(text);

        if (actions && actions.length > 0) {
            var actDiv = document.createElement('div');
            actDiv.className = 'crmze-msg-actions';
            for (var i = 0; i < actions.length; i++) {
                (function (act) {
                    var btn = document.createElement('button');
                    btn.className = 'crmze-action-btn';
                    btn.textContent = act.label[lang] || act.label.en;
                    btn.addEventListener('click', function () {
                        try {
                            navigateTab(webroot + act.url, act.target, function () {
                                activateTabByName(act.target, true);
                            });
                        } catch (e) {}
                    });
                    actDiv.appendChild(btn);
                })(actions[i]);
            }
            msg.appendChild(actDiv);
        }

        if (chips && chips.length > 0) {
            var chipDiv = document.createElement('div');
            chipDiv.className = 'crmze-msg-chips';
            for (var c = 0; c < chips.length; c++) {
                (function (chipText) {
                    var chip = document.createElement('button');
                    chip.className = 'crmze-chip';
                    chip.textContent = chipText;
                    chip.addEventListener('click', function () { handleUserMessage(chipText); });
                    chipDiv.appendChild(chip);
                })(chips[c]);
            }
            msg.appendChild(chipDiv);
        }

        els.messages.appendChild(msg);
        els.messages.scrollTop = els.messages.scrollHeight;
        return msg;
    }

    function addTyping() {
        var typing = document.createElement('div');
        typing.className = 'crmze-typing';
        for (var i = 0; i < 3; i++) {
            var dot = document.createElement('div');
            dot.className = 'crmze-typing-dot';
            typing.appendChild(dot);
        }
        els.messages.appendChild(typing);
        els.messages.scrollTop = els.messages.scrollHeight;
        return typing;
    }

    function showWelcome() {
        welcomeShown = true;
        addMessage('bot', ui[lang].welcome, [], ui[lang].chips);
    }

    function handleSend() {
        var text = els.input.value.trim();
        if (!text) return;
        els.input.value = '';
        handleUserMessage(text);
    }

    function handleUserMessage(text) {
        addMessage('user', text);

        var typing = addTyping();
        setTimeout(function () {
            if (typing.parentElement) typing.parentElement.removeChild(typing);

            var results = matchQuery(text);
            if (results.length > 0) {
                showTopicResult(results[0], results.length > 1 ? results.slice(1) : []);
            } else {
                showNoResults();
            }
        }, 400);
    }

    function showTopicResult(topic, otherMatches) {
        var relatedChips = [];
        // Add other matches first
        for (var i = 0; i < otherMatches.length; i++) {
            relatedChips.push(otherMatches[i].title[lang]);
        }
        // Then related topics
        if (topic.related) {
            for (i = 0; i < topic.related.length; i++) {
                var rel = getTopicById(topic.related[i]);
                if (rel) {
                    var t = rel.title[lang];
                    if (relatedChips.indexOf(t) === -1) relatedChips.push(t);
                }
            }
        }
        relatedChips = relatedChips.slice(0, 4);

        var html = '<strong>' + topic.title[lang] + '</strong><br>' + topic.answer[lang];
        addMessage('bot', html, topic.actions, relatedChips);
    }

    function showNoResults() {
        var catChips = [];
        var cats = ui[lang].categories;
        for (var key in cats) {
            if (cats.hasOwnProperty(key)) catChips.push(cats[key]);
        }
        addMessage('bot', ui[lang].noResults, [], catChips);
    }

    // Handle category chip clicks - show all topics in that category
    var origHandleUserMessage = handleUserMessage;
    handleUserMessage = function (text) {
        var cats = ui[lang].categories;
        var matchedCat = null;
        for (var key in cats) {
            if (cats.hasOwnProperty(key) && cats[key].toLowerCase() === text.toLowerCase()) {
                matchedCat = key;
                break;
            }
        }
        if (matchedCat) {
            addMessage('user', text);
            var typing = addTyping();
            setTimeout(function () {
                if (typing.parentElement) typing.parentElement.removeChild(typing);
                var topics = getTopicsByCategory(matchedCat);
                var chips = topics.map(function (t) { return t.title[lang]; });
                var catName = ui[lang].categories[matchedCat];
                var html = lang === 'sq'
                    ? '<strong>' + catName + '</strong> \u2013 zgjidhni nj\u00eb tem\u00eb:'
                    : '<strong>' + catName + '</strong> \u2013 select a topic:';
                addMessage('bot', html, [], chips);
            }, 300);
        } else {
            origHandleUserMessage(text);
        }
    };

    // ─── Keyboard ───

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && panelOpen) closePanel();
    });

    // ─── Init ───

    var ready = typeof jQuery !== 'undefined'
        ? function (fn) { jQuery(document).ready(fn); }
        : function (fn) { document.addEventListener('DOMContentLoaded', fn); };

    ready(function () {
        setTimeout(createWidget, 2000);
    });
})();
