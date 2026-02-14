(function () {
    'use strict';

    var config = window.crmzeTourConfig;
    if (!config) return;

    var STORAGE_KEY = 'crmze_tour_completed_' + config.userId;
    var sq = config.langCode === 'sq';
    var webroot = config.webroot || '';

    // ─── IframeBridge: cross-iframe navigation & highlighting ───

    var IframeBridge = {
        _styleCSS:
            '.crmze-field-highlight{box-shadow:0 0 0 3px #1a5276,0 0 20px rgba(26,82,118,0.35)!important;' +
            'border-radius:4px!important;transition:box-shadow 0.3s;position:relative;z-index:10;}' +
            '.crmze-field-highlight-pulse{animation:crmzePulse 1.5s infinite;}' +
            '@keyframes crmzePulse{0%,100%{box-shadow:0 0 0 3px #1a5276,0 0 20px rgba(26,82,118,0.35)}' +
            '50%{box-shadow:0 0 0 5px #2471a3,0 0 30px rgba(36,113,163,0.5)}}' +
            '.crmze-field-label{position:absolute;left:0;bottom:calc(100% + 8px);background:#1a5276;' +
            'color:#fff;padding:6px 12px;border-radius:6px;font-size:13px;font-family:-apple-system,' +
            'BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;white-space:nowrap;z-index:9999;' +
            'box-shadow:0 4px 12px rgba(0,0,0,0.2);pointer-events:none;}' +
            '.crmze-field-label::after{content:"";position:absolute;top:100%;left:16px;' +
            'border:6px solid transparent;border-top-color:#1a5276;}',

        navigateAndWait: function (url, iframeName) {
            return new Promise(function (resolve) {
                var resolved = false;
                var done = function () {
                    if (resolved) return;
                    resolved = true;
                    setTimeout(resolve, 800);
                };

                try {
                    navigateTab(webroot + url, iframeName, function () {
                        activateTabByName(iframeName, true);
                    });
                } catch (e) {}

                var iframe = document.querySelector("iframe[name='" + iframeName + "']");
                if (iframe) {
                    iframe.addEventListener('load', done, { once: true });
                }
                setTimeout(done, 6000);
            });
        },

        getIframeDoc: function (iframeName) {
            var iframe = document.querySelector("iframe[name='" + iframeName + "']");
            if (!iframe) return null;
            try { return iframe.contentDocument || iframe.contentWindow.document; } catch (e) { return null; }
        },

        injectStyles: function (doc) {
            if (!doc || doc.getElementById('crmze-tour-styles')) return;
            var s = doc.createElement('style');
            s.id = 'crmze-tour-styles';
            s.textContent = this._styleCSS;
            (doc.head || doc.documentElement).appendChild(s);
        },

        highlightField: function (iframeName, selector, labelText) {
            var doc = this.getIframeDoc(iframeName);
            if (!doc) return function () {};

            this.injectStyles(doc);
            var el = doc.querySelector(selector);
            if (!el) return function () {};

            el.classList.add('crmze-field-highlight', 'crmze-field-highlight-pulse');
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });

            var label = null;
            if (labelText) {
                label = doc.createElement('div');
                label.className = 'crmze-field-label';
                label.textContent = labelText;
                var wrapper = el.closest('.form-group') || el.parentElement;
                wrapper.style.position = 'relative';
                wrapper.appendChild(label);
            }

            return function () {
                el.classList.remove('crmze-field-highlight', 'crmze-field-highlight-pulse');
                if (label && label.parentElement) label.parentElement.removeChild(label);
            };
        },

        clearHighlights: function (iframeName) {
            var doc = this.getIframeDoc(iframeName);
            if (!doc) return;
            doc.querySelectorAll('.crmze-field-highlight').forEach(function (el) {
                el.classList.remove('crmze-field-highlight', 'crmze-field-highlight-pulse');
            });
            doc.querySelectorAll('.crmze-field-label').forEach(function (el) {
                if (el.parentElement) el.parentElement.removeChild(el);
            });
        }
    };

    // ─── Translations ───

    var t = sq ? {
        skip: 'Kalo Udh\u00ebzuesin', start: 'Fillo!', next: 'Tjetri', back: 'Mbrapa',
        done: 'Perfundo', skip_step: 'Kalo hapin', chapter: 'Kapitulli', step: 'Hapi', of: 'nga',
        click_hint: '\u261d Klikoni elementin e theksuar p\u00ebr t\u00eb vazhduar',

        // Chapter 1: Orientation
        ch1: 'Orientimi',
        welcome_title: 'Mir\u00eb se vini n\u00eb Klinik\u00ebn Dentare ZEO!',
        welcome_text: 'Ky udh\u00ebzues interaktiv do t\'ju \u00e7oj\u00eb n\u00ebp\u00ebr t\u00eb gjith\u00eb rrjedh\u00ebn e pun\u00ebs s\u00eb klinik\u00ebs \u2013 hap pas hapi.<br><br><strong>Si funksionon:</strong><br>\u2022 Kur theksohet nj\u00eb element, klikoni at\u00eb p\u00ebr t\u00eb vazhduar<br>\u2022 Fushat brenda faqeve do t\u00eb theksohen me <span style="color:#1a5276;font-weight:600">blu</span><br>\u2022 Mund ta kaloni \u00e7do hap me butonin "Kalo hapin"',
        nav_title: 'Shiriti i Navigimit',
        nav_text: 'K\u00ebtu gjenden t\u00eb gjitha seksionet e Klinik\u00ebs Dentare ZEO: Pacient\u00ebt, Kalendari, Vizitat Klinike, Faturimi, Raportet dhe Administrimi.',
        search_title: '\ud83d\udd0d K\u00ebrkimi i Pacient\u00ebve',
        search_text: '<strong>Klikoni n\u00eb fush\u00ebn e k\u00ebrkimit</strong> p\u00ebr t\u00eb k\u00ebrkuar pacient\u00ebt sipas emrit, mbiemrit ose numrit t\u00eb kartel\u00ebs.',
        tabs_title: 'Skedat e Pun\u00ebs',
        tabs_text: 'Faqet hapen n\u00eb skeda t\u00eb ve\u00e7anta \u2013 nj\u00eblloj si n\u00eb shfletues. Mund t\u00eb punoni me disa faqe nj\u00ebkoh\u00ebsisht.',

        // Chapter 2: Patient Registration
        ch2: 'Regjistrimi i Pacientit',
        pat_click_title: '\ud83d\udc64 Hapni Menun\u00eb e Pacientit',
        pat_click_text: '<strong>Klikoni "Pacienti/Klienti"</strong> n\u00eb shiritin e navigimit.',
        pat_new_title: 'Klikoni "I Ri/K\u00ebrko"',
        pat_new_text: '<strong>Klikoni "I Ri/K\u00ebrko"</strong> n\u00eb n\u00ebn-menun\u00eb q\u00eb u hap p\u00ebr t\u00eb hapur formularin e regjistrimit.',
        fname_title: '\u270d Emri i Pacientit',
        fname_text: 'Kjo \u00ebsht\u00eb fusha e <strong>Emrit</strong>. K\u00ebtu shkruani emrin e pacientit, p.sh. "Arta".',
        fname_label: 'Emri',
        lname_title: 'Mbiemri i Pacientit',
        lname_text: 'Kjo \u00ebsht\u00eb fusha e <strong>Mbiemrit</strong>. Shkruani mbiemrin, p.sh. "Hoxha".',
        lname_label: 'Mbiemri',
        dob_title: '\ud83d\udcc5 Dat\u00eblindja',
        dob_text: 'Klikoni n\u00eb k\u00ebt\u00eb fush\u00eb p\u00ebr t\u00eb hapur kalendarin dhe zgjedhur <strong>dat\u00eblindjen</strong> e pacientit.',
        dob_label: 'Dat\u00eblindja',
        sex_title: '\u2642\ufe0f Gjinia',
        sex_text: 'Zgjidhni <strong>gjinin\u00eb</strong> e pacientit nga lista rr\u00ebshqit\u00ebse.',
        sex_label: 'Gjinia',
        phone_title: '\ud83d\udcf1 Numri i Telefonit',
        phone_text: 'Shkruani <strong>numrin e celularit</strong> t\u00eb pacientit p\u00ebr kontakt.',
        phone_label: 'Celulari',
        email_title: '\ud83d\udce7 Email-i',
        email_text: 'Shkruani <strong>adresen e email-it</strong> t\u00eb pacientit (opsionale).',
        email_label: 'Email',
        create_title: '\u2705 Ruaj Pacientin',
        create_text: 'Pasi t\u00eb keni plot\u00ebsuar t\u00eb gjitha fushat, klikoni <strong>"Krijo Pacientin e Ri"</strong> p\u00ebr ta ruajtur n\u00eb sistem.',
        create_label: 'Krijo Pacientin e Ri',
        pat_done_title: '\ud83c\udf89 Regjistrimi i Pacientit!',
        pat_done_text: 'Tani e dini si t\u00eb regjistroni nj\u00eb pacient t\u00eb ri n\u00eb Klinik\u00ebn Dentare ZEO!<br><br>Le t\u00eb m\u00ebsojm\u00eb si t\u00eb caktojm\u00eb tak\u00edme...',

        // Chapter 3: Scheduling
        ch3: 'Caktimi i Tak\u00edmeve',
        cal_click_title: '\ud83d\udcc5 Hapni Kalendarin',
        cal_click_text: '<strong>Klikoni "Kalendari"</strong> n\u00eb meny p\u00ebr t\u00eb par\u00eb orarin e tak\u00edmeve.',
        cal_view_title: 'Kalendari i Tak\u00edmeve',
        cal_view_text: 'Ky \u00ebsht\u00eb kalendari ku shfaqen t\u00eb gjitha tak\u00edmet e klinik\u00ebs.<br><br>\u2022 <strong>Pamja dit\u00eb/jav\u00eb/muaj</strong> \u2013 ndryshoni me butonat n\u00eb krye<br>\u2022 <strong>Ngjyrat</strong> tregojn\u00eb kategorit\u00eb e ndryshme t\u00eb tak\u00edmeve',
        cal_slot_title: 'Caktoni nj\u00eb Tak\u00edm',
        cal_slot_text: 'P\u00ebr t\u00eb caktuar nj\u00eb tak\u00edm t\u00eb ri:<br><br>1\ufe0f\u20e3 <strong>Klikoni n\u00eb nj\u00eb slot bosh</strong> n\u00eb kalendar<br>2\ufe0f\u20e3 Zgjidhni <strong>pacientin</strong> nga lista<br>3\ufe0f\u20e3 Zgjidhni <strong>mjekun</strong> dhe <strong>kategorin\u00eb</strong><br>4\ufe0f\u20e3 Vendosni <strong>koh\u00ebzgjatjen</strong><br>5\ufe0f\u20e3 Klikoni <strong>Ruaj</strong>',
        cal_checkin_title: 'Regjistrimi n\u00eb Klinik\u00eb (Check-In)',
        cal_checkin_text: 'Kur pacienti vjen n\u00eb klinik\u00eb:<br><br>1\ufe0f\u20e3 Gjeni tak\u00edmin e tij n\u00eb kalendar<br>2\ufe0f\u20e3 Klikoni mbi tak\u00edmin<br>3\ufe0f\u20e3 Zgjidhni <strong>"Check In"</strong><br><br>Statusi i tak\u00edmit ndryshon n\u00eb "\u00cb regjistruar".',
        cal_done_title: '\ud83c\udf89 Caktimi i Tak\u00edmeve!',
        cal_done_text: 'Tani e dini si t\u00eb p\u00ebrdorni kalendarin! Le t\u00eb shohim vizitat klinike...',

        // Chapter 4: Encounters
        ch4: 'Vizitat Klinike',
        enc_click_title: '\ud83e\ude7a Vizitat Klinike',
        enc_click_text: '<strong>Klikoni seksionin e vizitave klinike</strong> n\u00eb meny.',
        enc_what_title: '\u00c7far\u00eb \u00ebsht\u00eb nj\u00eb "Vizit\u00eb"?',
        enc_what_text: 'P\u00ebr \u00e7do her\u00eb q\u00eb pacienti vjen n\u00eb klinik\u00eb, krijohet nj\u00eb <strong>Vizit\u00eb (Encounter)</strong>.<br><br>P\u00ebr ta krijuar:<br>1\ufe0f\u20e3 Zgjidhni nj\u00eb pacient<br>2\ufe0f\u20e3 Klikoni <strong>"Vizit\u00eb e Re"</strong><br>3\ufe0f\u20e3 Plot\u00ebsoni arsyen e vizit\u00ebs',
        enc_forms_title: 'Formular\u00ebt Klinik\u00eb',
        enc_forms_text: 'Brenda nj\u00eb vizite mund t\u00eb shtoni:<br><br>\u2022 <strong>Sh\u00ebnime SOAP</strong> \u2013 Ankesa, ekzaminimi, diagnoza, plani<br>\u2022 <strong>Procedurat Dentare</strong> \u2013 Pastrim, mbushje, nx\u00ebrrje etj.<br>\u2022 <strong>Recetat</strong> \u2013 Medikamente p\u00ebr pacientin<br>\u2022 <strong>Sh\u00ebnime Vitale</strong> \u2013 Presioni, temperatura<br><br>\u00c7do gjë ruhet n\u00eb kartel\u00ebn e p\u00ebrhersh\u00ebn t\u00eb pacientit.',
        enc_done_title: '\ud83c\udf89 Vizitat Klinike!',
        enc_done_text: 'Tani e kuptoni si dokumentohen vizitat! Le t\u00eb shohim faturimin...',

        // Chapter 5: Billing & Reports
        ch5: 'Faturimi & Raportet',
        fees_click_title: '\ud83d\udcb0 Faturimi',
        fees_click_text: '<strong>Klikoni "Tarifa"</strong> n\u00eb meny.',
        fees_info_title: 'Fleta e Tarifave',
        fees_info_text: 'Pas \u00e7do vizite, shtoni sh\u00ebrbimet e kryera n\u00eb Flet\u00ebn e Tarifave:<br><br>\u2022 <strong>Zgjidhni procedur\u00ebn</strong> \u2013 p.sh. "Pastrim dentar", "Mbushje"<br>\u2022 <strong>Kodi CPT</strong> vendoset automatikisht<br>\u2022 <strong>\u00c7mimi</strong> ngarkohet nga lista e sh\u00ebrbimeve<br>\u2022 Klikoni <strong>Ruaj</strong> p\u00ebr t\u00eb regjistruar fatur\u00ebn',
        rep_click_title: '\ud83d\udcca Raportet',
        rep_click_text: '<strong>Klikoni "Raportet"</strong> p\u00ebr analitik\u00ebn e klinik\u00ebs.',
        rep_info_title: 'Raportet e Disponueshme',
        rep_info_text: 'Raportet p\u00ebrfshijn\u00eb:<br><br>\u2022 <strong>Lista e pacient\u00ebve</strong> \u2013 K\u00ebrko & filtro<br>\u2022 <strong>Raportet financiare</strong> \u2013 T\u00eb ardhurat, bilancet<br>\u2022 <strong>Statistikat e vizitave</strong> \u2013 Sa pacient\u00eb p\u00ebr dit\u00eb/jav\u00eb<br>\u2022 <strong>Raportet e recetave</strong> \u2013 Historiku i medikamenteve',

        // Chapter 6: Wrap-up
        ch6: 'P\u00ebrfundim',
        user_title: '\ud83d\udc64 Profili Juaj',
        user_text: '<strong>Klikoni emrin tuaj</strong> p\u00ebr t\u00eb aksesuar profilin, ndryshuar fjal\u00ebkalimin ose dal\u00eb nga sistemi.',
        finish_title: '\u2705 Jeni Gati!',
        finish_text: 'Tani i njihni t\u00eb gjitha funksionet kryesore t\u00eb Klinik\u00ebs Dentare ZEO!<br><br><strong>\u00c7far\u00eb m\u00ebsuat:</strong><br>\u2022 Si t\u00eb regjistroni pacient\u00eb t\u00eb rinj<br>\u2022 Si t\u00eb caktoni tak\u00edme n\u00eb kalendar<br>\u2022 Si t\u00eb dokumentoni vizitat klinike<br>\u2022 Si t\u00eb menaxhoni faturimin<br>\u2022 Si t\u00eb shikoni raportet<br><br>Klikoni butonin <strong>?</strong> n\u00eb k\u00ebndin e posht\u00ebm djathtas p\u00ebr ta rifilluar k\u00ebt\u00eb udh\u00ebzues n\u00eb \u00e7do koh\u00eb.'
    } : {
        skip: 'Skip Tour', start: 'Let\'s Start!', next: 'Next', back: 'Back',
        done: 'Finish', skip_step: 'Skip step', chapter: 'Chapter', step: 'Step', of: 'of',
        click_hint: '\u261d Click the highlighted element to continue',

        ch1: 'Orientation',
        welcome_title: 'Welcome to ZEO Dental Clinic!',
        welcome_text: 'This interactive guide will walk you through the entire clinic workflow \u2013 step by step.<br><br><strong>How it works:</strong><br>\u2022 When an element is highlighted, click it to continue<br>\u2022 Fields inside pages will be highlighted in <span style="color:#1a5276;font-weight:600">blue</span><br>\u2022 You can skip any step with the "Skip step" button',
        nav_title: 'Navigation Bar',
        nav_text: 'Here you\'ll find all sections of ZEO Dental Clinic: Patients, Calendar, Clinical Visits, Billing, Reports, and Administration.',
        search_title: '\ud83d\udd0d Patient Search',
        search_text: '<strong>Click the search box</strong> to search for patients by name, surname, or chart number.',
        tabs_title: 'Work Tabs',
        tabs_text: 'Pages open in separate tabs \u2013 just like a browser. You can work with multiple pages at the same time.',

        ch2: 'Patient Registration',
        pat_click_title: '\ud83d\udc64 Open Patient Menu',
        pat_click_text: '<strong>Click "Patient/Client"</strong> in the navigation bar.',
        pat_new_title: 'Click "New/Search"',
        pat_new_text: '<strong>Click "New/Search"</strong> in the submenu that opened to open the registration form.',
        fname_title: '\u270d Patient First Name',
        fname_text: 'This is the <strong>First Name</strong> field. Type the patient\'s first name here, e.g. "Maria".',
        fname_label: 'First Name',
        lname_title: 'Patient Last Name',
        lname_text: 'This is the <strong>Last Name</strong> field. Type the patient\'s last name, e.g. "Smith".',
        lname_label: 'Last Name',
        dob_title: '\ud83d\udcc5 Date of Birth',
        dob_text: 'Click this field to open the date picker and select the patient\'s <strong>date of birth</strong>.',
        dob_label: 'Date of Birth',
        sex_title: '\u2642\ufe0f Gender',
        sex_text: 'Select the patient\'s <strong>gender</strong> from the dropdown list.',
        sex_label: 'Gender',
        phone_title: '\ud83d\udcf1 Phone Number',
        phone_text: 'Enter the patient\'s <strong>cell phone number</strong> for contact.',
        phone_label: 'Cell Phone',
        email_title: '\ud83d\udce7 Email',
        email_text: 'Enter the patient\'s <strong>email address</strong> (optional).',
        email_label: 'Email',
        create_title: '\u2705 Save Patient',
        create_text: 'Once all fields are filled, click <strong>"Create New Patient"</strong> to save them to the system.',
        create_label: 'Create New Patient',
        pat_done_title: '\ud83c\udf89 Patient Registration!',
        pat_done_text: 'You now know how to register a new patient at ZEO Dental Clinic!<br><br>Let\'s learn how to schedule appointments...',

        ch3: 'Scheduling',
        cal_click_title: '\ud83d\udcc5 Open the Calendar',
        cal_click_text: '<strong>Click "Calendar"</strong> in the menu to see the appointment schedule.',
        cal_view_title: 'Appointment Calendar',
        cal_view_text: 'This is the calendar showing all clinic appointments.<br><br>\u2022 <strong>Day/Week/Month views</strong> \u2013 switch with buttons at the top<br>\u2022 <strong>Colors</strong> indicate different appointment categories',
        cal_slot_title: 'Schedule an Appointment',
        cal_slot_text: 'To schedule a new appointment:<br><br>1\ufe0f\u20e3 <strong>Click an empty time slot</strong> in the calendar<br>2\ufe0f\u20e3 Select the <strong>patient</strong> from the list<br>3\ufe0f\u20e3 Choose the <strong>provider</strong> and <strong>category</strong><br>4\ufe0f\u20e3 Set the <strong>duration</strong><br>5\ufe0f\u20e3 Click <strong>Save</strong>',
        cal_checkin_title: 'Patient Check-In',
        cal_checkin_text: 'When a patient arrives at the clinic:<br><br>1\ufe0f\u20e3 Find their appointment in the calendar<br>2\ufe0f\u20e3 Click on the appointment<br>3\ufe0f\u20e3 Select <strong>"Check In"</strong><br><br>The appointment status changes to "Checked in".',
        cal_done_title: '\ud83c\udf89 Scheduling!',
        cal_done_text: 'You now know how to use the calendar! Let\'s look at clinical visits...',

        ch4: 'Clinical Encounters',
        enc_click_title: '\ud83e\ude7a Clinical Encounters',
        enc_click_text: '<strong>Click the encounters section</strong> in the menu.',
        enc_what_title: 'What is an "Encounter"?',
        enc_what_text: 'Every time a patient visits the clinic, an <strong>Encounter</strong> is created.<br><br>To create one:<br>1\ufe0f\u20e3 Select a patient<br>2\ufe0f\u20e3 Click <strong>"New Encounter"</strong><br>3\ufe0f\u20e3 Fill in the reason for the visit',
        enc_forms_title: 'Clinical Forms',
        enc_forms_text: 'Inside an encounter you can add:<br><br>\u2022 <strong>SOAP Notes</strong> \u2013 Complaint, exam, diagnosis, plan<br>\u2022 <strong>Dental Procedures</strong> \u2013 Cleaning, filling, extraction, etc.<br>\u2022 <strong>Prescriptions</strong> \u2013 Medications for the patient<br>\u2022 <strong>Vitals</strong> \u2013 Blood pressure, temperature<br><br>Everything is saved to the patient\'s permanent record.',
        enc_done_title: '\ud83c\udf89 Clinical Encounters!',
        enc_done_text: 'You now understand how visits are documented! Let\'s look at billing...',

        ch5: 'Billing & Reports',
        fees_click_title: '\ud83d\udcb0 Billing',
        fees_click_text: '<strong>Click "Fees"</strong> in the menu.',
        fees_info_title: 'Fee Sheet',
        fees_info_text: 'After each visit, add the services performed to the Fee Sheet:<br><br>\u2022 <strong>Select the procedure</strong> \u2013 e.g. "Dental Cleaning", "Filling"<br>\u2022 <strong>CPT Code</strong> is set automatically<br>\u2022 <strong>Price</strong> is loaded from the service list<br>\u2022 Click <strong>Save</strong> to record the charge',
        rep_click_title: '\ud83d\udcca Reports',
        rep_click_text: '<strong>Click "Reports"</strong> for clinic analytics.',
        rep_info_title: 'Available Reports',
        rep_info_text: 'Reports include:<br><br>\u2022 <strong>Patient lists</strong> \u2013 Search & filter<br>\u2022 <strong>Financial reports</strong> \u2013 Revenue, balances<br>\u2022 <strong>Visit statistics</strong> \u2013 Patients per day/week<br>\u2022 <strong>Prescription reports</strong> \u2013 Medication history',

        ch6: 'Wrap-up',
        user_title: '\ud83d\udc64 Your Profile',
        user_text: '<strong>Click your name</strong> to access your profile, change your password, or log out.',
        finish_title: '\u2705 You\'re All Set!',
        finish_text: 'You now know all the key features of ZEO Dental Clinic\'s system!<br><br><strong>What you learned:</strong><br>\u2022 How to register new patients<br>\u2022 How to schedule appointments<br>\u2022 How to document clinical visits<br>\u2022 How to manage billing<br>\u2022 How to view reports<br><br>Click the <strong>?</strong> button in the bottom-right corner to restart this guide anytime.'
    };

    // ─── Helpers ───

    function findMenuByText(text) {
        var labels = document.querySelectorAll('#mainMenu .menuLabel');
        for (var i = 0; i < labels.length; i++) {
            if (labels[i].textContent.trim().toLowerCase().indexOf(text.toLowerCase()) !== -1) {
                return labels[i];
            }
        }
        return null;
    }

    function findSubmenuByText(text) {
        var entries = document.querySelectorAll('#mainMenu .menuEntries .menuLabel');
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].textContent.trim().toLowerCase().indexOf(text.toLowerCase()) !== -1) {
                return entries[i];
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
                    handler = function () { setTimeout(function () { tour.next(); }, 400); };
                    el.addEventListener('click', handler, { once: true });
                }
            },
            hide: function () {
                if (el && handler) el.removeEventListener('click', handler);
                el = null; handler = null;
            }
        };
    }

    function chapterBadge(chNum, chName) {
        return '<div class="crmze-chapter-badge">' + t.chapter + ' ' + chNum + ': ' + chName + '</div>';
    }

    function prog(num) {
        return ' <span class="crmze-tour-progress">' + t.step + ' ' + num + '/30</span>';
    }

    // ─── Build Tour ───

    function buildTour() {
        var tour = new Shepherd.Tour({
            useModalOverlay: true,
            defaultStepOptions: {
                cancelIcon: { enabled: true },
                scrollTo: false,
                classes: 'crmze-tour-step'
            }
        });

        var cleanup = null;
        function doCleanup() {
            if (cleanup) { cleanup(); cleanup = null; }
        }

        function interactiveBtn(n) {
            return [{ text: t.skip_step + prog(n), action: tour.next, classes: 'shepherd-button shepherd-button-secondary' }];
        }
        function infoBtn(n) {
            return [
                { text: t.back, action: tour.back, classes: 'shepherd-button shepherd-button-secondary' },
                { text: t.next + prog(n), action: tour.next, classes: 'shepherd-button shepherd-button-primary' }
            ];
        }

        // === CHAPTER 1: ORIENTATION ===

        // 1. Welcome
        tour.addStep({
            id: 'welcome', title: t.welcome_title,
            text: chapterBadge(1, t.ch1) + t.welcome_text,
            buttons: [
                { text: t.skip, action: tour.cancel, classes: 'shepherd-button shepherd-button-secondary' },
                { text: t.start + prog(1), action: tour.next, classes: 'shepherd-button shepherd-button-primary' }
            ]
        });

        // 2. Navigation bar
        tour.addStep({
            id: 'navbar', title: t.nav_title,
            text: chapterBadge(1, t.ch1) + t.nav_text,
            attachTo: { element: '.navbar', on: 'bottom' },
            buttons: infoBtn(2)
        });

        // 3. Search box (interactive)
        tour.addStep({
            id: 'search', title: t.search_title,
            text: chapterBadge(1, t.ch1) + t.search_text + '<br><br><em class="crmze-click-hint">' + t.click_hint + '</em>',
            attachTo: { element: '#anySearchBox', on: 'bottom' },
            buttons: interactiveBtn(3),
            when: clickToAdvance(tour, function () { return document.getElementById('anySearchBox'); })
        });

        // 4. Tabs
        tour.addStep({
            id: 'tabs', title: t.tabs_title,
            text: chapterBadge(1, t.ch1) + t.tabs_text,
            attachTo: { element: '#tabs_div', on: 'bottom' },
            buttons: infoBtn(4)
        });

        // === CHAPTER 2: PATIENT REGISTRATION ===

        // 5. Click Patient menu (interactive)
        tour.addStep({
            id: 'click-patient', title: t.pat_click_title,
            text: chapterBadge(2, t.ch2) + t.pat_click_text + '<br><br><em class="crmze-click-hint">' + t.click_hint + '</em>',
            attachTo: (function () { var el = findMenuByText('Patient') || findMenuByText('Pacienti'); return el ? { element: el, on: 'bottom' } : undefined; })(),
            buttons: interactiveBtn(5),
            when: clickToAdvance(tour, function () {
                return findMenuByText('Patient') || findMenuByText('Pacienti');
            })
        });

        // 6. Click New/Search submenu (interactive)
        tour.addStep({
            id: 'click-new-search', title: t.pat_new_title,
            text: chapterBadge(2, t.ch2) + t.pat_new_text + '<br><br><em class="crmze-click-hint">' + t.click_hint + '</em>',
            buttons: interactiveBtn(6),
            when: {
                show: function () {
                    var el = findSubmenuByText('New/Search') || findSubmenuByText('I Ri') || findSubmenuByText('K\u00ebrko');
                    if (el) {
                        el.addEventListener('click', function h() {
                            el.removeEventListener('click', h);
                            setTimeout(function () { tour.next(); }, 800);
                        }, { once: true });
                        try { this.updateStepOptions({ attachTo: { element: el, on: 'right' } }); } catch (e) {}
                    }
                }
            }
        });

        // 7. First Name field (iframe highlight)
        tour.addStep({
            id: 'fname', title: t.fname_title,
            text: chapterBadge(2, t.ch2) + t.fname_text,
            buttons: infoBtn(7),
            beforeShowPromise: function () {
                doCleanup();
                return IframeBridge.navigateAndWait('/interface/new/new_comprehensive.php', 'fin');
            },
            when: {
                show: function () {
                    cleanup = IframeBridge.highlightField('fin', "input[name='form_fname']", t.fname_label);
                },
                hide: function () { doCleanup(); }
            }
        });

        // 8. Last Name
        tour.addStep({
            id: 'lname', title: t.lname_title,
            text: chapterBadge(2, t.ch2) + t.lname_text,
            buttons: infoBtn(8),
            when: {
                show: function () { cleanup = IframeBridge.highlightField('fin', "input[name='form_lname']", t.lname_label); },
                hide: function () { doCleanup(); }
            }
        });

        // 9. DOB
        tour.addStep({
            id: 'dob', title: t.dob_title,
            text: chapterBadge(2, t.ch2) + t.dob_text,
            buttons: infoBtn(9),
            when: {
                show: function () { cleanup = IframeBridge.highlightField('fin', "input[name='form_DOB'], #form_DOB, #DOB", t.dob_label); },
                hide: function () { doCleanup(); }
            }
        });

        // 10. Gender
        tour.addStep({
            id: 'sex', title: t.sex_title,
            text: chapterBadge(2, t.ch2) + t.sex_text,
            buttons: infoBtn(10),
            when: {
                show: function () { cleanup = IframeBridge.highlightField('fin', "select[name='form_sex'], #form_sex", t.sex_label); },
                hide: function () { doCleanup(); }
            }
        });

        // 11. Phone
        tour.addStep({
            id: 'phone', title: t.phone_title,
            text: chapterBadge(2, t.ch2) + t.phone_text,
            buttons: infoBtn(11),
            when: {
                show: function () { cleanup = IframeBridge.highlightField('fin', "input[name='form_phone_cell']", t.phone_label); },
                hide: function () { doCleanup(); }
            }
        });

        // 12. Email
        tour.addStep({
            id: 'email', title: t.email_title,
            text: chapterBadge(2, t.ch2) + t.email_text,
            buttons: infoBtn(12),
            when: {
                show: function () { cleanup = IframeBridge.highlightField('fin', "input[name='form_email']", t.email_label); },
                hide: function () { doCleanup(); }
            }
        });

        // 13. Create button
        tour.addStep({
            id: 'create-btn', title: t.create_title,
            text: chapterBadge(2, t.ch2) + t.create_text,
            buttons: infoBtn(13),
            when: {
                show: function () { cleanup = IframeBridge.highlightField('fin', "#create, .btn-save, input[name='create']", t.create_label); },
                hide: function () { doCleanup(); }
            }
        });

        // 14. Patient done
        tour.addStep({
            id: 'pat-done', title: t.pat_done_title,
            text: chapterBadge(2, t.ch2) + t.pat_done_text,
            buttons: infoBtn(14),
            when: { show: function () { IframeBridge.clearHighlights('fin'); } }
        });

        // === CHAPTER 3: SCHEDULING ===

        // 15. Click Calendar (interactive)
        tour.addStep({
            id: 'click-calendar', title: t.cal_click_title,
            text: chapterBadge(3, t.ch3) + t.cal_click_text + '<br><br><em class="crmze-click-hint">' + t.click_hint + '</em>',
            attachTo: (function () { var el = findMenuByText('Calendar') || findMenuByText('Kalendar'); return el ? { element: el, on: 'bottom' } : undefined; })(),
            buttons: interactiveBtn(15),
            when: clickToAdvance(tour, function () {
                return findMenuByText('Calendar') || findMenuByText('Kalendar');
            })
        });

        // 16. Calendar loaded
        tour.addStep({
            id: 'cal-view', title: t.cal_view_title,
            text: chapterBadge(3, t.ch3) + t.cal_view_text,
            buttons: infoBtn(16),
            beforeShowPromise: function () {
                return IframeBridge.navigateAndWait('/interface/main/calendar/index.php', 'lst');
            }
        });

        // 17. Calendar slot instruction
        tour.addStep({
            id: 'cal-slot', title: t.cal_slot_title,
            text: chapterBadge(3, t.ch3) + t.cal_slot_text,
            buttons: infoBtn(17)
        });

        // 18. Check-in
        tour.addStep({
            id: 'cal-checkin', title: t.cal_checkin_title,
            text: chapterBadge(3, t.ch3) + t.cal_checkin_text,
            buttons: infoBtn(18)
        });

        // 19. Calendar done
        tour.addStep({
            id: 'cal-done', title: t.cal_done_title,
            text: chapterBadge(3, t.ch3) + t.cal_done_text,
            buttons: infoBtn(19)
        });

        // === CHAPTER 4: ENCOUNTERS ===

        // 20. Click Encounters (interactive)
        tour.addStep({
            id: 'click-encounter', title: t.enc_click_title,
            text: chapterBadge(4, t.ch4) + t.enc_click_text + '<br><br><em class="crmze-click-hint">' + t.click_hint + '</em>',
            attachTo: (function () { var el = findMenuByText('Encounter') || findMenuByText('Vizit'); return el ? { element: el, on: 'bottom' } : undefined; })(),
            buttons: interactiveBtn(20),
            when: clickToAdvance(tour, function () {
                return findMenuByText('Encounter') || findMenuByText('Vizit');
            })
        });

        // 21. What is an encounter
        tour.addStep({
            id: 'enc-what', title: t.enc_what_title,
            text: chapterBadge(4, t.ch4) + t.enc_what_text,
            buttons: infoBtn(21)
        });

        // 22. Clinical forms
        tour.addStep({
            id: 'enc-forms', title: t.enc_forms_title,
            text: chapterBadge(4, t.ch4) + t.enc_forms_text,
            buttons: infoBtn(22)
        });

        // 23. Encounters done
        tour.addStep({
            id: 'enc-done', title: t.enc_done_title,
            text: chapterBadge(4, t.ch4) + t.enc_done_text,
            buttons: infoBtn(23)
        });

        // === CHAPTER 5: BILLING & REPORTS ===

        // 24. Click Fees (interactive)
        tour.addStep({
            id: 'click-fees', title: t.fees_click_title,
            text: chapterBadge(5, t.ch5) + t.fees_click_text + '<br><br><em class="crmze-click-hint">' + t.click_hint + '</em>',
            attachTo: (function () { var el = findMenuByText('Fees') || findMenuByText('Tarif'); return el ? { element: el, on: 'bottom' } : undefined; })(),
            buttons: interactiveBtn(24),
            when: clickToAdvance(tour, function () {
                return findMenuByText('Fees') || findMenuByText('Tarif');
            })
        });

        // 25. Fees info
        tour.addStep({
            id: 'fees-info', title: t.fees_info_title,
            text: chapterBadge(5, t.ch5) + t.fees_info_text,
            buttons: infoBtn(25)
        });

        // 26. Click Reports (interactive)
        tour.addStep({
            id: 'click-reports', title: t.rep_click_title,
            text: chapterBadge(5, t.ch5) + t.rep_click_text + '<br><br><em class="crmze-click-hint">' + t.click_hint + '</em>',
            attachTo: (function () { var el = findMenuByText('Report') || findMenuByText('Raport'); return el ? { element: el, on: 'bottom' } : undefined; })(),
            buttons: interactiveBtn(26),
            when: clickToAdvance(tour, function () {
                return findMenuByText('Report') || findMenuByText('Raport');
            })
        });

        // 27. Reports info
        tour.addStep({
            id: 'rep-info', title: t.rep_info_title,
            text: chapterBadge(5, t.ch5) + t.rep_info_text,
            buttons: infoBtn(27)
        });

        // === CHAPTER 6: WRAP-UP ===

        // 28. User profile (interactive)
        tour.addStep({
            id: 'user-profile', title: t.user_title,
            text: chapterBadge(6, t.ch6) + t.user_text + '<br><br><em class="crmze-click-hint">' + t.click_hint + '</em>',
            attachTo: { element: '#userData', on: 'bottom-end' },
            buttons: interactiveBtn(28),
            when: clickToAdvance(tour, function () { return document.getElementById('userData'); })
        });

        // 29. Finish
        tour.addStep({
            id: 'finish', title: t.finish_title,
            text: chapterBadge(6, t.ch6) + t.finish_text,
            buttons: [
                { text: t.back, action: tour.back, classes: 'shepherd-button shepherd-button-secondary' },
                { text: t.done + prog(29), action: tour.complete, classes: 'shepherd-button shepherd-button-primary' }
            ]
        });

        return tour;
    }

    // ─── Lifecycle ───

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
