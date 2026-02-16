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
                dental: 'Dentare',
                documents: 'Dokumentet',
                general: 'T\u00eb P\u00ebrgjithshme'
            },
            chips: ['Regjistro pacient', 'Ngarko dokument', 'Cakto takim', 'Procedura dentare', 'Faturimi', 'Rreth sistemit']
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
                dental: 'Dental',
                documents: 'Documents',
                general: 'General'
            },
            chips: ['Register patient', 'Upload document', 'Schedule appointment', 'Common procedures', 'Billing', 'About system']
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
                en: '<ol><li>Open the patient\'s encounter</li><li>Click <strong>"Fees" > "Fee Sheet"</strong></li><li>Search for the <strong>CDT code</strong> (e.g. D1110 for cleaning, D2391 for filling, D7140 for extraction)</li><li>The procedure and price in Lek loads automatically</li><li>Click <strong>"Save"</strong></li></ol><p>See <strong>"Dental procedure codes"</strong> for the full list of 227 CDT codes.</p>',
                sq: '<ol><li>Hapni vizit\u00ebn e pacientit</li><li>Klikoni <strong>"Tarifa" > "Fleta e Tarifave"</strong></li><li>K\u00ebrkoni <strong>kodin CDT</strong> (p.sh. D1110 p\u00ebr pastrim, D2391 p\u00ebr mbushje, D7140 p\u00ebr nx\u00ebrrje)</li><li>Procedura dhe \u00e7mimi n\u00eb Lek\u00eb ngarkohet automatikisht</li><li>Klikoni <strong>"Ruaj"</strong></li></ol><p>Shikoni <strong>"Kodet e procedurave dentare"</strong> p\u00ebr list\u00ebn e plot\u00eb me 227 kode CDT.</p>'
            },
            actions: [{ label: { en: 'Open Fee Sheet', sq: 'Hap Flet\u00ebn e Tarifave' }, target: 'enc', url: '/interface/patient_file/encounter/load_form.php?formname=fee_sheet' }],
            related: ['dental-codes', 'dental-billing', 'encounter-create']
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
        },
        // ─── Dental-Specific Topics ───
        {
            id: 'dental-upload-scan', category: 'dental',
            kw: { en: ['upload','scan','photo','image','xray','x-ray','radiograph','picture','panoramic','intraoral','camera','file','document','cbct'], sq: ['ngarko','skanim','foto','imazh','radiografi','fotografi','panoramike','intraorale','kamer\u00eb','dokument','sked\u00eb'] },
            syn: { en: {picture:'photo',pic:'photo',radiograph:'xray',panoramic:'xray',bitewing:'xray',periapical:'xray',cbct:'xray',image:'photo',file:'document',doc:'document'}, sq: {fotografi:'foto',pamje:'foto'} },
            title: { en: 'Upload dental scans & photos', sq: 'Ngarko skanime dhe foto dentare' },
            answer: {
                en: '<ol><li>Search and select the <strong>patient</strong></li><li>In the patient dashboard, click <strong>"Documents"</strong></li><li>Select a category: <strong>Dental Scans</strong>, <strong>X-Rays</strong>, <strong>Treatment Photos</strong>, <strong>Impressions</strong>, or <strong>Lab Reports</strong></li><li>Click <strong>"Upload"</strong> or drag files into the area</li><li>Select the file(s) from your computer</li><li>Add a description (optional)</li><li>Click <strong>"Upload"</strong> to save</li></ol><p>Supported formats: JPG, PNG, PDF, DICOM</p>',
                sq: '<ol><li>K\u00ebrkoni dhe zgjidhni <strong>pacientin</strong></li><li>N\u00eb dashboard-in e pacientit, klikoni <strong>"Dokumentet"</strong></li><li>Zgjidhni kategorin\u00eb: <strong>Skanime Dentare</strong>, <strong>Radiografi</strong>, <strong>Foto Trajtimi</strong>, <strong>Kalep</strong>, ose <strong>Raporte Laboratori</strong></li><li>Klikoni <strong>"Ngarko"</strong> ose terhiqni skedar\u00ebt</li><li>Zgjidhni skedarin/skedar\u00ebt nga kompjuteri</li><li>Shtoni p\u00ebrshkrim (opsionale)</li><li>Klikoni <strong>"Ngarko"</strong> p\u00ebr t\u00eb ruajtur</li></ol><p>Formatet: JPG, PNG, PDF, DICOM</p>'
            },
            actions: [{ label: { en: 'Find Patient', sq: 'Gjej Pacientin' }, target: 'fin', url: '/interface/main/finder/dynamic_finder.php' }],
            related: ['dental-xray', 'dental-treatment-photos', 'dental-impressions']
        },
        {
            id: 'dental-xray', category: 'dental',
            kw: { en: ['xray','x-ray','radiograph','panoramic','bitewing','periapical','cephalometric','cbct','ort','opg'], sq: ['radiografi','panoramike','ort','opg','rentgen'] },
            syn: { en: {ort:'xray',opg:'panoramic',rentgen:'xray'}, sq: {rentgen:'radiografi'} },
            title: { en: 'Upload dental X-rays', sq: 'Ngarko radiografi dentare' },
            answer: {
                en: '<ol><li>Select the patient</li><li>Go to <strong>"Documents"</strong></li><li>Choose the <strong>"X-Rays"</strong> category</li><li>Click <strong>"Upload"</strong></li><li>Select the X-ray file (periapical, bitewing, panoramic, CBCT)</li><li>Add a note: tooth number, type of X-ray, date taken</li><li>Click <strong>"Upload"</strong></li></ol><p><strong>Tip:</strong> Name files clearly, e.g. "panoramic_2024-01-15.jpg"</p>',
                sq: '<ol><li>Zgjidhni pacientin</li><li>Shkoni te <strong>"Dokumentet"</strong></li><li>Zgjidhni kategorin\u00eb <strong>"Radiografi"</strong></li><li>Klikoni <strong>"Ngarko"</strong></li><li>Zgjidhni skedarin (periapikale, bitewing, panoramike, CBCT)</li><li>Shtoni sh\u00ebnim: numri dh\u00ebmbit, lloji, data</li><li>Klikoni <strong>"Ngarko"</strong></li></ol><p><strong>K\u00ebshill\u00eb:</strong> Em\u00ebrtoni skedar\u00ebt qart\u00eb, p.sh. "panoramike_2024-01-15.jpg"</p>'
            },
            actions: [{ label: { en: 'Find Patient', sq: 'Gjej Pacientin' }, target: 'fin', url: '/interface/main/finder/dynamic_finder.php' }],
            related: ['dental-upload-scan', 'dental-treatment-photos']
        },
        {
            id: 'dental-treatment-photos', category: 'dental',
            kw: { en: ['treatment','photo','before','after','progress','comparison','result','smile'], sq: ['trajtim','foto','para','pas','progres','krahasim','rezultat','buzëqeshje'] },
            syn: { en: {smile:'photo',result:'after',outcome:'after'}, sq: {} },
            title: { en: 'Before/after treatment photos', sq: 'Foto para/pas trajtimit' },
            answer: {
                en: '<ol><li>Select the patient</li><li>Go to <strong>"Documents"</strong></li><li>Choose <strong>"Treatment Photos"</strong> category</li><li>Upload the <strong>before</strong> photo with note "Before - [procedure] - [date]"</li><li>After treatment, upload the <strong>after</strong> photo with "After - [procedure] - [date]"</li><li>Both photos are stored in the patient\'s record for comparison</li></ol><p><strong>Tip:</strong> Use consistent lighting and angles for better comparisons.</p>',
                sq: '<ol><li>Zgjidhni pacientin</li><li>Shkoni te <strong>"Dokumentet"</strong></li><li>Zgjidhni kategorin\u00eb <strong>"Foto Trajtimi"</strong></li><li>Ngarkoni foton <strong>para</strong> me sh\u00ebnim "Para - [procedura] - [data]"</li><li>Pas trajtimit, ngarkoni foton <strong>pas</strong> me "Pas - [procedura] - [data]"</li><li>T\u00eb dyja fotot ruhen n\u00eb kartel\u00ebn e pacientit</li></ol><p><strong>K\u00ebshill\u00eb:</strong> P\u00ebrdorni ndri\u00e7im dhe k\u00ebnd t\u00eb nj\u00ebjt\u00eb p\u00ebr krahasime m\u00eb t\u00eb mira.</p>'
            },
            actions: [{ label: { en: 'Find Patient', sq: 'Gjej Pacientin' }, target: 'fin', url: '/interface/main/finder/dynamic_finder.php' }],
            related: ['dental-upload-scan', 'dental-xray']
        },
        {
            id: 'dental-impressions', category: 'dental',
            kw: { en: ['impression','mold','cast','3d','scan','digital','itero','cerec','intraoral','scanner','stl'], sq: ['kalep','forma','3d','skanim','dixhital','skaner'] },
            syn: { en: {mold:'impression',cast:'impression',itero:'scanner',cerec:'scanner',stl:'scan'}, sq: {forma:'kalep'} },
            title: { en: 'Store digital impressions', sq: 'Ruaj kalep dixhitale' },
            answer: {
                en: '<ol><li>Select the patient</li><li>Go to <strong>"Documents"</strong></li><li>Choose <strong>"Impressions"</strong> category</li><li>Upload the scan file (STL, PLY, or screenshot)</li><li>Add notes: arch (upper/lower), purpose (crown, aligner, denture)</li><li>Click <strong>"Upload"</strong></li></ol>',
                sq: '<ol><li>Zgjidhni pacientin</li><li>Shkoni te <strong>"Dokumentet"</strong></li><li>Zgjidhni kategorin\u00eb <strong>"Kalep"</strong></li><li>Ngarkoni skedarin (STL, PLY, ose screenshot)</li><li>Shtoni sh\u00ebnime: harku (sip\u00ebr/posht\u00eb), q\u00ebllimi (kuror\u00eb, aligner, protez\u00eb)</li><li>Klikoni <strong>"Ngarko"</strong></li></ol>'
            },
            actions: [{ label: { en: 'Find Patient', sq: 'Gjej Pacientin' }, target: 'fin', url: '/interface/main/finder/dynamic_finder.php' }],
            related: ['dental-upload-scan', 'dental-lab-reports']
        },
        {
            id: 'dental-lab-reports', category: 'dental',
            kw: { en: ['lab','laboratory','report','technician','prosthetic','work','order','shade','material'], sq: ['laborator','raport','teknik','protetik\u00eb','pun\u00eb','porosi','ngjyr\u00eb','material'] },
            syn: { en: {technician:'lab',prosthetic:'lab'}, sq: {teknik:'laborator'} },
            title: { en: 'Upload lab reports', sq: 'Ngarko raporte laboratori' },
            answer: {
                en: '<ol><li>Select the patient</li><li>Go to <strong>"Documents"</strong></li><li>Choose <strong>"Lab Reports"</strong> category</li><li>Upload the lab prescription or report</li><li>Note: shade selection, material, lab name, due date</li><li>Click <strong>"Upload"</strong></li></ol>',
                sq: '<ol><li>Zgjidhni pacientin</li><li>Shkoni te <strong>"Dokumentet"</strong></li><li>Zgjidhni kategorin\u00eb <strong>"Raporte Laboratori"</strong></li><li>Ngarkoni recet\u00ebn ose raportin e laboratorit</li><li>Sh\u00ebnim: ngjyra, materiali, emri laboratorit, data</li><li>Klikoni <strong>"Ngarko"</strong></li></ol>'
            },
            actions: [{ label: { en: 'Find Patient', sq: 'Gjej Pacientin' }, target: 'fin', url: '/interface/main/finder/dynamic_finder.php' }],
            related: ['dental-impressions', 'dental-upload-scan']
        },
        {
            id: 'dental-codes', category: 'dental',
            kw: { en: ['cdt','code','codes','dental','procedure','d0','d1','d2','d3','d4','d5','d6','d7','d8','d9','fee','price','service'], sq: ['kodi','kodet','procedur\u00eb','dentare','tarif\u00eb','\u00e7mim','sh\u00ebrbim'] },
            syn: { en: {price:'fee',charge:'fee',cost:'fee'}, sq: {cmim:'tarif\u00eb'} },
            title: { en: 'Dental procedure codes (CDT)', sq: 'Kodet e procedurave dentare (CDT)' },
            answer: {
                en: '<p>The system has <strong>227 CDT dental codes</strong> loaded:</p><ul><li><strong>D0xxx</strong> \u2013 Diagnostic (exams, X-rays)</li><li><strong>D1xxx</strong> \u2013 Preventive (cleanings, fluoride, sealants)</li><li><strong>D2xxx</strong> \u2013 Restorative (fillings, crowns, veneers)</li><li><strong>D3xxx</strong> \u2013 Endodontics (root canals)</li><li><strong>D4xxx</strong> \u2013 Periodontics (scaling, gum surgery)</li><li><strong>D5xxx</strong> \u2013 Prosthodontics (dentures)</li><li><strong>D6xxx</strong> \u2013 Implants & bridges</li><li><strong>D7xxx</strong> \u2013 Oral surgery (extractions)</li><li><strong>D8xxx</strong> \u2013 Orthodontics (braces)</li><li><strong>D9xxx</strong> \u2013 Adjunctive (anesthesia, whitening)</li></ul><p>Use them in the <strong>Fee Sheet</strong> when billing a patient.</p>',
                sq: '<p>Sistemi ka <strong>227 kode CDT dentare</strong> t\u00eb ngarkuara:</p><ul><li><strong>D0xxx</strong> \u2013 Diagnostike (ekzaminime, radiografi)</li><li><strong>D1xxx</strong> \u2013 Parandaluese (pastrime, fluorur, mbyll\u00ebs)</li><li><strong>D2xxx</strong> \u2013 Restauruese (mbushje, kurora, faseta)</li><li><strong>D3xxx</strong> \u2013 Endodonti (kanale rrënjore)</li><li><strong>D4xxx</strong> \u2013 Periodonti (pastrim, kirurgji mishrave)</li><li><strong>D5xxx</strong> \u2013 Protetik\u00eb (proteza)</li><li><strong>D6xxx</strong> \u2013 Implante & ura</li><li><strong>D7xxx</strong> \u2013 Kirurgji orale (nx\u00ebrrje)</li><li><strong>D8xxx</strong> \u2013 Ortodonci (aparatura)</li><li><strong>D9xxx</strong> \u2013 Shërbime (anestezi, zbardhim)</li></ul><p>P\u00ebrdorni ato n\u00eb <strong>Flet\u00ebn e Tarifave</strong> kur faturoni pacientin.</p>'
            },
            actions: [{ label: { en: 'Open Fee Sheet', sq: 'Hap Flet\u00ebn e Tarifave' }, target: 'enc', url: '/interface/patient_file/encounter/load_form.php?formname=fee_sheet' }],
            related: ['dental-billing', 'billing-feesheet']
        },
        {
            id: 'dental-billing', category: 'dental',
            kw: { en: ['bill','billing','dental','charge','invoice','receipt','payment','lek','all','currency'], sq: ['faturim','fatur\u00eb','dentare','pagues\u00eb','d\u00ebshmi','lek'] },
            syn: { en: {invoice:'bill',receipt:'bill',charge:'bill'}, sq: {} },
            title: { en: 'Bill for dental procedures', sq: 'Faturo procedura dentare' },
            answer: {
                en: '<ol><li>Open the patient\'s <strong>encounter</strong></li><li>Click <strong>"Fees" > "Fee Sheet"</strong></li><li>Search for the CDT code (e.g. D2391 for composite filling)</li><li>The procedure name and <strong>fee in ALL (Lek)</strong> loads automatically</li><li>Adjust quantity if needed</li><li>Click <strong>"Save"</strong></li><li>Go to <strong>"Billing Manager"</strong> to finalize</li></ol>',
                sq: '<ol><li>Hapni <strong>vizit\u00ebn</strong> e pacientit</li><li>Klikoni <strong>"Tarifa" > "Fleta e Tarifave"</strong></li><li>K\u00ebrkoni kodin CDT (p.sh. D2391 p\u00ebr mbushje kompozite)</li><li>Emri i procedur\u00ebs dhe <strong>tarifa n\u00eb Lek\u00eb</strong> ngarkohet automatikisht</li><li>Rregulloni sasin\u00eb n\u00ebse nevojitet</li><li>Klikoni <strong>"Ruaj"</strong></li><li>Shkoni te <strong>"Menaxheri i Faturimit"</strong> p\u00ebr t\u00eb p\u00ebrfunduar</li></ol>'
            },
            actions: [
                { label: { en: 'Open Fee Sheet', sq: 'Hap Flet\u00ebn e Tarifave' }, target: 'enc', url: '/interface/patient_file/encounter/load_form.php?formname=fee_sheet' },
                { label: { en: 'Open Billing', sq: 'Hap Faturimin' }, target: 'bil0', url: '/interface/billing/billing_report.php' }
            ],
            related: ['dental-codes', 'billing-payment']
        },
        {
            id: 'dental-appointment', category: 'dental',
            kw: { en: ['dental','appointment','schedule','cleaning','extraction','root','canal','crown','implant','orthodontic','whitening','emergency','veneer','denture','filling','pediatric','perio'], sq: ['takim','dentar','cakto','pastrim','nx\u00ebrrje','kanal','kuror\u00eb','implant','ortodonci','zbardhim','urgjenc\u00eb','faset\u00eb','protez\u00eb','mbushje','f\u00ebmij\u00eb','perio'] },
            syn: { en: {book:'schedule',reserve:'schedule'}, sq: {rezervo:'cakto'} },
            title: { en: 'Schedule a dental appointment', sq: 'Cakto takim dentar' },
            answer: {
                en: '<ol><li>Click <strong>"Calendar"</strong></li><li>Click an empty time slot</li><li>Select the patient</li><li>Choose a <strong>dental category</strong>:</li></ol><ul><li><strong>Dental Cleaning</strong> (45 min)</li><li><strong>Dental Exam</strong> (30 min)</li><li><strong>Filling</strong> (45 min)</li><li><strong>Root Canal</strong> (90 min)</li><li><strong>Extraction</strong> (45 min)</li><li><strong>Crown</strong> (60 min)</li><li><strong>Implant</strong> (90 min)</li><li><strong>Orthodontic</strong> (30-45 min)</li><li><strong>Teeth Whitening</strong> (60 min)</li><li><strong>Emergency Dental</strong> (30 min)</li></ul><ol start="5"><li>Click <strong>"Save"</strong></li></ol>',
                sq: '<ol><li>Klikoni <strong>"Kalendari"</strong></li><li>Klikoni n\u00eb nj\u00eb slot t\u00eb lir\u00eb</li><li>Zgjidhni pacientin</li><li>Zgjidhni <strong>kategorin\u00eb dentare</strong>:</li></ol><ul><li><strong>Pastrim Dentar</strong> (45 min)</li><li><strong>Ekzaminim Dentar</strong> (30 min)</li><li><strong>Mbushje</strong> (45 min)</li><li><strong>Kanal Rr\u00ebnj\u00ebsh</strong> (90 min)</li><li><strong>Nx\u00ebrrje</strong> (45 min)</li><li><strong>Kuror\u00eb</strong> (60 min)</li><li><strong>Implant</strong> (90 min)</li><li><strong>Ortodonci</strong> (30-45 min)</li><li><strong>Zbardhim</strong> (60 min)</li><li><strong>Urgjenc\u00eb Dentare</strong> (30 min)</li></ul><ol start="5"><li>Klikoni <strong>"Ruaj"</strong></li></ol>'
            },
            actions: [{ label: { en: 'Open Calendar', sq: 'Hap Kalendarin' }, target: 'cal', url: '/interface/main/main_info.php' }],
            related: ['calendar-add', 'dental-codes']
        },
        {
            id: 'dental-encounter', category: 'dental',
            kw: { en: ['dental','visit','encounter','exam','examination','clinical','chart','record','notes','treatment','plan'], sq: ['vizit\u00eb','dentare','ekzaminim','klinike','kartel\u00eb','regjistrim','sh\u00ebnime','trajtim','plan'] },
            syn: { en: {chart:'record',notes:'encounter'}, sq: {} },
            title: { en: 'Create a dental encounter', sq: 'Krijo vizit\u00eb dentare' },
            answer: {
                en: '<ol><li>Select the patient</li><li>Click <strong>"New Encounter"</strong></li><li>Select reason: dental exam, cleaning, procedure, etc.</li><li>The encounter opens \u2013 now you can:</li></ol><ul><li>Add <strong>SOAP notes</strong> (findings, treatment plan)</li><li>Record <strong>procedures</strong> via Fee Sheet (CDT codes)</li><li>Upload <strong>X-rays and photos</strong> via Documents</li><li>Write <strong>prescriptions</strong> if needed</li><li>Add <strong>vitals</strong> (blood pressure before procedure)</li></ul>',
                sq: '<ol><li>Zgjidhni pacientin</li><li>Klikoni <strong>"Vizit\u00eb e Re"</strong></li><li>Zgjidhni arsyen: ekzaminim, pastrim, procedur\u00eb, etj.</li><li>Vizita hapet \u2013 tani mund t\u00eb:</li></ol><ul><li>Shtoni <strong>sh\u00ebnime SOAP</strong> (gjetjet, plani trajtimit)</li><li>Regjistroni <strong>procedurat</strong> n\u00ebp\u00ebrm\u00ebt Flet\u00ebs s\u00eb Tarifave (kodet CDT)</li><li>Ngarkoni <strong>radiografi dhe foto</strong> te Dokumentet</li><li>Shkruani <strong>receta</strong> n\u00ebse nevojitet</li><li>Shtoni <strong>vitale</strong> (presioni para procedur\u00ebs)</li></ul>'
            },
            actions: [{ label: { en: 'Find Patient', sq: 'Gjej Pacientin' }, target: 'fin', url: '/interface/main/finder/dynamic_finder.php' }],
            related: ['encounter-create', 'dental-codes', 'dental-upload-scan']
        },
        // ─── Patient Extended Topics ───
        {
            id: 'patient-summary', category: 'patient',
            kw: { en: ['summary','dashboard','overview','patient','chart','demographic','info','details','cartel'], sq: ['p\u00ebrmbledh\u00eb','dashboard','pasqyr\u00eb','pacient','kartel\u00eb','demografike','info','detaje'] },
            syn: { en: {chart:'summary',overview:'summary',demographic:'details',cartel:'summary'}, sq: {} },
            title: { en: 'Patient dashboard overview', sq: 'Pasqyra e pacientit' },
            answer: {
                en: '<p>When you select a patient, the <strong>Patient Dashboard</strong> shows:</p><ul><li><strong>Demographics</strong> \u2013 name, DOB, phone, address</li><li><strong>Appointments</strong> \u2013 upcoming and past</li><li><strong>Encounters</strong> \u2013 all clinical visits</li><li><strong>Documents</strong> \u2013 uploaded files (X-rays, photos, etc.)</li><li><strong>Insurance</strong> \u2013 coverage details</li><li><strong>Billing</strong> \u2013 balance and payment history</li><li><strong>Alerts</strong> \u2013 allergies, medical issues</li></ul>',
                sq: '<p>Kur zgjidhni nj\u00eb pacient, <strong>Dashboard-i i Pacientit</strong> tregon:</p><ul><li><strong>Demografike</strong> \u2013 emri, dat\u00eblindja, telefoni, adresa</li><li><strong>Takimet</strong> \u2013 t\u00eb ardhshme dhe t\u00eb kaluara</li><li><strong>Vizitat</strong> \u2013 t\u00eb gjitha vizitat klinike</li><li><strong>Dokumentet</strong> \u2013 skedar\u00eb t\u00eb ngarkuar (radiografi, foto, etj.)</li><li><strong>Sigurimi</strong> \u2013 detaje mbulimi</li><li><strong>Faturimi</strong> \u2013 bilanci dhe historiku pagesave</li><li><strong>Alarmet</strong> \u2013 alergji, \u00e7\u00ebshtje mj\u00ebk\u00ebsore</li></ul>'
            },
            actions: [{ label: { en: 'Find Patient', sq: 'Gjej Pacientin' }, target: 'fin', url: '/interface/main/finder/dynamic_finder.php' }],
            related: ['patient-search', 'patient-edit', 'patient-history']
        },
        {
            id: 'patient-insurance', category: 'patient',
            kw: { en: ['insurance','coverage','policy','insurer','company','plan','subscriber'], sq: ['sigurim','mbulim','polic\u00eb','kompani','plan','pajtimtar'] },
            syn: { en: {insurer:'insurance',policy:'insurance',plan:'insurance',coverage:'insurance'}, sq: {} },
            title: { en: 'Add/edit patient insurance', sq: 'Shto/ndrysho sigurimin e pacientit' },
            answer: {
                en: '<ol><li>Select the patient</li><li>Click <strong>"Demographics"</strong></li><li>Scroll to the <strong>Insurance</strong> section</li><li>Click <strong>"Primary Insurance"</strong></li><li>Enter: insurance company, policy number, group number</li><li>Add subscriber info if different from patient</li><li>Click <strong>"Save"</strong></li></ol><p>You can add Primary, Secondary, and Tertiary insurance.</p>',
                sq: '<ol><li>Zgjidhni pacientin</li><li>Klikoni <strong>"Demografike"</strong></li><li>Shkoni te seksioni <strong>Sigurimi</strong></li><li>Klikoni <strong>"Sigurimi Primar"</strong></li><li>Vendosni: kompania, numri polic\u00ebs, numri grupit</li><li>Shtoni info pajtimtarit n\u00ebse ndryshon nga pacienti</li><li>Klikoni <strong>"Ruaj"</strong></li></ol><p>Mund t\u00eb shtoni sigurim Primar, Sekondar, dhe Terciar.</p>'
            },
            actions: [{ label: { en: 'Find Patient', sq: 'Gjej Pacientin' }, target: 'fin', url: '/interface/main/finder/dynamic_finder.php' }],
            related: ['patient-edit', 'billing-manager']
        },
        {
            id: 'patient-allergies', category: 'patient',
            kw: { en: ['allergy','allergies','allergic','reaction','adverse','drug','food','latex','penicillin'], sq: ['alergji','alergjike','reagim','ila\u00e7','ushqim','lateks','penicilin\u00eb'] },
            syn: { en: {adverse:'allergy',reaction:'allergy'}, sq: {} },
            title: { en: 'Record patient allergies', sq: 'Regjistro alergji t\u00eb pacientit' },
            answer: {
                en: '<ol><li>Select the patient</li><li>In the patient dashboard, find <strong>"Allergies"</strong></li><li>Click <strong>"Add"</strong></li><li>Enter: allergen name, reaction type, severity</li><li>Common dental allergies: Latex, Penicillin, Lidocaine, Iodine, Metals</li><li>Click <strong>"Save"</strong></li></ol><p><strong>Important:</strong> Allergies show as alerts on the patient dashboard and during encounters.</p>',
                sq: '<ol><li>Zgjidhni pacientin</li><li>N\u00eb dashboard, gjeni <strong>"Alergji t\u00eb"</strong></li><li>Klikoni <strong>"Shto"</strong></li><li>Vendosni: emri alergjenit, lloji reagimit, ashp\u00ebrsia</li><li>Alergji t\u00eb zakonshme dentare: Lateks, Penicilin\u00eb, Lidokain\u00eb, Jod, Metale</li><li>Klikoni <strong>"Ruaj"</strong></li></ol><p><strong>E r\u00ebnd\u00ebsishme:</strong> Alergji t\u00eb shfaqen si alarme n\u00eb dashboard dhe gjat\u00eb vizitave.</p>'
            },
            actions: [{ label: { en: 'Find Patient', sq: 'Gjej Pacientin' }, target: 'fin', url: '/interface/main/finder/dynamic_finder.php' }],
            related: ['patient-summary', 'patient-problems']
        },
        {
            id: 'patient-problems', category: 'patient',
            kw: { en: ['problem','problems','medical','issue','condition','diagnosis','active','chronic','disease','diabetes','hypertension'], sq: ['problem','probleme','mj\u00ebk\u00ebsor','\u00e7\u00ebshtje','gjendje','diagnoz\u00eb','aktiv','kronik','s\u00ebmundje','diabet','hipertension'] },
            syn: { en: {condition:'problem',disease:'problem',chronic:'problem',issue:'problem'}, sq: {} },
            title: { en: 'Medical problems list', sq: 'Lista e problemeve mj\u00ebk\u00ebsore' },
            answer: {
                en: '<ol><li>Select the patient</li><li>Find <strong>"Medical Problems"</strong> or <strong>"Issues"</strong> in the dashboard</li><li>Click <strong>"Add"</strong></li><li>Search for the condition (e.g., Diabetes, Hypertension)</li><li>Set status: Active or Resolved</li><li>Add date of onset</li><li>Click <strong>"Save"</strong></li></ol><p>Medical problems are important for dental treatment planning (e.g., bleeding disorders, heart conditions, diabetes affect dental procedures).</p>',
                sq: '<ol><li>Zgjidhni pacientin</li><li>Gjeni <strong>"Problemet Mj\u00ebk\u00ebsore"</strong> n\u00eb dashboard</li><li>Klikoni <strong>"Shto"</strong></li><li>K\u00ebrkoni gjendjen (p.sh., Diabet, Hipertension)</li><li>Vendosni statusin: Aktiv ose i Zgjidhur</li><li>Shtoni dat\u00ebn e fillimit</li><li>Klikoni <strong>"Ruaj"</strong></li></ol><p>Problemet mj\u00ebk\u00ebsore jan\u00eb t\u00eb r\u00ebnd\u00ebsishme p\u00ebr planifikimin e trajtimit dentar (p.sh., \u00e7rregullime gjakut, gjendjet kardiake, diabeti ndikojn\u00eb procedurat dentare).</p>'
            },
            actions: [{ label: { en: 'Find Patient', sq: 'Gjej Pacientin' }, target: 'fin', url: '/interface/main/finder/dynamic_finder.php' }],
            related: ['patient-allergies', 'patient-medications']
        },
        {
            id: 'patient-medications', category: 'patient',
            kw: { en: ['medication','medications','current','drugs','medicines','list','active','taking'], sq: ['medikament','medikamente','aktual','ila\u00e7e','barna','list\u00eb','aktiv','merr'] },
            syn: { en: {drugs:'medications',medicines:'medications',meds:'medications'}, sq: {barna:'medikamente'} },
            title: { en: 'Current medications list', sq: 'Lista e medikamenteve aktuale' },
            answer: {
                en: '<ol><li>Select the patient</li><li>Find <strong>"Medications"</strong> in the dashboard</li><li>Click <strong>"Add"</strong></li><li>Enter: medication name, dosage, frequency, route</li><li>Set start date and prescriber</li><li>Click <strong>"Save"</strong></li></ol><p><strong>Tip:</strong> Always review medications before dental procedures to check for blood thinners (Warfarin, Aspirin) and bisphosphonates.</p>',
                sq: '<ol><li>Zgjidhni pacientin</li><li>Gjeni <strong>"Medikamentet"</strong> n\u00eb dashboard</li><li>Klikoni <strong>"Shto"</strong></li><li>Vendosni: emri medikamentit, dozimi, frekuenca, rruga</li><li>Vendosni dat\u00ebn e fillimit dhe p\u00ebrshkruesin</li><li>Klikoni <strong>"Ruaj"</strong></li></ol><p><strong>K\u00ebshill\u00eb:</strong> Gjithmon\u00eb rishikoni medikamentet para procedurave dentare p\u00ebr antikoagulant\u00eb (Warfarin, Aspirin\u00eb) dhe bifosfonat\u00eb.</p>'
            },
            actions: [{ label: { en: 'Find Patient', sq: 'Gjej Pacientin' }, target: 'fin', url: '/interface/main/finder/dynamic_finder.php' }],
            related: ['patient-problems', 'patient-allergies', 'encounter-prescriptions']
        },
        {
            id: 'patient-notes', category: 'patient',
            kw: { en: ['note','notes','patient','comment','remark','annotation','memo'], sq: ['sh\u00ebnim','sh\u00ebnime','pacient','koment','v\u00ebrejtje','memo'] },
            syn: { en: {comment:'note',remark:'note',memo:'note',annotation:'note'}, sq: {} },
            title: { en: 'Add patient notes', sq: 'Shto sh\u00ebnime pacientit' },
            answer: {
                en: '<ol><li>Select the patient</li><li>In the dashboard, find <strong>"Notes"</strong></li><li>Click <strong>"Add Note"</strong></li><li>Type your note (e.g., "Patient prefers morning appointments", "Anxious \u2013 needs extra care")</li><li>Click <strong>"Save"</strong></li></ol><p>Notes appear on the patient dashboard for all staff to see.</p>',
                sq: '<ol><li>Zgjidhni pacientin</li><li>N\u00eb dashboard, gjeni <strong>"Sh\u00ebnimet"</strong></li><li>Klikoni <strong>"Shto Sh\u00ebnim"</strong></li><li>Shkruani sh\u00ebnimin (p.sh., "Pacienti preferon takime n\u00eb m\u00ebngjes", "I shqet\u00ebsuar \u2013 k\u00ebrkon kujdes shtes\u00eb")</li><li>Klikoni <strong>"Ruaj"</strong></li></ol><p>Sh\u00ebnimet shfaqen n\u00eb dashboard p\u00ebr t\u00eb gjith\u00eb stafin.</p>'
            },
            actions: [{ label: { en: 'Find Patient', sq: 'Gjej Pacientin' }, target: 'fin', url: '/interface/main/finder/dynamic_finder.php' }],
            related: ['patient-summary', 'patient-edit']
        },
        // ─── Document Topics ───
        {
            id: 'docs-overview', category: 'documents',
            kw: { en: ['document','documents','file','files','manage','management','storage','upload','category','folder','cartel','kartela'], sq: ['dokument','dokumentet','skedar','skedar\u00eb','menaxho','menaxhim','ruajtje','ngarko','kategori','dosje','kartel\u00eb','kartela'] },
            syn: { en: {folder:'category',storage:'documents',files:'documents',cartel:'documents',kartela:'documents'}, sq: {dosje:'kategori'} },
            title: { en: 'Document management overview', sq: 'Pasqyra e menaxhimit t\u00eb dokumenteve' },
            answer: {
                en: '<p>ManagerCRM has <strong>5 dental document categories</strong>:</p><ol><li><strong>Dental Scans</strong> \u2013 digital impressions, CBCT, 3D scans</li><li><strong>X-Rays</strong> \u2013 periapical, bitewing, panoramic, cephalometric</li><li><strong>Treatment Photos</strong> \u2013 before/after photos, progress photos</li><li><strong>Impressions</strong> \u2013 digital molds, STL files</li><li><strong>Lab Reports</strong> \u2013 lab prescriptions, shade selections, material specs</li></ol><p>To upload: select patient \u2192 Documents \u2192 choose category \u2192 Upload.</p><p>All documents are stored in the patient\'s chart and can be viewed, downloaded, or printed.</p>',
                sq: '<p>ManagerCRM ka <strong>5 kategori dokumentesh dentare</strong>:</p><ol><li><strong>Skanime Dentare</strong> \u2013 kal\u00ebpe dixhitale, CBCT, skanime 3D</li><li><strong>Radiografi</strong> \u2013 periapikale, bitewing, panoramike, cefalometrike</li><li><strong>Foto Trajtimi</strong> \u2013 foto para/pas, foto progresi</li><li><strong>Kal\u00ebpe</strong> \u2013 forma dixhitale, skedar\u00eb STL</li><li><strong>Raporte Laboratori</strong> \u2013 receta laboratori, zgjedhje ngjyrash, specifika materialesh</li></ol><p>P\u00ebr t\u00eb ngarkuar: zgjidhni pacientin \u2192 Dokumentet \u2192 zgjidhni kategorin\u00eb \u2192 Ngarko.</p><p>T\u00eb gjitha dokumentet ruhen n\u00eb kartel\u00ebn e pacientit dhe mund t\u00eb shikohen, shkarkohen ose printohen.</p>'
            },
            actions: [{ label: { en: 'Find Patient', sq: 'Gjej Pacientin' }, target: 'fin', url: '/interface/main/finder/dynamic_finder.php' }],
            related: ['dental-upload-scan', 'dental-xray', 'dental-treatment-photos', 'dental-impressions']
        },
        {
            id: 'docs-view', category: 'documents',
            kw: { en: ['view','download','open','see','look','document','file','print','preview'], sq: ['shiko','shkarko','hap','shih','dokument','skedar','printo','pamje'] },
            syn: { en: {see:'view',look:'view',preview:'view',open:'view'}, sq: {shih:'shiko'} },
            title: { en: 'View & download documents', sq: 'Shiko & shkarko dokumentet' },
            answer: {
                en: '<ol><li>Select the patient</li><li>Click <strong>"Documents"</strong> in the sidebar</li><li>Browse by category or see all</li><li>Click a document to <strong>preview</strong> it</li><li>Use the <strong>Download</strong> button to save to your computer</li><li>Use the <strong>Print</strong> button for printing</li></ol><p>You can view JPG, PNG, PDF files directly in the browser. DICOM files may need a viewer.</p>',
                sq: '<ol><li>Zgjidhni pacientin</li><li>Klikoni <strong>"Dokumentet"</strong> n\u00eb an\u00ebn</li><li>Shfletoni sipas kategoris\u00eb ose shikoni t\u00eb gjitha</li><li>Klikoni nj\u00eb dokument p\u00ebr <strong>pamje paraprake</strong></li><li>P\u00ebrdorni butonin <strong>Shkarko</strong> p\u00ebr ta ruajtur n\u00eb kompjuter</li><li>P\u00ebrdorni butonin <strong>Printo</strong> p\u00ebr printim</li></ol><p>Mund t\u00eb shikoni skedar\u00eb JPG, PNG, PDF direkt n\u00eb shfletues. Skedar\u00ebt DICOM mund t\u00eb k\u00ebrkojn\u00eb program ve\u00e7ant\u00eb.</p>'
            },
            actions: [{ label: { en: 'Find Patient', sq: 'Gjej Pacientin' }, target: 'fin', url: '/interface/main/finder/dynamic_finder.php' }],
            related: ['docs-overview', 'dental-upload-scan']
        },
        // ─── Calendar Extended Topics ───
        {
            id: 'calendar-status', category: 'calendar',
            kw: { en: ['status','appointment','arrived','pending','complete','completed','noshow','no-show','cancel','cancelled','confirmed'], sq: ['status','takim','mb\u00ebrrit','pritje','p\u00ebrfunduar','munguar','anuluar','konfirmuar'] },
            syn: { en: {cancelled:'cancel',confirmed:'status'}, sq: {} },
            title: { en: 'Appointment statuses', sq: 'Statuset e takimeve' },
            answer: {
                en: '<p>Appointments have these <strong>statuses</strong>:</p><ul><li><strong>Scheduled</strong> \u2013 booked but patient hasn\'t arrived</li><li><strong>Checked In</strong> \u2013 patient has arrived at clinic</li><li><strong>In Exam Room</strong> \u2013 patient is being seen</li><li><strong>Completed</strong> \u2013 visit is done</li><li><strong>No Show</strong> \u2013 patient didn\'t come</li><li><strong>Cancelled</strong> \u2013 appointment was cancelled</li></ul><p>Change status by clicking the appointment in the calendar.</p>',
                sq: '<p>Takimet kan\u00eb k\u00ebto <strong>statuse</strong>:</p><ul><li><strong>I planifikuar</strong> \u2013 i rezervuar por pacienti nuk ka mb\u00ebrritur</li><li><strong>I regjistruar</strong> \u2013 pacienti ka mb\u00ebrritur</li><li><strong>N\u00eb dhom\u00ebn e ekzaminimit</strong> \u2013 pacienti po shikohet</li><li><strong>I p\u00ebrfunduar</strong> \u2013 vizita ka mbaruar</li><li><strong>Munges\u00eb</strong> \u2013 pacienti nuk erdhi</li><li><strong>I anuluar</strong> \u2013 takimi u anulua</li></ul><p>Ndryshoni statusin duke klikuar takimin n\u00eb kalendar.</p>'
            },
            actions: [{ label: { en: 'Open Calendar', sq: 'Hap Kalendarin' }, target: 'cal', url: '/interface/main/main_info.php' }],
            related: ['calendar-view', 'calendar-checkin', 'calendar-noshow']
        },
        {
            id: 'calendar-provider', category: 'calendar',
            kw: { en: ['provider','doctor','dentist','filter','schedule','who','available','column'], sq: ['mjek','dentist','filtro','orar','kush','disponuesh\u00ebm','kolona'] },
            syn: { en: {doctor:'provider',dentist:'provider',physician:'provider'}, sq: {dentist:'mjek'} },
            title: { en: 'Filter calendar by provider', sq: 'Filtro kalendarin sipas mjekut' },
            answer: {
                en: '<ol><li>Open the <strong>Calendar</strong></li><li>Use the <strong>provider filter</strong> at the top or sidebar</li><li>Select one or more providers to view</li><li>Each provider can have their own color/column</li><li>This helps see who is available for scheduling</li></ol>',
                sq: '<ol><li>Hapni <strong>Kalendarin</strong></li><li>P\u00ebrdorni <strong>filtrin e mjekut</strong> n\u00eb krye ose an\u00ebn</li><li>Zgjidhni nj\u00eb ose m\u00eb shum\u00eb mjek\u00eb</li><li>\u00c7do mjek ka ngjyr\u00ebn/kolon\u00ebn e vet</li><li>Kjo ndihmon t\u00eb shihni kush \u00ebsht\u00eb i disponuesh\u00ebm</li></ol>'
            },
            actions: [{ label: { en: 'Open Calendar', sq: 'Hap Kalendarin' }, target: 'cal', url: '/interface/main/main_info.php' }],
            related: ['calendar-view', 'calendar-add']
        },
        {
            id: 'calendar-noshow', category: 'calendar',
            kw: { en: ['noshow','no-show','miss','missed','didnt','come','absent','reschedule'], sq: ['munges\u00eb','mungoi','nuk','erdhi','munguar','ricakto'] },
            syn: { en: {missed:'noshow',absent:'noshow'}, sq: {} },
            title: { en: 'Handle no-shows', sq: 'Menaxho mungesat' },
            answer: {
                en: '<ol><li>Open the <strong>Calendar</strong></li><li>Click on the missed appointment</li><li>Change status to <strong>"No Show"</strong></li><li>Optionally add a note</li><li>To reschedule: create a new appointment for the patient</li></ol><p><strong>Tip:</strong> Run the Appointment Report under Reports to track frequent no-shows.</p>',
                sq: '<ol><li>Hapni <strong>Kalendarin</strong></li><li>Klikoni mbi takimin e humbur</li><li>Ndryshoni statusin n\u00eb <strong>"Munges\u00eb"</strong></li><li>Opsionalisht shtoni nj\u00eb sh\u00ebnim</li><li>P\u00ebr ricaktim: krijoni takim t\u00eb ri p\u00ebr pacientin</li></ol><p><strong>K\u00ebshill\u00eb:</strong> Ekzekutoni Raportin e Takimeve te Raportet p\u00ebr t\u00eb ndjekur mungesat e shpeshta.</p>'
            },
            actions: [{ label: { en: 'Open Calendar', sq: 'Hap Kalendarin' }, target: 'cal', url: '/interface/main/main_info.php' }],
            related: ['calendar-status', 'calendar-add']
        },
        {
            id: 'calendar-recurring', category: 'calendar',
            kw: { en: ['recurring','repeat','repeating','series','weekly','monthly','follow','followup','recall','periodic'], sq: ['p\u00ebrs\u00ebritje','p\u00ebrs\u00ebrit','seri','javor','mujor','ndjekje','kontrolli','periodik'] },
            syn: { en: {followup:'recurring',recall:'recurring',repeat:'recurring'}, sq: {} },
            title: { en: 'Recurring appointments & follow-ups', sq: 'Takime p\u00ebrs\u00ebritje & ndjekje' },
            answer: {
                en: '<ol><li>Schedule an appointment normally</li><li>In the appointment details, check <strong>"Recurring"</strong> if available</li><li>Set frequency: weekly, bi-weekly, monthly</li><li>Set number of occurrences or end date</li><li>Click <strong>"Save"</strong></li></ol><p><strong>For orthodontic patients:</strong> Set up monthly recurring visits for adjustments.</p><p><strong>Alternative:</strong> Use the <strong>Recall</strong> system to set follow-up reminders that generate appointment requests.</p>',
                sq: '<ol><li>Caktoni takimin normalisht</li><li>N\u00eb detajet e takimit, zgjidhni <strong>"P\u00ebrs\u00ebritje"</strong> n\u00ebse disponohet</li><li>Vendosni frekuenc\u00ebn: javor, dy-javor, mujor</li><li>Vendosni numrin e p\u00ebrs\u00ebritjeve ose dat\u00ebn e fundit</li><li>Klikoni <strong>"Ruaj"</strong></li></ol><p><strong>P\u00ebr pacient\u00ebt ortodontik\u00eb:</strong> Vendosni vizita mujore p\u00ebr rregullime.</p><p><strong>Alternativ\u00eb:</strong> P\u00ebrdorni sistemin e <strong>Rikujtimit</strong> p\u00ebr kujtesa q\u00eb gjenerojn\u00eb k\u00ebrkesa takimesh.</p>'
            },
            actions: [{ label: { en: 'Open Calendar', sq: 'Hap Kalendarin' }, target: 'cal', url: '/interface/main/main_info.php' }],
            related: ['calendar-add', 'general-recall']
        },
        // ─── Encounter Extended Topics ───
        {
            id: 'encounter-close', category: 'encounter',
            kw: { en: ['close','finalize','complete','end','finish','encounter','visit','sign','lock'], sq: ['mbyll','p\u00ebrfundo','fund','mbaroj','vizit\u00eb','n\u00ebnshkruaj','blloko'] },
            syn: { en: {finish:'close',complete:'close',end:'close',finalize:'close'}, sq: {} },
            title: { en: 'Close/finalize an encounter', sq: 'Mbyll/p\u00ebrfundo nj\u00eb vizit\u00eb' },
            answer: {
                en: '<ol><li>Open the patient\'s active encounter</li><li>Ensure all documentation is complete (SOAP notes, procedures, billing)</li><li>Click <strong>"Close"</strong> or the lock icon</li><li>The encounter becomes read-only</li><li>A closed encounter can still be viewed but not edited</li></ol><p><strong>Best practice:</strong> Close encounters at the end of each patient visit to keep records organized.</p>',
                sq: '<ol><li>Hapni vizit\u00ebn aktive t\u00eb pacientit</li><li>Sigurohuni q\u00eb dokumentimi \u00ebsht\u00eb i plot\u00eb (sh\u00ebnime SOAP, procedura, faturim)</li><li>Klikoni <strong>"Mbyll"</strong> ose ikon\u00ebn e dr\u00ebs</li><li>Vizita b\u00ebhet vet\u00ebm p\u00ebr lexim</li><li>Nj\u00eb vizit\u00eb e mbyllur mund t\u00eb shikohet por jo t\u00eb modifikohet</li></ol><p><strong>Praktik\u00eb e mir\u00eb:</strong> Mbyllni vizitat n\u00eb fund t\u00eb \u00e7do vizite pacienti p\u00ebr organizim.</p>'
            },
            actions: [],
            related: ['encounter-create', 'encounter-soap']
        },
        {
            id: 'encounter-list', category: 'encounter',
            kw: { en: ['list','encounters','visits','history','past','previous','all','record'], sq: ['list\u00eb','vizita','historik','kaluar','m\u00ebparshme','gjitha','regjistrim'] },
            syn: { en: {past:'previous',history:'list'}, sq: {} },
            title: { en: 'View encounter history', sq: 'Shiko historikun e vizitave' },
            answer: {
                en: '<ol><li>Select the patient</li><li>Click <strong>"Encounters"</strong> in the sidebar</li><li>See a list of all past encounters with dates</li><li>Click any encounter to view full details</li><li>Each encounter shows: reason, SOAP notes, procedures, billing</li></ol>',
                sq: '<ol><li>Zgjidhni pacientin</li><li>Klikoni <strong>"Vizitat"</strong> n\u00eb an\u00ebn</li><li>Shihni list\u00ebn e t\u00eb gjitha vizitave me data</li><li>Klikoni ndonj\u00eb vizit\u00eb p\u00ebr detaje t\u00eb plota</li><li>\u00c7do vizit\u00eb tregon: arsyen, sh\u00ebnimet SOAP, procedurat, faturimin</li></ol>'
            },
            actions: [{ label: { en: 'Find Patient', sq: 'Gjej Pacientin' }, target: 'fin', url: '/interface/main/finder/dynamic_finder.php' }],
            related: ['encounter-create', 'patient-history']
        },
        {
            id: 'encounter-forms', category: 'encounter',
            kw: { en: ['form','forms','questionnaire','intake','consent','clinical','template'], sq: ['form\u00eb','forma','pyet\u00ebsor','pranim','p\u00eblqim','klinike','model'] },
            syn: { en: {questionnaire:'form',intake:'form',consent:'form',template:'form'}, sq: {pyet\u00ebsor:'form\u00eb'} },
            title: { en: 'Clinical forms & questionnaires', sq: 'Format klinike & pyet\u00ebsor\u00ebt' },
            answer: {
                en: '<ol><li>Open the patient\'s encounter</li><li>Click <strong>"Clinical"</strong> or <strong>"Forms"</strong></li><li>Select the form type: SOAP, Vitals, Review of Systems, etc.</li><li>Fill in the form fields</li><li>Click <strong>"Save"</strong></li></ol><p>Available forms include: SOAP Notes, Vitals, Review of Systems, and custom forms configured by your admin.</p>',
                sq: '<ol><li>Hapni vizit\u00ebn e pacientit</li><li>Klikoni <strong>"Klinike"</strong> ose <strong>"Format"</strong></li><li>Zgjidhni llojin e form\u00ebs: SOAP, Vitale, Rishikim i Sistemeve, etj.</li><li>Plot\u00ebsoni fushat e form\u00ebs</li><li>Klikoni <strong>"Ruaj"</strong></li></ol><p>Format e disponueshme: Sh\u00ebnime SOAP, Vitale, Rishikim i Sistemeve, dhe forma t\u00eb personalizuara nga administratori.</p>'
            },
            actions: [],
            related: ['encounter-create', 'encounter-soap', 'encounter-vitals']
        },
        {
            id: 'encounter-referral', category: 'encounter',
            kw: { en: ['referral','refer','specialist','transfer','orthodontist','endodontist','surgeon','oral','send','letter'], sq: ['referim','refero','specialist','transfer','ortodontist','endodontist','kirurg','oral','d\u00ebrgo','let\u00ebr'] },
            syn: { en: {transfer:'referral',specialist:'referral'}, sq: {} },
            title: { en: 'Create a referral', sq: 'Krijo nj\u00eb referim' },
            answer: {
                en: '<ol><li>Open the patient\'s encounter</li><li>Click <strong>"Referrals"</strong> or find it under <strong>"Miscellaneous"</strong></li><li>Select the <strong>referring provider</strong> (you)</li><li>Select the <strong>referred-to provider</strong> (specialist)</li><li>Enter reason for referral and clinical notes</li><li>Click <strong>"Save"</strong></li></ol><p>Common dental referrals: Orthodontist, Oral Surgeon, Endodontist, Periodontist, Prosthodontist.</p>',
                sq: '<ol><li>Hapni vizit\u00ebn e pacientit</li><li>Klikoni <strong>"Referimet"</strong> ose gjeni n\u00ebn <strong>"T\u00eb ndryshme"</strong></li><li>Zgjidhni <strong>mjekun referues</strong> (ju)</li><li>Zgjidhni <strong>mjekun e referuar</strong> (specialistin)</li><li>Vendosni arsyen e referimit dhe sh\u00ebnimet klinike</li><li>Klikoni <strong>"Ruaj"</strong></li></ol><p>Referime t\u00eb zakonshme dentare: Ortodontist, Kirurg Oral, Endodontist, Periodontist, Prostodontist.</p>'
            },
            actions: [],
            related: ['encounter-create', 'general-address-book']
        },
        // ─── Billing Extended Topics ───
        {
            id: 'billing-collections', category: 'billing',
            kw: { en: ['collections','collection','outstanding','overdue','unpaid','balance','debt','owe','aged'], sq: ['mbledhje','borxh','papaguar','mbetur','bilanc','detyr\u00eb'] },
            syn: { en: {debt:'outstanding',owe:'outstanding',overdue:'outstanding',unpaid:'outstanding'}, sq: {} },
            title: { en: 'Collections & outstanding balances', sq: 'Mbledhjet & bilancet e mbetura' },
            answer: {
                en: '<ol><li>Go to <strong>"Reports"</strong></li><li>Select <strong>"Collections Report"</strong> or <strong>"Patient Ledger"</strong></li><li>Filter by date range, provider, or amount</li><li>See all patients with outstanding balances</li><li>Click a patient to view detailed ledger</li><li>Send payment reminders or statements</li></ol>',
                sq: '<ol><li>Shkoni te <strong>"Raportet"</strong></li><li>Zgjidhni <strong>"Raporti i Mbledhjeve"</strong> ose <strong>"Libri i Pacientit"</strong></li><li>Filtroni sipas dat\u00ebs, mjekut, ose shum\u00ebs</li><li>Shihni t\u00eb gjith\u00eb pacient\u00ebt me bilance t\u00eb mbetura</li><li>Klikoni pacientin p\u00ebr librin e detajuar</li><li>D\u00ebrgoni kujtesa pagese ose pasqyra</li></ol>'
            },
            actions: [{ label: { en: 'Open Billing', sq: 'Hap Faturimin' }, target: 'bil0', url: '/interface/billing/billing_report.php' }],
            related: ['billing-manager', 'billing-payment', 'billing-statement']
        },
        {
            id: 'billing-statement', category: 'billing',
            kw: { en: ['statement','print','invoice','receipt','generate','pdf','patient','account'], sq: ['pasqyr\u00eb','printo','fatur\u00eb','d\u00ebshmi','gjenero','pdf','llogari'] },
            syn: { en: {receipt:'statement',invoice:'statement'}, sq: {fatur\u00eb:'pasqyr\u00eb'} },
            title: { en: 'Generate patient statements', sq: 'Gjenero pasqyra pacient\u00ebsh' },
            answer: {
                en: '<ol><li>Go to <strong>"Fees" > "Billing Manager"</strong></li><li>Select the patient(s) or encounters</li><li>Click <strong>"Create Statement"</strong></li><li>The statement generates as a PDF</li><li>Print or email the statement to the patient</li></ol><p>Statements show: procedures performed, amounts charged, payments made, and balance due.</p>',
                sq: '<ol><li>Shkoni te <strong>"Tarifa" > "Menaxheri i Faturimit"</strong></li><li>Zgjidhni pacientin/et ose vizitat</li><li>Klikoni <strong>"Krijo Pasqyr\u00ebn"</strong></li><li>Pasqyra gjenerohet si PDF</li><li>Printoni ose d\u00ebrgoni me email pasqyr\u00ebn</li></ol><p>Pasqyrat tregojn\u00eb: procedurat e kryera, shumat e faturuara, pagesat e b\u00ebra, dhe bilancin.</p>'
            },
            actions: [{ label: { en: 'Open Billing', sq: 'Hap Faturimin' }, target: 'bil0', url: '/interface/billing/billing_report.php' }],
            related: ['billing-manager', 'billing-payment']
        },
        // ─── Reports Extended Topics ───
        {
            id: 'reports-appointments', category: 'reports',
            kw: { en: ['appointment','appointments','report','schedule','daily','weekly','monthly','list'], sq: ['takim','takime','raport','orar','ditor','javor','mujor','list\u00eb'] },
            syn: { en: {schedule:'appointments'}, sq: {} },
            title: { en: 'Appointment reports', sq: 'Raportet e takimeve' },
            answer: {
                en: '<ol><li>Go to <strong>"Reports"</strong></li><li>Select <strong>"Appointments Report"</strong></li><li>Filter by: date range, provider, appointment category, status</li><li>Click <strong>"Submit"</strong></li><li>See the full list of appointments</li><li>Export to CSV or print</li></ol><p>Use this to plan daily schedules, review completed visits, and track no-shows.</p>',
                sq: '<ol><li>Shkoni te <strong>"Raportet"</strong></li><li>Zgjidhni <strong>"Raporti i Takimeve"</strong></li><li>Filtroni sipas: periudh\u00ebs, mjekut, kategoris\u00eb, statusit</li><li>Klikoni <strong>"D\u00ebrgo"</strong></li><li>Shihni list\u00ebn e plot\u00eb t\u00eb takimeve</li><li>Eksportoni n\u00eb CSV ose printoni</li></ol><p>P\u00ebrdorni p\u00ebr planifikimin e orareve ditore, rishikimin e vizitave, dhe ndjekjen e mungesave.</p>'
            },
            actions: [],
            related: ['reports-overview', 'calendar-view']
        },
        {
            id: 'reports-encounters', category: 'reports',
            kw: { en: ['encounter','encounters','visit','visits','statistics','stats','clinical','count'], sq: ['vizit\u00eb','vizita','statistika','klinike','num\u00ebr'] },
            syn: { en: {visit:'encounter',stats:'statistics'}, sq: {} },
            title: { en: 'Encounter statistics', sq: 'Statistikat e vizitave' },
            answer: {
                en: '<ol><li>Go to <strong>"Reports"</strong></li><li>Select <strong>"Encounter Report"</strong> or <strong>"Visits"</strong></li><li>Filter by date range, provider, facility</li><li>See: total encounters, procedures performed, diagnoses</li><li>Export or print</li></ol>',
                sq: '<ol><li>Shkoni te <strong>"Raportet"</strong></li><li>Zgjidhni <strong>"Raporti i Vizitave"</strong></li><li>Filtroni sipas periudh\u00ebs, mjekut, klinik\u00ebs</li><li>Shihni: total vizitat, procedurat e kryera, diagnozat</li><li>Eksportoni ose printoni</li></ol>'
            },
            actions: [],
            related: ['reports-overview', 'reports-financial']
        },
        {
            id: 'reports-prescriptions', category: 'reports',
            kw: { en: ['prescription','prescriptions','rx','medication','drug','report','dispensed'], sq: ['recet\u00eb','receta','medikament','ila\u00e7','raport'] },
            syn: { en: {rx:'prescriptions',drug:'medication'}, sq: {} },
            title: { en: 'Prescription reports', sq: 'Raportet e recetave' },
            answer: {
                en: '<ol><li>Go to <strong>"Reports"</strong></li><li>Select <strong>"Prescriptions Report"</strong></li><li>Filter by: patient, provider, medication, date range</li><li>See all prescriptions issued</li><li>Export or print for records</li></ol>',
                sq: '<ol><li>Shkoni te <strong>"Raportet"</strong></li><li>Zgjidhni <strong>"Raporti i Recetave"</strong></li><li>Filtroni sipas: pacientit, mjekut, medikamentit, periudh\u00ebs</li><li>Shihni t\u00eb gjitha recetat e l\u00ebshuara</li><li>Eksportoni ose printoni</li></ol>'
            },
            actions: [],
            related: ['reports-overview', 'encounter-prescriptions']
        },
        // ─── Admin Extended Topics ───
        {
            id: 'admin-facility', category: 'admin',
            kw: { en: ['facility','clinic','office','practice','name','address','phone','location','info'], sq: ['klinik\u00eb','ordinanc\u00eb','zyr\u00eb','praktik\u00eb','em\u00ebr','adres\u00eb','telefon','vendndodhje','info'] },
            syn: { en: {clinic:'facility',office:'facility',practice:'facility'}, sq: {ordinanc\u00eb:'klinik\u00eb'} },
            title: { en: 'Facility/clinic settings', sq: 'Cil\u00ebsimet e klinik\u00ebs' },
            answer: {
                en: '<ol><li>Click <strong>"Admin"</strong></li><li>Click <strong>"Facilities"</strong></li><li>Click on your facility name (Zeo Dental Clinic)</li><li>Edit: name, address, phone, email, color</li><li>Click <strong>"Save"</strong></li></ol><p>The facility info appears on printed documents, statements, and reports.</p>',
                sq: '<ol><li>Klikoni <strong>"Admin"</strong></li><li>Klikoni <strong>"Klinikat"</strong></li><li>Klikoni mbi emrin e klinik\u00ebs (Zeo Dental Clinic)</li><li>Modifikoni: emri, adresa, telefoni, email, ngjyra</li><li>Klikoni <strong>"Ruaj"</strong></li></ol><p>Info e klinik\u00ebs shfaqet n\u00eb dokumentet e printuara, pasqyrat, dhe raportet.</p>'
            },
            actions: [{ label: { en: 'Open Facilities', sq: 'Hap Klinikat' }, target: 'adm', url: '/interface/usergroup/facilities.php' }],
            related: ['admin-config', 'admin-providers']
        },
        {
            id: 'admin-providers', category: 'admin',
            kw: { en: ['provider','providers','doctor','doctors','dentist','dentists','schedule','calendar','color','staff'], sq: ['mjek','mjek\u00eb','dentist','dentist\u00eb','orar','kalendar','ngjyr\u00eb','staf'] },
            syn: { en: {doctor:'provider',dentist:'provider'}, sq: {} },
            title: { en: 'Manage providers/doctors', sq: 'Menaxho mjek\u00ebt/dentist\u00ebt' },
            answer: {
                en: '<ol><li>Click <strong>"Admin" > "Users"</strong></li><li>Click on a provider or "Add User"</li><li>Set: name, credentials (DMD, DDS), specialty</li><li>Check <strong>"Authorized"</strong> and <strong>"Calendar"</strong> checkboxes</li><li>Assign a calendar <strong>color</strong> for easy identification</li><li>Set their <strong>schedule/availability</strong></li><li>Click <strong>"Save"</strong></li></ol><p>Providers with "Calendar" enabled will appear in the appointment calendar.</p>',
                sq: '<ol><li>Klikoni <strong>"Admin" > "P\u00ebrdoruesit"</strong></li><li>Klikoni mbi nj\u00eb mjek ose "Shto P\u00ebrdorues"</li><li>Vendosni: emri, kredencialet (DMD, DDS), specialiteti</li><li>Zgjidhni <strong>"I autorizuar"</strong> dhe <strong>"Kalendari"</strong></li><li>Caktoni nj\u00eb <strong>ngjyr\u00eb</strong> kalendari</li><li>Vendosni <strong>orarin/disponueshm\u00ebrin\u00eb</strong></li><li>Klikoni <strong>"Ruaj"</strong></li></ol><p>Mjek\u00ebt me "Kalendarin" t\u00eb aktivizuar shfaqen n\u00eb kalendarin e takimeve.</p>'
            },
            actions: [{ label: { en: 'Open Users', sq: 'Hap P\u00ebrdoruesit' }, target: 'adm', url: '/interface/usergroup/usergroup_admin.php' }],
            related: ['admin-users', 'admin-acl']
        },
        {
            id: 'admin-acl', category: 'admin',
            kw: { en: ['acl','access','control','permission','permissions','role','roles','security','restrict','group'], sq: ['akses','kontroll','leje','rol','role','siguri','kufizo','grup'] },
            syn: { en: {permission:'acl',security:'acl',role:'acl'}, sq: {} },
            title: { en: 'Access control & permissions', sq: 'Kontrolli i aksesit & lejet' },
            answer: {
                en: '<ol><li>Click <strong>"Admin" > "ACL"</strong></li><li>See predefined roles: Administrators, Physicians, Clinicians, Front Office, Billing</li><li>Click a role to see its permissions</li><li>Toggle access to: patients, encounters, billing, admin, documents</li><li>Create custom roles if needed</li></ol><p><strong>Recommended roles for dental clinic:</strong></p><ul><li><strong>Dentist</strong> \u2013 full clinical access</li><li><strong>Hygienist</strong> \u2013 encounters and scheduling</li><li><strong>Receptionist</strong> \u2013 scheduling and check-in only</li><li><strong>Billing</strong> \u2013 billing and financial reports</li></ul>',
                sq: '<ol><li>Klikoni <strong>"Admin" > "ACL"</strong></li><li>Shihni rolet: Administrator\u00eb, Mjek\u00eb, Klinicist\u00eb, Recepsion, Faturim</li><li>Klikoni nj\u00eb rol p\u00ebr lejet</li><li>Aktivizoni aksesin: pacient\u00eb, vizita, faturim, admin, dokumentet</li><li>Krijoni role t\u00eb personalizuara n\u00ebse nevojitet</li></ol><p><strong>Rolet e rekomanduara p\u00ebr klinik\u00eb dentare:</strong></p><ul><li><strong>Dentist</strong> \u2013 akses i plot\u00eb klinik</li><li><strong>Higjienist</strong> \u2013 vizita dhe caktim</li><li><strong>Recepsionist</strong> \u2013 caktim dhe regjistrim vet\u00ebm</li><li><strong>Faturim</strong> \u2013 faturim dhe raporte financiare</li></ul>'
            },
            actions: [{ label: { en: 'Open ACL', sq: 'Hap ACL' }, target: 'adm', url: '/interface/usergroup/adminacl.php' }],
            related: ['admin-users', 'admin-providers']
        },
        {
            id: 'admin-lists', category: 'admin',
            kw: { en: ['list','lists','custom','dropdown','option','options','code','lookup','setup'], sq: ['list\u00eb','lista','personalizuar','menu','opsion','opsione','kodi','k\u00ebrko','vendos'] },
            syn: { en: {dropdown:'list',lookup:'list',option:'list'}, sq: {} },
            title: { en: 'Manage custom lists', sq: 'Menaxho listat e personalizuara' },
            answer: {
                en: '<ol><li>Click <strong>"Admin" > "Lists"</strong></li><li>Select a list from the dropdown (e.g., Race, Ethnicity, Marital Status, Drug Routes)</li><li>Add, edit, or reorder items</li><li>To add a new item: enter title, ID, and order</li><li>Click <strong>"Save"</strong></li></ol><p>Lists control the options available in dropdown menus throughout the system.</p>',
                sq: '<ol><li>Klikoni <strong>"Admin" > "Listat"</strong></li><li>Zgjidhni nj\u00eb list\u00eb nga menuja (p.sh., Raca, Etnia, Statusi Martesor, Rrug\u00ebt e Ila\u00e7eve)</li><li>Shtoni, modifikoni, ose rirendisni elementet</li><li>P\u00ebr shtim: vendosni titullin, ID, dhe rendin</li><li>Klikoni <strong>"Ruaj"</strong></li></ol><p>Listat kontrollojn\u00eb opsionet e menuve n\u00eb t\u00eb gjith\u00eb sistemin.</p>'
            },
            actions: [{ label: { en: 'Open Lists', sq: 'Hap Listat' }, target: 'adm', url: '/interface/super/edit_list.php' }],
            related: ['admin-config']
        },
        {
            id: 'admin-backup', category: 'admin',
            kw: { en: ['backup','restore','export','database','data','save','protect','disaster','recovery'], sq: ['kopje','restauro','eksporto','baz\u00eb','t\u00eb dh\u00ebna','ruaj','mbro','fatkeq\u00ebsi','rikuperim'] },
            syn: { en: {restore:'backup',recovery:'backup',export:'backup'}, sq: {} },
            title: { en: 'Backup & data protection', sq: 'Kopje sigurie & mbrojtje e t\u00eb dh\u00ebnave' },
            answer: {
                en: '<p>ManagerCRM data should be backed up regularly:</p><ol><li><strong>Automatic daily backup</strong> is configured at 3:00 AM via Windows Task Scheduler</li><li>Backups are saved to <code>C:\\ManagerCRM\\backups\\</code></li><li>Each backup is a compressed SQL file with the date</li></ol><p><strong>Manual backup:</strong></p><ol><li>Open PowerShell or WSL terminal</li><li>Run: <code>docker exec crm-ze-db mysqldump -u root -proot openemr > backup.sql</code></li></ol><p><strong>Important:</strong> Also back up the documents folder for uploaded files (X-rays, photos).</p>',
                sq: '<p>T\u00eb dh\u00ebnat e ManagerCRM duhet t\u00eb kopjohen rregullisht:</p><ol><li><strong>Kopje automatike ditore</strong> \u00ebsht\u00eb konfiguruar n\u00eb or\u00ebn 3:00 nga Windows Task Scheduler</li><li>Kopjet ruhen n\u00eb <code>C:\\ManagerCRM\\backups\\</code></li><li>\u00c7do kopje \u00ebsht\u00eb skedar SQL i kompresuar me dat\u00ebn</li></ol><p><strong>Kopje manuale:</strong></p><ol><li>Hapni PowerShell ose terminalin WSL</li><li>Ekzekutoni: <code>docker exec crm-ze-db mysqldump -u root -proot openemr > backup.sql</code></li></ol><p><strong>E r\u00ebnd\u00ebsishme:</strong> Kopjoni gjithashtu dosjen e dokumenteve p\u00ebr skedar\u00ebt e ngarkuar.</p>'
            },
            actions: [],
            related: ['admin-config']
        },
        {
            id: 'admin-language', category: 'admin',
            kw: { en: ['language','albanian','english','translate','translation','switch','locale','shqip'], sq: ['gjuh\u00eb','shqip','anglisht','p\u00ebrkthe','p\u00ebrkthim','ndrysho'] },
            syn: { en: {locale:'language',translate:'language',shqip:'albanian'}, sq: {} },
            title: { en: 'Language settings', sq: 'Cil\u00ebsimet e gjuh\u00ebs' },
            answer: {
                en: '<ol><li>Go to <strong>"Admin" > "Config" > "Globals"</strong></li><li>Find <strong>"Language"</strong> section</li><li>Default language is set to <strong>Albanian</strong></li><li>Users can switch language from login or their profile</li><li>All dental content (procedures, categories, documents) is translated to Albanian</li></ol><p>The system supports both <strong>Albanian</strong> and <strong>English</strong>. The chatbot (this help) also supports both languages \u2013 use the SQ/EN toggle above.</p>',
                sq: '<ol><li>Shkoni te <strong>"Admin" > "Konfigurim" > "Globale"</strong></li><li>Gjeni seksionin <strong>"Gjuha"</strong></li><li>Gjuha e parazgjedhur \u00ebsht\u00eb <strong>Shqip</strong></li><li>P\u00ebrdoruesit mund t\u00eb ndryshojn\u00eb gjuh\u00ebn nga hyrja ose profili</li><li>I gjith\u00eb p\u00ebrmbajtja dentare (procedura, kategori, dokumentet) \u00ebsht\u00eb p\u00ebrkthyer n\u00eb Shqip</li></ol><p>Sistemi mb\u00ebshtet <strong>Shqip</strong> dhe <strong>Anglisht</strong>. Chatbot-i (kjo ndihm\u00eb) gjithashtu mb\u00ebshtet t\u00eb dyja gjuh\u00ebt \u2013 p\u00ebrdorni butonin SQ/EN sip\u00ebr.</p>'
            },
            actions: [{ label: { en: 'Open Settings', sq: 'Hap Cil\u00ebsimet' }, target: 'adm', url: '/interface/super/edit_globals.php' }],
            related: ['admin-config']
        },
        // ─── Dental Extended Topics ───
        {
            id: 'dental-treatment-plan', category: 'dental',
            kw: { en: ['treatment','plan','planning','phase','estimate','cost','proposal','comprehensive','course'], sq: ['trajtim','plan','planifikim','faz\u00eb','vler\u00ebsim','kosto','propozim','gjith\u00ebp\u00ebrfshir\u00ebs'] },
            syn: { en: {proposal:'plan',estimate:'plan',course:'plan'}, sq: {} },
            title: { en: 'Create a treatment plan', sq: 'Krijo plan trajtimi' },
            answer: {
                en: '<ol><li>Select the patient and create an encounter</li><li>After examination, document findings in <strong>SOAP notes</strong></li><li>In the Assessment/Plan section, outline the treatment plan</li><li>Add procedures to the <strong>Fee Sheet</strong> with CDT codes for estimated costs</li><li>Common treatment plan phases:</li></ol><ul><li><strong>Phase 1:</strong> Emergency care (pain relief, infections)</li><li><strong>Phase 2:</strong> Disease control (cleanings, fillings, root canals)</li><li><strong>Phase 3:</strong> Rehabilitation (crowns, bridges, implants)</li><li><strong>Phase 4:</strong> Maintenance (regular check-ups, cleanings)</li></ul><p>Print the treatment plan for the patient to review and sign.</p>',
                sq: '<ol><li>Zgjidhni pacientin dhe krijoni vizit\u00eb</li><li>Pas ekzaminimit, dokumentoni gjetjet n\u00eb <strong>sh\u00ebnimet SOAP</strong></li><li>N\u00eb seksionin Vler\u00ebsim/Plan, skiconi planin e trajtimit</li><li>Shtoni procedurat n\u00eb <strong>Flet\u00ebn e Tarifave</strong> me kodet CDT p\u00ebr kosto</li><li>Fazat e zakonshme t\u00eb planit:</li></ol><ul><li><strong>Faza 1:</strong> Kujdes urgjent (leht\u00ebsim dhimbjeje, infeksione)</li><li><strong>Faza 2:</strong> Kontroll s\u00ebmundjeje (pastrime, mbushje, kanale)</li><li><strong>Faza 3:</strong> Rehabilitim (kurora, ura, implante)</li><li><strong>Faza 4:</strong> Mir\u00ebmbajtje (kontrolle, pastrime)</li></ul><p>Printoni planin e trajtimit q\u00eb pacienti ta rishikoj\u00eb dhe n\u00ebnshkruaj\u00eb.</p>'
            },
            actions: [{ label: { en: 'Find Patient', sq: 'Gjej Pacientin' }, target: 'fin', url: '/interface/main/finder/dynamic_finder.php' }],
            related: ['encounter-soap', 'dental-codes', 'dental-billing']
        },
        {
            id: 'dental-common', category: 'dental',
            kw: { en: ['common','popular','frequent','procedure','procedures','what','available','offer','price','prices','pricelist'], sq: ['zakonshme','popullar','shpesh','procedur\u00eb','procedura','\u00e7far\u00eb','disponueshme','ofro','\u00e7mim','\u00e7mime','lista'] },
            syn: { en: {popular:'common',frequent:'common',pricelist:'prices'}, sq: {} },
            title: { en: 'Common dental procedures & prices', sq: 'Procedurat e zakonshme & \u00e7mimet' },
            answer: {
                en: '<p>Most common dental procedures in ManagerCRM:</p><ul><li><strong>D0120</strong> \u2013 Periodic Exam (3,000 Lek)</li><li><strong>D0220</strong> \u2013 Periapical X-ray (1,500 Lek)</li><li><strong>D0330</strong> \u2013 Panoramic X-ray (5,000 Lek)</li><li><strong>D1110</strong> \u2013 Adult Cleaning (4,000 Lek)</li><li><strong>D1120</strong> \u2013 Child Cleaning (3,000 Lek)</li><li><strong>D2391</strong> \u2013 Composite Filling (5,000 Lek)</li><li><strong>D2740</strong> \u2013 Porcelain Crown (35,000 Lek)</li><li><strong>D3310</strong> \u2013 Root Canal Anterior (15,000 Lek)</li><li><strong>D6010</strong> \u2013 Implant (80,000 Lek)</li><li><strong>D7140</strong> \u2013 Simple Extraction (3,000 Lek)</li><li><strong>D8080</strong> \u2013 Orthodontics (150,000 Lek)</li><li><strong>D9972</strong> \u2013 Whitening (15,000 Lek)</li></ul><p>All 227 CDT codes with prices in <strong>ALL (Albanian Lek)</strong>.</p>',
                sq: '<p>Procedurat m\u00eb t\u00eb zakonshme n\u00eb ManagerCRM:</p><ul><li><strong>D0120</strong> \u2013 Ekzaminim Periodik (3,000 Lek)</li><li><strong>D0220</strong> \u2013 Radiografi Periapikale (1,500 Lek)</li><li><strong>D0330</strong> \u2013 Radiografi Panoramike (5,000 Lek)</li><li><strong>D1110</strong> \u2013 Pastrim p\u00ebr t\u00eb Rritur (4,000 Lek)</li><li><strong>D1120</strong> \u2013 Pastrim p\u00ebr F\u00ebmij\u00eb (3,000 Lek)</li><li><strong>D2391</strong> \u2013 Mbushje Kompozite (5,000 Lek)</li><li><strong>D2740</strong> \u2013 Kuror\u00eb Porcelani (35,000 Lek)</li><li><strong>D3310</strong> \u2013 Kanal Anterior (15,000 Lek)</li><li><strong>D6010</strong> \u2013 Implant (80,000 Lek)</li><li><strong>D7140</strong> \u2013 Nx\u00ebrrje e Thjesht\u00eb (3,000 Lek)</li><li><strong>D8080</strong> \u2013 Ortodonci (150,000 Lek)</li><li><strong>D9972</strong> \u2013 Zbardhim (15,000 Lek)</li></ul><p>T\u00eb gjitha 227 kodet CDT me \u00e7mime n\u00eb <strong>ALL (Lek Shqiptar)</strong>.</p>'
            },
            actions: [{ label: { en: 'Open Fee Sheet', sq: 'Hap Flet\u00ebn e Tarifave' }, target: 'enc', url: '/interface/patient_file/encounter/load_form.php?formname=fee_sheet' }],
            related: ['dental-codes', 'dental-billing']
        },
        {
            id: 'dental-emergency', category: 'dental',
            kw: { en: ['emergency','urgent','pain','swelling','trauma','broken','cracked','abscess','bleeding','accident','knocked'], sq: ['urgjenc\u00eb','urgjent','dhimbje','\u00ebnjtje','traum\u00eb','thyer','\u00e7ar\u00eb','absces','gjakosje','aksident'] },
            syn: { en: {abscess:'emergency',trauma:'emergency',broken:'cracked'}, sq: {} },
            title: { en: 'Handle dental emergencies', sq: 'Menaxho urgjenca dentare' },
            answer: {
                en: '<ol><li>Go to <strong>Calendar</strong> and find the first available slot</li><li>Create appointment with category <strong>"Emergency Dental"</strong> (30 min)</li><li>Check in the patient immediately</li><li>Create an encounter</li><li>Document in SOAP notes: chief complaint, history, examination findings</li><li>Common emergencies and CDT codes:</li></ol><ul><li><strong>D9110</strong> \u2013 Palliative treatment (pain relief)</li><li><strong>D7140</strong> \u2013 Simple extraction</li><li><strong>D7210</strong> \u2013 Surgical extraction</li><li><strong>D3220</strong> \u2013 Pulpotomy (temporary)</li><li><strong>D2940</strong> \u2013 Temporary filling</li></ul>',
                sq: '<ol><li>Shkoni te <strong>Kalendari</strong> dhe gjeni slotin e par\u00eb t\u00eb lir\u00eb</li><li>Krijoni takim me kategorin\u00eb <strong>"Urgjenc\u00eb Dentare"</strong> (30 min)</li><li>Regjistroni pacientin menj\u00ebher\u00eb</li><li>Krijoni vizit\u00eb</li><li>Dokumentoni n\u00eb SOAP: ankesa kryesore, historiku, gjetjet</li><li>Urgjenca t\u00eb zakonshme dhe kodet CDT:</li></ol><ul><li><strong>D9110</strong> \u2013 Trajtim paliativ (leht\u00ebsim dhimbjeje)</li><li><strong>D7140</strong> \u2013 Nx\u00ebrrje e thjesht\u00eb</li><li><strong>D7210</strong> \u2013 Nx\u00ebrrje kirurgjikale</li><li><strong>D3220</strong> \u2013 Pulpotomi (e p\u00ebrkohshme)</li><li><strong>D2940</strong> \u2013 Mbushje e p\u00ebrkohshme</li></ul>'
            },
            actions: [{ label: { en: 'Open Calendar', sq: 'Hap Kalendarin' }, target: 'cal', url: '/interface/main/main_info.php' }],
            related: ['dental-appointment', 'dental-codes']
        },
        // ─── General Extended Topics ───
        {
            id: 'general-printing', category: 'general',
            kw: { en: ['print','printing','printer','pdf','paper','hard','copy','output'], sq: ['printo','printim','printer','pdf','let\u00ebr','kopje'] },
            syn: { en: {hardcopy:'print',output:'print'}, sq: {} },
            title: { en: 'Printing documents', sq: 'Printimi i dokumenteve' },
            answer: {
                en: '<p>You can print from many places in ManagerCRM:</p><ul><li><strong>Patient Summary</strong> \u2013 click Print to get patient overview</li><li><strong>Encounter</strong> \u2013 print clinical notes and forms</li><li><strong>Billing Statement</strong> \u2013 print patient statements/invoices</li><li><strong>Reports</strong> \u2013 all reports have a Print button</li><li><strong>Prescriptions</strong> \u2013 print prescriptions for patients</li><li><strong>Documents</strong> \u2013 open and print uploaded files</li></ul><p><strong>Tip:</strong> Use Ctrl+P as a shortcut from any page.</p>',
                sq: '<p>Mund t\u00eb printoni nga shum\u00eb vende n\u00eb ManagerCRM:</p><ul><li><strong>P\u00ebrmbledhja e Pacientit</strong> \u2013 printoni p\u00ebr pasqyr\u00eb</li><li><strong>Vizita</strong> \u2013 printoni sh\u00ebnimet klinike</li><li><strong>Pasqyra e Faturimit</strong> \u2013 printoni pasqyra/fatura</li><li><strong>Raportet</strong> \u2013 t\u00eb gjitha raportet kan\u00eb buton Printo</li><li><strong>Recetat</strong> \u2013 printoni recetat p\u00ebr pacient\u00eb</li><li><strong>Dokumentet</strong> \u2013 hapni dhe printoni skedar\u00eb</li></ul><p><strong>K\u00ebshill\u00eb:</strong> P\u00ebrdorni Ctrl+P si shkurtore nga \u00e7do faqe.</p>'
            },
            actions: [],
            related: ['billing-statement', 'reports-overview']
        },
        {
            id: 'general-address-book', category: 'general',
            kw: { en: ['address','book','contacts','directory','referral','specialist','lab','laboratory','pharmacy'], sq: ['adres\u00eb','lib\u00ebr','kontakte','drejtori','referim','specialist','laborator','farmaci'] },
            syn: { en: {contacts:'address',directory:'address'}, sq: {} },
            title: { en: 'Address book & contacts', sq: 'Libri i adresave & kontaktet' },
            answer: {
                en: '<ol><li>Go to <strong>"Miscellaneous" > "Address Book"</strong></li><li>See all saved contacts: labs, specialists, pharmacies</li><li>Click <strong>"Add New"</strong> to add a contact</li><li>Enter: name, type (lab, specialist, pharmacy), phone, address</li><li>Click <strong>"Save"</strong></li></ol><p>Useful contacts for dental clinic: dental labs, orthodontist referrals, oral surgeons, pharmacies.</p>',
                sq: '<ol><li>Shkoni te <strong>"T\u00eb ndryshme" > "Libri i Adresave"</strong></li><li>Shihni t\u00eb gjitha kontaktet: laborator\u00eb, specialist\u00eb, farmaci</li><li>Klikoni <strong>"Shto t\u00eb Ri"</strong></li><li>Vendosni: emri, lloji (laborator, specialist, farmaci), telefon, adres\u00eb</li><li>Klikoni <strong>"Ruaj"</strong></li></ol><p>Kontakte t\u00eb dobishme: laborator\u00eb dentar, referime ortodontike, kirurg\u00eb oral\u00eb, farmaci.</p>'
            },
            actions: [],
            related: ['encounter-referral']
        },
        {
            id: 'general-recall', category: 'general',
            kw: { en: ['recall','reminder','follow','followup','follow-up','cleaning','checkup','6month','routine','periodic','maintenance'], sq: ['rikujtim','kujtes\u00eb','ndjekje','kontrolli','pastrim','6mujor','rutin\u00eb','periodik','mir\u00ebmbajtje'] },
            syn: { en: {followup:'recall',checkup:'recall',reminder:'recall',maintenance:'recall'}, sq: {} },
            title: { en: 'Recalls & patient reminders', sq: 'Rikujtime & kujtesa pacient\u00ebsh' },
            answer: {
                en: '<ol><li>Select the patient</li><li>Go to <strong>"Recalls"</strong> or <strong>"Reminders"</strong></li><li>Click <strong>"Add Recall"</strong></li><li>Set: type (cleaning, checkup), interval (6 months), next date</li><li>Add provider name</li><li>Click <strong>"Save"</strong></li></ol><p><strong>Standard dental recalls:</strong></p><ul><li>Cleaning/checkup: every 6 months</li><li>Periodontal maintenance: every 3\u20134 months</li><li>Orthodontic follow-up: every 4\u20136 weeks</li></ul><p>Run the <strong>Recall Report</strong> (under Reports) to see patients due for recall.</p>',
                sq: '<ol><li>Zgjidhni pacientin</li><li>Shkoni te <strong>"Rikujtimet"</strong></li><li>Klikoni <strong>"Shto Rikujtim"</strong></li><li>Vendosni: lloji (pastrim, kontroll), intervali (6 muaj), data e radh\u00ebs</li><li>Shtoni emrin e mjekut</li><li>Klikoni <strong>"Ruaj"</strong></li></ol><p><strong>Rikujtime standarde dentare:</strong></p><ul><li>Pastrim/kontroll: \u00e7do 6 muaj</li><li>Mir\u00ebmbajtje periodontale: \u00e7do 3\u20134 muaj</li><li>Ndjekje ortodontike: \u00e7do 4\u20136 jav\u00eb</li></ul><p>Ekzekutoni <strong>Raportin e Rikujtimeve</strong> (te Raportet) p\u00ebr pacient\u00ebt q\u00eb u duhet rikujtim.</p>'
            },
            actions: [{ label: { en: 'Find Patient', sq: 'Gjej Pacientin' }, target: 'fin', url: '/interface/main/finder/dynamic_finder.php' }],
            related: ['calendar-recurring', 'calendar-add']
        },
        {
            id: 'general-letter', category: 'general',
            kw: { en: ['letter','letters','generate','correspondence','patient','template','word'], sq: ['let\u00ebr','letra','gjenero','korrespondenc\u00eb','pacient','model'] },
            syn: { en: {correspondence:'letter'}, sq: {} },
            title: { en: 'Generate patient letters', sq: 'Gjenero letra pacient\u00ebsh' },
            answer: {
                en: '<ol><li>Select the patient</li><li>Go to <strong>"Miscellaneous" > "Letter Generator"</strong></li><li>Select a <strong>letter template</strong></li><li>The template auto-fills patient details (name, DOB, address)</li><li>Edit the body text as needed</li><li>Click <strong>"Generate"</strong></li><li>Print or save as PDF</li></ol><p>Common dental letters: referral letters, treatment summaries, appointment reminders, consent forms.</p>',
                sq: '<ol><li>Zgjidhni pacientin</li><li>Shkoni te <strong>"T\u00eb ndryshme" > "Gjenerues Letrash"</strong></li><li>Zgjidhni nj\u00eb <strong>model letre</strong></li><li>Modeli plot\u00ebson automatikisht detajet e pacientit</li><li>Modifikoni tekstin sipas nevoj\u00ebs</li><li>Klikoni <strong>"Gjenero"</strong></li><li>Printoni ose ruani si PDF</li></ol><p>Letra t\u00eb zakonshme: letra referimi, p\u00ebrmbledhje trajtimi, kujtesa takimesh, formular\u00eb p\u00eblqimi.</p>'
            },
            actions: [],
            related: ['encounter-referral', 'general-printing']
        },
        {
            id: 'general-about', category: 'general',
            kw: { en: ['about','version','what','system','managercrm','crm','manager','zeo','dental','software','program','application'], sq: ['rreth','version','\u00e7far\u00eb','sistem','managercrm','crm','menaxher','zeo','dental','program','aplikacion'] },
            syn: { en: {software:'system',application:'system',program:'system'}, sq: {program:'sistem'} },
            title: { en: 'About ManagerCRM', sq: 'Rreth ManagerCRM' },
            answer: {
                en: '<p><strong>ManagerCRM</strong> is the clinic management system for <strong>Zeo Dental Clinic</strong>.</p><p>Features include:</p><ul><li>Patient registration and records management</li><li>Appointment scheduling with 16 dental categories</li><li>Clinical encounters with SOAP documentation</li><li>227 CDT dental procedure codes with prices in Albanian Lek</li><li>Document management (X-rays, photos, scans, lab reports)</li><li>Billing and payment tracking</li><li>Reports and analytics</li><li>Internal messaging between staff</li><li>Bilingual interface (Albanian and English)</li><li>Guided tour for new users</li><li>Built-in help assistant (you\'re using it now!)</li></ul><p>Developed by <strong>Z.E Digital Tech</strong></p>',
                sq: '<p><strong>ManagerCRM</strong> \u00ebsht\u00eb sistemi i menaxhimit t\u00eb klinik\u00ebs p\u00ebr <strong>Zeo Dental Clinic</strong>.</p><p>Ve\u00e7orit\u00eb p\u00ebrfshijn\u00eb:</p><ul><li>Regjistrimi i pacient\u00ebve dhe menaxhimi i kartelave</li><li>Caktimi i takimeve me 16 kategori dentare</li><li>Vizita klinike me dokumentim SOAP</li><li>227 kode CDT me \u00e7mime n\u00eb Lek Shqiptar</li><li>Menaxhimi i dokumenteve (radiografi, foto, skanime, raporte)</li><li>Faturimi dhe ndjekja e pagesave</li><li>Raporte dhe analitik\u00eb</li><li>Mesazhe t\u00eb brendshme mes stafit</li><li>Nd\u00ebrfaqe dygjuh\u00ebshe (Shqip dhe Anglisht)</li><li>Udh\u00ebzues p\u00ebr p\u00ebrdorues t\u00eb rinj</li><li>Asistent ndihme (po e p\u00ebrdorni tani!)</li></ul><p>Zhvilluar nga <strong>Z.E Digital Tech</strong></p>'
            },
            actions: [],
            related: ['general-navigation', 'admin-config']
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
