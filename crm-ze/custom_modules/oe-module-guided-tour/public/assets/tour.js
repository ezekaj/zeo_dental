(function () {
    'use strict';

    var config = window.crmzeTourConfig;
    if (!config) return;

    var STORAGE_KEY = 'crmze_tour_completed_' + config.userId;
    var sq = config.langCode === 'sq';

    var t = sq ? {
        skip: 'Kalo',
        skip_step: 'Kalo hapin',
        next: 'Tjetri',
        back: 'Mbrapa',
        done: 'Perfundo',
        start: 'Fillo',
        click_hint: 'Klikoni elementin e theksuar p\u00ebr t\u00eb vazhduar',
        or_skip: 'ose klikoni "Kalo hapin"',
        step: 'Hapi',
        of: 'nga',

        welcome_title: 'Mir\u00eb se vini n\u00eb Klinika Dentare ZEO!',
        welcome_text: 'Ky udh\u00ebzues interaktiv do t\'ju mund\u00ebsoj\u00eb t\u00eb m\u00ebsoni sistemin hap pas hapi.<br><br><strong>Si funksionon:</strong> Ndiqni udh\u00ebzimet n\u00eb secilin hap. Kur ju k\u00ebrkohet t\u00eb klikoni diku, klikoni elementin e theksuar p\u00ebr t\u00eb vazhduar.',

        nav_title: 'Shiriti i Navigimit',
        nav_text: 'Ky \u00ebsht\u00eb shiriti kryesor i navigimit t\u00eb Klinik\u00ebs Dentare ZEO. K\u00ebtu do t\u00eb gjeni t\u00eb gjitha seksionet: Pacient\u00ebt, Kalendari, Vizitat, Faturimi, Raportet dhe Administrimi.<br><br>Le t\'i eksplorojm\u00eb s\u00eb bashku!',

        search_title: '\ud83d\udd0d Provoni K\u00ebrkimin',
        search_text: '<strong>Klikoni n\u00eb fush\u00ebn e k\u00ebrkimit</strong> p\u00ebr t\u00eb k\u00ebrkuar pacient\u00ebt sipas emrit, mbiemrit ose numrit t\u00eb kartel\u00ebs.<br><br>Shkruani t\u00eb pakt\u00ebn 2 shkronja p\u00ebr t\u00eb filluar k\u00ebrkimin.',

        patient_click_title: '\ud83d\udc64 Hapni Menun\u00eb e Pacientit',
        patient_click_text: '<strong>Klikoni "Pacienti/Klienti"</strong> n\u00eb meny p\u00ebr t\u00eb par\u00eb opsionet e disponueshme.',

        patient_info_title: 'Menaxhimi i Pacient\u00ebve',
        patient_info_text: 'Nga kjo meny mund t\u00eb:<br><br>\u2022 <strong>I Ri/K\u00ebrko</strong> \u2013 Regjistroni pacient t\u00eb ri ose k\u00ebrkoni ekzistues\u00ebt<br>\u2022 <strong>P\u00ebrmbledhje</strong> \u2013 Shikoni kartel\u00ebn e pacientit t\u00eb zgjedhur<br>\u2022 <strong>Dokumentet</strong> \u2013 Ngarkoni r\u00ebntgen\u00eb, skanime, raporte<br><br>Provoni t\u00eb klikoni <strong>I Ri/K\u00ebrko</strong> p\u00ebr t\u00eb par\u00eb formularin e regjistrimit!',

        calendar_click_title: '\ud83d\udcc5 Hapni Kalendarin',
        calendar_click_text: '<strong>Klikoni "Kalendari"</strong> n\u00eb meny p\u00ebr t\u00eb par\u00eb orarin e tak\u00edmeve.',

        calendar_info_title: 'Menaxhimi i Tak\u00edmeve',
        calendar_info_text: 'N\u00eb kalendar mund t\u00eb:<br><br>\u2022 <strong>Klikoni n\u00eb nj\u00eb slot bosh</strong> p\u00ebr t\u00eb caktuar tak\u00edm t\u00eb ri<br>\u2022 <strong>Klikoni n\u00eb nj\u00eb tak\u00edm</strong> p\u00ebr ta modifikuar ose anuluar<br>\u2022 Ndryshoni pamjen: dit\u00eb, jav\u00eb, muaj<br>\u2022 Regjistroni pacientin kur vjen n\u00eb klinik\u00eb (Check In)',

        encounter_click_title: '\ud83e\ude7a Vizitat Klinike',
        encounter_click_text: '<strong>Klikoni seksionin e vizitave klinike</strong> n\u00eb meny.',

        encounter_info_title: 'Dokumentimi i Vizitave',
        encounter_info_text: 'P\u00ebr \u00e7do vizit\u00eb t\u00eb pacientit n\u00eb Klinik\u00ebn Dentare ZEO, krijoni nj\u00eb "Encounter":<br><br>\u2022 <strong>Sh\u00ebnime SOAP</strong> \u2013 Dokumentoni ankes\u00ebn, ekzaminimin, diagnoz\u00ebn<br>\u2022 <strong>Procedurat dentare</strong> \u2013 Regjistroni trajtimin e kryer<br>\u2022 <strong>Recetat</strong> \u2013 Shkruani receta p\u00ebr medikamente<br>\u2022 <strong>Vitalet</strong> \u2013 Presioni, tempertura etj.',

        fees_click_title: '\ud83d\udcb0 Faturimi',
        fees_click_text: '<strong>Klikoni "Tarifa"</strong> n\u00eb meny p\u00ebr seksionin e faturimit.',

        fees_info_title: 'Menaxhimi i Faturave',
        fees_info_text: 'Seksioni i faturimit ju lejon t\u00eb:<br><br>\u2022 <strong>Fleta e Tarifave</strong> \u2013 Shtoni kodet e procedurave (CPT) p\u00ebr sh\u00ebrbimet dentare<br>\u2022 <strong>Faturat</strong> \u2013 Krijoni dhe d\u00ebrgoni fatura<br>\u2022 <strong>Pagesat</strong> \u2013 Regjistroni pagesat e pacient\u00ebve',

        reports_click_title: '\ud83d\udcca Raportet',
        reports_click_text: '<strong>Klikoni "Raportet"</strong> p\u00ebr t\u00eb par\u00eb analitik\u00ebn e klinik\u00ebs.',

        reports_info_title: 'Analitika e Klinik\u00ebs',
        reports_info_text: 'Raportet e disponueshme p\u00ebrfshijn\u00eb:<br><br>\u2022 <strong>Raportet e pacient\u00ebve</strong> \u2013 Lista, demografit\u00eb, historiku<br>\u2022 <strong>Raportet financiare</strong> \u2013 T\u00eb ardhurat, pagesat, bilancet<br>\u2022 <strong>Raportet e vizitave</strong> \u2013 Statistikat e tak\u00edmeve<br>\u2022 <strong>Raportet e personalizuara</strong>',

        user_title: '\ud83d\udc64 Profili Juaj',
        user_text: '<strong>Klikoni emrin tuaj</strong> p\u00ebr t\u00eb aksesuar:<br><br>\u2022 Ndryshoni fjal\u00ebkalimin<br>\u2022 Cil\u00ebsimet personale<br>\u2022 Dil nga sistemi',

        patient_bar_title: 'Shiriti i Pacientit t\u00eb Zgjedhur',
        patient_bar_text: 'Kur zgjidhni nj\u00eb pacient, informacioni i tij shfaqet k\u00ebtu: emri, mosha, numri i kartel\u00ebs. Klikoni p\u00ebr detaje t\u00eb plota.',

        tabs_title: 'Skedat e Pun\u00ebs',
        tabs_text: 'Sistemi hap faqe n\u00eb skeda t\u00eb ndryshme \u2013 nj\u00eblloj si n\u00eb shfletues. Mund t\u00eb punoni me disa pacient\u00eb ose seksione nj\u00ebkoh\u00ebsisht duke klikuar skedat k\u00ebtu.',

        finish_title: '\u2705 Jeni Gati!',
        finish_text: 'Tani i njihni t\u00eb gjitha funksionet kryesore t\u00eb sistemit t\u00eb Klinik\u00ebs Dentare ZEO!<br><br>N\u00ebse keni nevoj\u00eb ndihm\u00eb, klikoni butonin <strong>?</strong> n\u00eb k\u00ebndin e posht\u00ebm djathtas p\u00ebr ta rifilluar k\u00ebt\u00eb udh\u00ebzues n\u00eb \u00e7do koh\u00eb.'
    } : {
        skip: 'Skip Tour',
        skip_step: 'Skip step',
        next: 'Next',
        back: 'Back',
        done: 'Finish',
        start: 'Let\'s Start',
        click_hint: 'Click the highlighted element to continue',
        or_skip: 'or click "Skip step"',
        step: 'Step',
        of: 'of',

        welcome_title: 'Welcome to ZEO Dental Clinic!',
        welcome_text: 'This interactive guide will walk you through the system step by step.<br><br><strong>How it works:</strong> Follow the instructions at each step. When asked to click something, click the highlighted element to continue.',

        nav_title: 'Navigation Bar',
        nav_text: 'This is ZEO Dental Clinic\'s main navigation bar. Here you\'ll find all sections: Patients, Calendar, Encounters, Billing, Reports, and Administration.<br><br>Let\'s explore them together!',

        search_title: '\ud83d\udd0d Try the Search',
        search_text: '<strong>Click on the search box</strong> to search for patients by name, surname, or chart number.<br><br>Type at least 2 characters to start searching.',

        patient_click_title: '\ud83d\udc64 Open the Patient Menu',
        patient_click_text: '<strong>Click "Patient/Client"</strong> in the menu to see the available options.',

        patient_info_title: 'Patient Management',
        patient_info_text: 'From this menu you can:<br><br>\u2022 <strong>New/Search</strong> \u2013 Register a new patient or search existing ones<br>\u2022 <strong>Summary</strong> \u2013 View the selected patient\'s chart<br>\u2022 <strong>Documents</strong> \u2013 Upload X-rays, scans, reports<br><br>Try clicking <strong>New/Search</strong> to see the registration form!',

        calendar_click_title: '\ud83d\udcc5 Open the Calendar',
        calendar_click_text: '<strong>Click "Calendar"</strong> in the menu to see the appointment schedule.',

        calendar_info_title: 'Appointment Management',
        calendar_info_text: 'In the calendar you can:<br><br>\u2022 <strong>Click an empty slot</strong> to schedule a new appointment<br>\u2022 <strong>Click an appointment</strong> to modify or cancel it<br>\u2022 Switch views: day, week, month<br>\u2022 Check in patients when they arrive',

        encounter_click_title: '\ud83e\ude7a Clinical Encounters',
        encounter_click_text: '<strong>Click the encounters section</strong> in the menu.',

        encounter_info_title: 'Documenting Visits',
        encounter_info_text: 'For each patient visit at ZEO Dental Clinic, create an "Encounter":<br><br>\u2022 <strong>SOAP Notes</strong> \u2013 Document complaint, exam, diagnosis<br>\u2022 <strong>Dental Procedures</strong> \u2013 Record treatments performed<br>\u2022 <strong>Prescriptions</strong> \u2013 Write medication prescriptions<br>\u2022 <strong>Vitals</strong> \u2013 Blood pressure, temperature, etc.',

        fees_click_title: '\ud83d\udcb0 Billing',
        fees_click_text: '<strong>Click "Fees"</strong> in the menu to access billing.',

        fees_info_title: 'Managing Billing',
        fees_info_text: 'The billing section lets you:<br><br>\u2022 <strong>Fee Sheet</strong> \u2013 Add procedure codes (CPT) for dental services<br>\u2022 <strong>Invoices</strong> \u2013 Create and send invoices<br>\u2022 <strong>Payments</strong> \u2013 Record patient payments',

        reports_click_title: '\ud83d\udcca Reports',
        reports_click_text: '<strong>Click "Reports"</strong> to view clinic analytics.',

        reports_info_title: 'Clinic Analytics',
        reports_info_text: 'Available reports include:<br><br>\u2022 <strong>Patient reports</strong> \u2013 Lists, demographics, history<br>\u2022 <strong>Financial reports</strong> \u2013 Revenue, payments, balances<br>\u2022 <strong>Visit reports</strong> \u2013 Appointment statistics<br>\u2022 <strong>Custom reports</strong>',

        user_title: '\ud83d\udc64 Your Profile',
        user_text: '<strong>Click your name</strong> to access:<br><br>\u2022 Change your password<br>\u2022 Personal settings<br>\u2022 Log out',

        patient_bar_title: 'Selected Patient Bar',
        patient_bar_text: 'When you select a patient, their info appears here: name, age, chart number. Click for full details.',

        tabs_title: 'Work Tabs',
        tabs_text: 'The system opens pages in separate tabs \u2013 just like a browser. You can work with multiple patients or sections at once by clicking the tabs here.',

        finish_title: '\u2705 You\'re All Set!',
        finish_text: 'You now know all the key features of ZEO Dental Clinic\'s system!<br><br>If you ever need help, click the <strong>?</strong> button in the bottom-right corner to restart this guide anytime.'
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

    function clickToAdvance(tour, getElement) {
        var el, handler;
        return {
            show: function () {
                el = typeof getElement === 'function' ? getElement() : getElement;
                if (el) {
                    handler = function () {
                        setTimeout(function () { tour.next(); }, 400);
                    };
                    el.addEventListener('click', handler, { once: true });
                }
            },
            hide: function () {
                if (el && handler) {
                    el.removeEventListener('click', handler);
                }
                el = null;
                handler = null;
            }
        };
    }

    function progress(num, total) {
        return ' <span class="crmze-tour-progress">' + t.step + ' ' + num + ' ' + t.of + ' ' + total + '</span>';
    }

    function buildTour() {
        var total = 16;
        var tour = new Shepherd.Tour({
            useModalOverlay: true,
            defaultStepOptions: {
                cancelIcon: { enabled: true },
                scrollTo: false,
                classes: 'crmze-tour-step'
            }
        });

        // Helper for interactive step buttons (skip only, click element advances)
        function interactiveButtons(num) {
            return [
                { text: t.skip_step + progress(num, total), action: tour.next, classes: 'shepherd-button shepherd-button-secondary' }
            ];
        }

        // Helper for info step buttons
        function infoButtons(num) {
            var btns = [];
            if (num > 1) btns.push({ text: t.back, action: tour.back, classes: 'shepherd-button shepherd-button-secondary' });
            btns.push({ text: t.next + progress(num, total), action: tour.next, classes: 'shepherd-button shepherd-button-primary' });
            return btns;
        }

        // Find menu elements
        var patientEl = findMenuByText('Patient') || findMenuByText('Pacienti');
        var calendarEl = findMenuByText('Calendar') || findMenuByText('Kalendar');
        var encounterEl = findMenuByText('Encounter') || findMenuByText('Vizit');
        var feesEl = findMenuByText('Fees') || findMenuByText('Tarif');
        var reportsEl = findMenuByText('Report') || findMenuByText('Raport');

        // 1. Welcome
        tour.addStep({
            id: 'welcome',
            title: t.welcome_title,
            text: t.welcome_text,
            buttons: [
                { text: t.skip, action: tour.cancel, classes: 'shepherd-button shepherd-button-secondary' },
                { text: t.start + progress(1, total), action: tour.next, classes: 'shepherd-button shepherd-button-primary' }
            ]
        });

        // 2. Navigation bar overview
        tour.addStep({
            id: 'navbar',
            title: t.nav_title,
            text: t.nav_text,
            attachTo: { element: '.navbar', on: 'bottom' },
            buttons: infoButtons(2)
        });

        // 3. Search box (interactive - click to focus)
        tour.addStep({
            id: 'search',
            title: t.search_title,
            text: t.search_text + '<br><br><em class="crmze-click-hint">\u261d ' + t.click_hint + ' ' + t.or_skip + '</em>',
            attachTo: { element: '#anySearchBox', on: 'bottom' },
            buttons: interactiveButtons(3),
            when: clickToAdvance(tour, function () { return document.getElementById('anySearchBox'); })
        });

        // 4. Patient menu (interactive - click to open)
        tour.addStep({
            id: 'click-patient',
            title: t.patient_click_title,
            text: t.patient_click_text + '<br><br><em class="crmze-click-hint">\u261d ' + t.click_hint + '</em>',
            attachTo: patientEl ? { element: patientEl, on: 'bottom' } : undefined,
            buttons: interactiveButtons(4),
            when: clickToAdvance(tour, function () { return findMenuByText('Patient') || findMenuByText('Pacienti'); })
        });

        // 5. Patient info (after clicking)
        tour.addStep({
            id: 'patient-info',
            title: t.patient_info_title,
            text: t.patient_info_text,
            buttons: infoButtons(5)
        });

        // 6. Calendar (interactive)
        tour.addStep({
            id: 'click-calendar',
            title: t.calendar_click_title,
            text: t.calendar_click_text + '<br><br><em class="crmze-click-hint">\u261d ' + t.click_hint + '</em>',
            attachTo: calendarEl ? { element: calendarEl, on: 'bottom' } : undefined,
            buttons: interactiveButtons(6),
            when: clickToAdvance(tour, function () { return findMenuByText('Calendar') || findMenuByText('Kalendar'); })
        });

        // 7. Calendar info
        tour.addStep({
            id: 'calendar-info',
            title: t.calendar_info_title,
            text: t.calendar_info_text,
            buttons: infoButtons(7)
        });

        // 8. Encounters (interactive)
        tour.addStep({
            id: 'click-encounter',
            title: t.encounter_click_title,
            text: t.encounter_click_text + '<br><br><em class="crmze-click-hint">\u261d ' + t.click_hint + '</em>',
            attachTo: encounterEl ? { element: encounterEl, on: 'bottom' } : undefined,
            buttons: interactiveButtons(8),
            when: clickToAdvance(tour, function () { return findMenuByText('Encounter') || findMenuByText('Vizit'); })
        });

        // 9. Encounter info
        tour.addStep({
            id: 'encounter-info',
            title: t.encounter_info_title,
            text: t.encounter_info_text,
            buttons: infoButtons(9)
        });

        // 10. Fees (interactive)
        tour.addStep({
            id: 'click-fees',
            title: t.fees_click_title,
            text: t.fees_click_text + '<br><br><em class="crmze-click-hint">\u261d ' + t.click_hint + '</em>',
            attachTo: feesEl ? { element: feesEl, on: 'bottom' } : undefined,
            buttons: interactiveButtons(10),
            when: clickToAdvance(tour, function () { return findMenuByText('Fees') || findMenuByText('Tarif'); })
        });

        // 11. Fees info
        tour.addStep({
            id: 'fees-info',
            title: t.fees_info_title,
            text: t.fees_info_text,
            buttons: infoButtons(11)
        });

        // 12. Reports (interactive)
        tour.addStep({
            id: 'click-reports',
            title: t.reports_click_title,
            text: t.reports_click_text + '<br><br><em class="crmze-click-hint">\u261d ' + t.click_hint + '</em>',
            attachTo: reportsEl ? { element: reportsEl, on: 'bottom' } : undefined,
            buttons: interactiveButtons(12),
            when: clickToAdvance(tour, function () { return findMenuByText('Report') || findMenuByText('Raport'); })
        });

        // 13. Reports info
        tour.addStep({
            id: 'reports-info',
            title: t.reports_info_title,
            text: t.reports_info_text,
            buttons: infoButtons(13)
        });

        // 14. User profile (interactive)
        tour.addStep({
            id: 'user-profile',
            title: t.user_title,
            text: t.user_text + '<br><br><em class="crmze-click-hint">\u261d ' + t.click_hint + '</em>',
            attachTo: { element: '#userData', on: 'bottom-end' },
            buttons: interactiveButtons(14),
            when: clickToAdvance(tour, function () { return document.getElementById('userData'); })
        });

        // 15. Tabs
        tour.addStep({
            id: 'tabs',
            title: t.tabs_title,
            text: t.tabs_text,
            attachTo: { element: '#tabs_div', on: 'bottom' },
            buttons: infoButtons(15)
        });

        // 16. Finish
        tour.addStep({
            id: 'finish',
            title: t.finish_title,
            text: t.finish_text,
            buttons: [
                { text: t.back, action: tour.back, classes: 'shepherd-button shepherd-button-secondary' },
                { text: t.done + progress(16, total), action: tour.complete, classes: 'shepherd-button shepherd-button-primary' }
            ]
        });

        return tour;
    }

    function isTourCompleted() {
        try { return localStorage.getItem(STORAGE_KEY) === '1'; } catch (e) { return false; }
    }

    function setTourCompleted() {
        try { localStorage.setItem(STORAGE_KEY, '1'); } catch (e) {}
    }

    window.crmzeTourRestart = function () {
        try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
        var tour = buildTour();
        tour.on('cancel', setTourCompleted);
        tour.on('complete', setTourCompleted);
        tour.start();
    };

    // Auto-start on first visit (wait for KnockoutJS to render menus)
    var ready = typeof jQuery !== 'undefined'
        ? function (fn) { jQuery(document).ready(fn); }
        : function (fn) { document.addEventListener('DOMContentLoaded', fn); };

    ready(function () {
        setTimeout(function () {
            if (!isTourCompleted()) {
                var tour = buildTour();
                tour.on('cancel', setTourCompleted);
                tour.on('complete', setTourCompleted);
                tour.start();
            }
        }, 3000);
    });
})();
