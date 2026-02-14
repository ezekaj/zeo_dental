(function () {
    'use strict';

    var config = window.crmzeTourConfig;
    if (!config) return;

    var STORAGE_KEY = 'crmze_tour_completed_' + config.userId;

    var t = config.langCode === 'sq' ? {
        skip: 'Kalo',
        next: 'Tjetri',
        back: 'Mbrapa',
        done: 'Perfundo',
        restart: 'Rifillo Udh\u00ebzuesin',
        step: 'Hapi',
        of: 'nga',

        welcome_title: 'Mir\u00eb se vini n\u00eb crmZ.E',
        welcome_text: 'Ky udh\u00ebzues do t\'ju ndihmoj\u00eb t\u00eb m\u00ebsoni se si t\u00eb p\u00ebrdorni sistemin e menaxhimit t\u00eb klinik\u00ebs. Do t\u00eb kalojm\u00eb n\u00ebp\u00ebr t\u00eb gjitha funksionet kryesore.<br><br>Mund ta kaloni n\u00eb \u00e7do koh\u00eb duke klikuar "Kalo".',

        nav_title: 'Navigimi Kryesor',
        nav_text: 'Kjo \u00ebsht\u00eb shiriti i navigimit kryesor. K\u00ebtu mund t\u00eb aksesoni t\u00eb gjitha seksionet e sistemit: Pacient\u00ebt, Kalendari, Vizitat, Faturimi, Raportet dhe m\u00eb shum\u00eb.',

        search_title: 'K\u00ebrko Pacient\u00ebt',
        search_text: 'P\u00ebrdorni k\u00ebt\u00eb fush\u00eb p\u00ebr t\u00eb k\u00ebrkuar pacient\u00ebt sipas emrit, mbiemrit ose numrit t\u00eb kartel\u00ebs. Shkruani t\u00eb pakt\u00ebn 2 shkronja p\u00ebr t\u00eb filluar k\u00ebrkimin.',

        patient_menu_title: 'Menuja e Pacientit',
        patient_menu_text: 'Nga ky men\u00fc mund t\u00eb:<br>\u2022 Shikoni list\u00ebn e pacient\u00ebve<br>\u2022 Shtoni nj\u00eb pacient t\u00eb ri<br>\u2022 Aksesoni kartel\u00ebn e pacientit',

        new_patient_title: 'Pacient i Ri',
        new_patient_text: 'P\u00ebr t\u00eb shtuar nj\u00eb pacient t\u00eb ri, klikoni <strong>Pacienti > I Ri/e Re</strong> nga menuja. Do t\u00eb hapet nj\u00eb formular ku mund t\u00eb vendosni t\u00eb dh\u00ebnat demografike.',

        demographics_title: 'T\u00eb Dh\u00ebnat Demografike',
        demographics_text: 'K\u00ebtu regjistrohen t\u00eb dh\u00ebnat personale t\u00eb pacientit: emri, mbiemri, dat\u00eblindja, adresa, numri i telefonit, email-i dhe informacionet e sigurimit sh\u00ebndet\u00ebsor.',

        calendar_menu_title: 'Kalendari',
        calendar_menu_text: 'Kalendari ju lejon t\u00eb menaxhoni t\u00eb gjitha tak\u00edmet. Klikoni <strong>Kalendari</strong> n\u00eb meny p\u00ebr ta hapur.',

        calendar_desc_title: 'Pun\u00ebs me Kalendarin',
        calendar_desc_text: 'N\u00eb kalendar mund t\u00eb:<br>\u2022 Shikoni tak\u00edmet dit\u00ebve, jav\u00ebs ose muajit<br>\u2022 Klikoni n\u00eb nj\u00eb slot kohor p\u00ebr t\u00eb shtuar tak\u00edm t\u00eb ri<br>\u2022 Z\u00ebrvend\u00ebsoni ose anuloni tak\u00edmet ekzistuese',

        new_appt_title: 'Tak\u00edm i Ri',
        new_appt_text: 'P\u00ebr t\u00eb caktuar nj\u00eb tak\u00idm t\u00eb ri, klikoni n\u00eb nj\u00eb slot t\u00eb lir\u00eb n\u00eb kalendar. Zgjidhni pacientin, mjekun, sh\u00ebrbimin dhe koh\u00ebzgjatjen.',

        checkin_title: 'Regjistrimi i Pacientit',
        checkin_text: 'Kur pacienti vjen n\u00eb klinik\u00eb, mund ta regjistroni duke klikuar n\u00eb tak\u00idmin e tij n\u00eb kalendar dhe duke zgjedhur "Check In".',

        encounter_menu_title: 'Vizitat Klinike',
        encounter_menu_text: 'Seksioni i vizitave ju lejon t\u00eb krijoni dhe menaxhoni vizitat klinike t\u00eb pacient\u00ebve.',

        encounter_desc_title: 'Krijimi i Vizit\u00ebs',
        encounter_desc_text: 'P\u00ebr \u00e7do vizit\u00eb t\u00eb pacientit krijohet nj\u00eb "Encounter" (Vizit\u00eb). K\u00ebtu regjistrohen:<br>\u2022 Sh\u00ebnimet klinike<br>\u2022 Diagnoza<br>\u2022 Trajtimi i kryer<br>\u2022 Receta',

        clinical_forms_title: 'Formular\u00ebt Klinik\u00eb',
        clinical_forms_text: 'Brenda nj\u00eb vizite mund t\u00eb plot\u00ebsoni formular\u00eb t\u00eb ndryshme klinike: SOAP, sh\u00ebnime vitale, ekzaminim fizik dhe formular\u00eb t\u00eb personalizuar.',

        prescriptions_title: 'Recetat',
        prescriptions_text: 'Sistemi i recetave ju lejon t\u00eb:<br>\u2022 Shkruani receta p\u00ebr medikamente<br>\u2022 Shikoni historikun e recetave<br>\u2022 Menaxhoni bar\u00ebrat e pacientit',

        fees_menu_title: 'Faturimi',
        fees_menu_text: 'Seksioni i faturimit p\u00ebrfshin flet\u00ebn e tarifave, faturat dhe pagesat.',

        billing_desc_title: 'Fleta e Tarifave',
        billing_desc_text: 'Fleta e tarifave p\u00ebrdoret p\u00ebr t\u00eb regjistruar sh\u00ebrbimet e kryera gjat\u00eb vizit\u00ebs. \u00c7do sh\u00ebrbim ka nj\u00eb kod CPT dhe \u00e7mimin p\u00ebrkat\u00ebs.',

        documents_title: 'Dokument\u00ebt',
        documents_text: 'Mund t\u00eb ngarkoni dhe menaxhoni dokumente p\u00ebr \u00e7do pacient: r\u00ebntgen\u00eb, skanime, raporte laboratorike, formular\u00eb p\u00eblqimi dhe dokumente t\u00eb tjera.',

        reports_menu_title: 'Raportet',
        reports_menu_text: 'Seksioni i raporteve ju jep akses n\u00eb raporte t\u00eb ndryshme p\u00ebr klinik\u00ebn.',

        reports_desc_title: 'Llojet e Raporteve',
        reports_desc_text: 'Raportet e disponueshme p\u00ebrfshijn\u00eb:<br>\u2022 Raportet e pacient\u00ebve<br>\u2022 Raportet e vizitave<br>\u2022 Raportet financiare<br>\u2022 Statistikat e klinik\u00ebs',

        admin_menu_title: 'Administrimi',
        admin_menu_text: 'Nga menuja e administrimit mund t\u00eb konfiguroni sistemin.',

        admin_desc_title: 'Cilesimet e Sistemit',
        admin_desc_text: 'N\u00eb seksionin e administrimit mund t\u00eb:<br>\u2022 Menaxhoni p\u00ebrdoruesit dhe rolet<br>\u2022 Konfiguroni cil\u00ebsimet globale<br>\u2022 Menaxhoni list\u00ebn e sh\u00ebrbimeve<br>\u2022 Kontrolloni gjuh\u00ebn e nderfaqes',

        user_title: 'Profili i P\u00ebrdoruesit',
        user_text: 'K\u00ebtu mund t\u00eb shikoni informacionin tuaj, t\u00eb ndryshoni fjal\u00ebkalimin dhe t\u00eb dil\u00ebni nga sistemi.',

        patient_bar_title: 'Shiriti i Pacientit',
        patient_bar_text: 'Kur zgjidhni nj\u00eb pacient, informacioni i tij shfaqet k\u00ebtu. Mund t\u00eb klikoni p\u00ebr t\u00eb par\u00eb detajet e plota.',

        tabs_title: 'Skedat',
        tabs_text: 'Sistemi p\u00ebrdor skeda p\u00ebr t\u00eb hapur disa faqe nj\u00ebkoh\u00ebsisht. Mund t\u00eb kaloni midis tyre duke klikuar n\u00eb skedat n\u00eb krye.',

        finish_title: 'Udh\u00ebzuesi P\u00ebrfundoi!',
        finish_text: 'Tani jeni gati t\u00eb p\u00ebrdorni crmZ.E! N\u00ebse doni ta rifilloni udh\u00ebzuesin, klikoni butonin <strong>?</strong> n\u00eb fund t\u00eb faqes.'
    } : {
        skip: 'Skip',
        next: 'Next',
        back: 'Back',
        done: 'Done',
        restart: 'Restart Tour',
        step: 'Step',
        of: 'of',

        welcome_title: 'Welcome to crmZ.E',
        welcome_text: 'This guided tour will help you learn how to use the clinic management system. We\'ll walk through all the key features.<br><br>You can skip at any time by clicking "Skip".',

        nav_title: 'Main Navigation',
        nav_text: 'This is the main navigation bar. From here you can access all sections of the system: Patients, Calendar, Encounters, Billing, Reports and more.',

        search_title: 'Patient Search',
        search_text: 'Use this field to search for patients by name, surname, or chart number. Type at least 2 characters to begin searching.',

        patient_menu_title: 'Patient Menu',
        patient_menu_text: 'From this menu you can:<br>\u2022 View the patient list<br>\u2022 Add a new patient<br>\u2022 Access patient charts',

        new_patient_title: 'New Patient',
        new_patient_text: 'To add a new patient, click <strong>Patient > New/Search</strong> from the menu. A form will open where you can enter demographic information.',

        demographics_title: 'Demographics',
        demographics_text: 'This is where you register patient personal data: name, surname, date of birth, address, phone number, email, and insurance information.',

        calendar_menu_title: 'Calendar',
        calendar_menu_text: 'The calendar lets you manage all appointments. Click <strong>Calendar</strong> in the menu to open it.',

        calendar_desc_title: 'Working with the Calendar',
        calendar_desc_text: 'In the calendar you can:<br>\u2022 View appointments by day, week, or month<br>\u2022 Click on a time slot to add a new appointment<br>\u2022 Reschedule or cancel existing appointments',

        new_appt_title: 'New Appointment',
        new_appt_text: 'To schedule a new appointment, click on an empty time slot in the calendar. Select the patient, provider, service, and duration.',

        checkin_title: 'Patient Check-In',
        checkin_text: 'When a patient arrives at the clinic, you can check them in by clicking on their appointment in the calendar and selecting "Check In".',

        encounter_menu_title: 'Encounters',
        encounter_menu_text: 'The encounters section lets you create and manage clinical visits for patients.',

        encounter_desc_title: 'Creating an Encounter',
        encounter_desc_text: 'For each patient visit, an "Encounter" is created. This records:<br>\u2022 Clinical notes<br>\u2022 Diagnosis<br>\u2022 Treatment performed<br>\u2022 Prescriptions',

        clinical_forms_title: 'Clinical Forms',
        clinical_forms_text: 'Within an encounter you can fill out various clinical forms: SOAP notes, vitals, physical exam, and custom forms.',

        prescriptions_title: 'Prescriptions',
        prescriptions_text: 'The prescription system lets you:<br>\u2022 Write prescriptions for medications<br>\u2022 View prescription history<br>\u2022 Manage patient medications',

        fees_menu_title: 'Billing',
        fees_menu_text: 'The billing section includes the fee sheet, invoices, and payments.',

        billing_desc_title: 'Fee Sheet',
        billing_desc_text: 'The fee sheet is used to record services performed during a visit. Each service has a CPT code and corresponding price.',

        documents_title: 'Documents',
        documents_text: 'You can upload and manage documents for each patient: X-rays, scans, lab reports, consent forms, and other documents.',

        reports_menu_title: 'Reports',
        reports_menu_text: 'The reports section gives you access to various clinic reports.',

        reports_desc_title: 'Report Types',
        reports_desc_text: 'Available reports include:<br>\u2022 Patient reports<br>\u2022 Encounter reports<br>\u2022 Financial reports<br>\u2022 Clinic statistics',

        admin_menu_title: 'Administration',
        admin_menu_text: 'From the administration menu you can configure the system.',

        admin_desc_title: 'System Settings',
        admin_desc_text: 'In the administration section you can:<br>\u2022 Manage users and roles<br>\u2022 Configure global settings<br>\u2022 Manage service lists<br>\u2022 Control interface language',

        user_title: 'User Profile',
        user_text: 'Here you can view your information, change your password, and log out of the system.',

        patient_bar_title: 'Patient Bar',
        patient_bar_text: 'When you select a patient, their information appears here. You can click to see full details.',

        tabs_title: 'Tabs',
        tabs_text: 'The system uses tabs to open multiple pages at once. You can switch between them by clicking the tabs at the top.',

        finish_title: 'Tour Complete!',
        finish_text: 'You\'re now ready to use crmZ.E! If you want to see this tour again, click the <strong>?</strong> button at the bottom of the page.'
    };

    function findMenuByText(text) {
        var labels = document.querySelectorAll('#mainMenu .menuLabel, #mainMenu .collapsed');
        for (var i = 0; i < labels.length; i++) {
            if (labels[i].textContent.trim().toLowerCase().indexOf(text.toLowerCase()) !== -1) {
                return labels[i].closest('.menuSection') || labels[i];
            }
        }
        return null;
    }

    function makeButtons(stepNum, totalSteps, tour) {
        var progress = '<span class="crmze-tour-progress">' + t.step + ' ' + stepNum + ' ' + t.of + ' ' + totalSteps + '</span>';
        var buttons = [];

        if (stepNum === 1) {
            buttons.push({ text: t.skip, action: tour.cancel, classes: 'shepherd-button shepherd-button-secondary' });
            buttons.push({ text: t.next + ' ' + progress, action: tour.next, classes: 'shepherd-button shepherd-button-primary' });
        } else if (stepNum === totalSteps) {
            buttons.push({ text: t.back, action: tour.back, classes: 'shepherd-button shepherd-button-secondary' });
            buttons.push({ text: t.done + ' ' + progress, action: tour.complete, classes: 'shepherd-button shepherd-button-primary' });
        } else {
            buttons.push({ text: t.back, action: tour.back, classes: 'shepherd-button shepherd-button-secondary' });
            buttons.push({ text: t.next + ' ' + progress, action: tour.next, classes: 'shepherd-button shepherd-button-primary' });
        }
        return buttons;
    }

    function buildTour() {
        var totalSteps = 25;
        var tour = new Shepherd.Tour({
            useModalOverlay: true,
            defaultStepOptions: {
                cancelIcon: { enabled: true },
                scrollTo: { behavior: 'smooth', block: 'center' },
                classes: 'crmze-tour-step'
            }
        });

        // 1. Welcome
        tour.addStep({
            id: 'welcome',
            title: t.welcome_title,
            text: t.welcome_text,
            buttons: makeButtons(1, totalSteps, tour)
        });

        // 2. Main Navigation
        tour.addStep({
            id: 'main-nav',
            title: t.nav_title,
            text: t.nav_text,
            attachTo: { element: '#mainMenu', on: 'bottom' },
            buttons: makeButtons(2, totalSteps, tour)
        });

        // 3. Patient Search
        tour.addStep({
            id: 'patient-search',
            title: t.search_title,
            text: t.search_text,
            attachTo: { element: '#anySearchBox', on: 'bottom' },
            buttons: makeButtons(3, totalSteps, tour)
        });

        // 4. Patient Menu
        tour.addStep({
            id: 'patient-menu',
            title: t.patient_menu_title,
            text: t.patient_menu_text,
            attachTo: { element: findMenuByText('Patient') || findMenuByText('Pacienti'), on: 'bottom' },
            buttons: makeButtons(4, totalSteps, tour)
        });

        // 5. New Patient
        tour.addStep({
            id: 'new-patient',
            title: t.new_patient_title,
            text: t.new_patient_text,
            buttons: makeButtons(5, totalSteps, tour)
        });

        // 6. Demographics
        tour.addStep({
            id: 'demographics',
            title: t.demographics_title,
            text: t.demographics_text,
            buttons: makeButtons(6, totalSteps, tour)
        });

        // 7. Calendar Menu
        tour.addStep({
            id: 'calendar-menu',
            title: t.calendar_menu_title,
            text: t.calendar_menu_text,
            attachTo: { element: findMenuByText('Calendar') || findMenuByText('Kalendar'), on: 'bottom' },
            buttons: makeButtons(7, totalSteps, tour)
        });

        // 8. Calendar Description
        tour.addStep({
            id: 'calendar-desc',
            title: t.calendar_desc_title,
            text: t.calendar_desc_text,
            buttons: makeButtons(8, totalSteps, tour)
        });

        // 9. New Appointment
        tour.addStep({
            id: 'new-appointment',
            title: t.new_appt_title,
            text: t.new_appt_text,
            buttons: makeButtons(9, totalSteps, tour)
        });

        // 10. Check-in
        tour.addStep({
            id: 'checkin',
            title: t.checkin_title,
            text: t.checkin_text,
            buttons: makeButtons(10, totalSteps, tour)
        });

        // 11. Encounter Menu
        tour.addStep({
            id: 'encounter-menu',
            title: t.encounter_menu_title,
            text: t.encounter_menu_text,
            attachTo: { element: findMenuByText('Encounter') || findMenuByText('Vizit'), on: 'bottom' },
            buttons: makeButtons(11, totalSteps, tour)
        });

        // 12. Encounter Description
        tour.addStep({
            id: 'encounter-desc',
            title: t.encounter_desc_title,
            text: t.encounter_desc_text,
            buttons: makeButtons(12, totalSteps, tour)
        });

        // 13. Clinical Forms
        tour.addStep({
            id: 'clinical-forms',
            title: t.clinical_forms_title,
            text: t.clinical_forms_text,
            buttons: makeButtons(13, totalSteps, tour)
        });

        // 14. Prescriptions
        tour.addStep({
            id: 'prescriptions',
            title: t.prescriptions_title,
            text: t.prescriptions_text,
            buttons: makeButtons(14, totalSteps, tour)
        });

        // 15. Fees Menu
        tour.addStep({
            id: 'fees-menu',
            title: t.fees_menu_title,
            text: t.fees_menu_text,
            attachTo: { element: findMenuByText('Fees') || findMenuByText('Tarif'), on: 'bottom' },
            buttons: makeButtons(15, totalSteps, tour)
        });

        // 16. Billing Description
        tour.addStep({
            id: 'billing-desc',
            title: t.billing_desc_title,
            text: t.billing_desc_text,
            buttons: makeButtons(16, totalSteps, tour)
        });

        // 17. Documents
        tour.addStep({
            id: 'documents',
            title: t.documents_title,
            text: t.documents_text,
            buttons: makeButtons(17, totalSteps, tour)
        });

        // 18. Reports Menu
        tour.addStep({
            id: 'reports-menu',
            title: t.reports_menu_title,
            text: t.reports_menu_text,
            attachTo: { element: findMenuByText('Report') || findMenuByText('Raport'), on: 'bottom' },
            buttons: makeButtons(18, totalSteps, tour)
        });

        // 19. Reports Description
        tour.addStep({
            id: 'reports-desc',
            title: t.reports_desc_title,
            text: t.reports_desc_text,
            buttons: makeButtons(19, totalSteps, tour)
        });

        // 20. Admin Menu
        tour.addStep({
            id: 'admin-menu',
            title: t.admin_menu_title,
            text: t.admin_menu_text,
            attachTo: { element: findMenuByText('Admin'), on: 'bottom' },
            buttons: makeButtons(20, totalSteps, tour)
        });

        // 21. Admin Description
        tour.addStep({
            id: 'admin-desc',
            title: t.admin_desc_title,
            text: t.admin_desc_text,
            buttons: makeButtons(21, totalSteps, tour)
        });

        // 22. User Profile
        tour.addStep({
            id: 'user-profile',
            title: t.user_title,
            text: t.user_text,
            attachTo: { element: '#userData', on: 'bottom-end' },
            buttons: makeButtons(22, totalSteps, tour)
        });

        // 23. Patient Bar
        tour.addStep({
            id: 'patient-bar',
            title: t.patient_bar_title,
            text: t.patient_bar_text,
            attachTo: { element: '#attendantData', on: 'bottom' },
            buttons: makeButtons(23, totalSteps, tour)
        });

        // 24. Tabs
        tour.addStep({
            id: 'tabs',
            title: t.tabs_title,
            text: t.tabs_text,
            attachTo: { element: '#tabs_div', on: 'bottom' },
            buttons: makeButtons(24, totalSteps, tour)
        });

        // 25. Finish
        tour.addStep({
            id: 'finish',
            title: t.finish_title,
            text: t.finish_text,
            buttons: makeButtons(25, totalSteps, tour)
        });

        return tour;
    }

    function isTourCompleted() {
        try {
            return localStorage.getItem(STORAGE_KEY) === '1';
        } catch (e) {
            return false;
        }
    }

    function setTourCompleted() {
        try {
            localStorage.setItem(STORAGE_KEY, '1');
        } catch (e) {}
    }

    function resetTourStatus() {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (e) {}
    }

    window.crmzeTourRestart = function () {
        resetTourStatus();
        var tour = buildTour();
        tour.on('cancel', setTourCompleted);
        tour.on('complete', setTourCompleted);
        tour.start();
    };

    // Auto-start on first visit (wait for KnockoutJS to render menus)
    if (typeof jQuery !== 'undefined') {
        jQuery(document).ready(function () {
            setTimeout(function () {
                if (!isTourCompleted()) {
                    var tour = buildTour();
                    tour.on('cancel', setTourCompleted);
                    tour.on('complete', setTourCompleted);
                    tour.start();
                }
            }, 3000);
        });
    } else {
        document.addEventListener('DOMContentLoaded', function () {
            setTimeout(function () {
                if (!isTourCompleted()) {
                    var tour = buildTour();
                    tour.on('cancel', setTourCompleted);
                    tour.on('complete', setTourCompleted);
                    tour.start();
                }
            }, 3000);
        });
    }
})();
