
$(document).ready(function() {

    var arrLang={
        
        'tr':{
            // <!--=========NAVBAR=========-->
            'country': 'Ülkenizi Seçin',
            'countr': 'Ülke',
	        'citySelect': 'Şehrinizi Seçin',
	        'cities': 'İl',
	        'districtSelect': 'İlçenizi Seçin',
	        'city': 'İlçe',
	        'add': 'Ekle',
	        'flag': './img/flags/turkey.png',
	        'addCenter': 'Merkezinizi Ekleyin',
	        'register': 'Kayıt Ol',
	        'login': 'Giriş Yap',
	        'emailAddress': 'Email Adresi',
	        'password': 'Şifrenizi Giriniz',
	        'rememberMe': 'Beni Hatırla',
	        'passwordFind': 'Şifremi Unuttum',
	        'accountInformation': 'Hesabınız ile birlikte, Şartlar ve Koşullar ve Gizlilik Politikası & Kişisel Verilerin İşlenmesine onay verilir.',

            // <!--=========BANNER=========-->
            'centerFindSearch':' Aradığınız diyaliz merkezini bulun',
            'centerEasy': 'Diyaliz merkezi bulmanın en hızlı ve en kolay yolu',
            'centerFind': 'Diyaliz Bul',
            'cash': 'Rezervasyon ücreti yok',
            'creditCard': 'Kredi kartı yok',
            'cancelEasy': 'Rezervasyon iptal kolaylığı',

            // <!--=========DIALYSING CENTER EXPLORE=========-->
            'exploreTitle': 'Diyaliz Merkezlerini Keşfedin',
            'allView': 'Tümünü Görüntüle',
            'dialysCenter': 'Diyaliz Merkezi',
            // <!--========= LAST SEARCH =========-->
	        'lastSearch1': 'Ocak 25-Şubat 10 Tarihleri Arasında',
            // <!--=========DIALYSING ARTICLE=========-->
            'articleTitle': 'Diyalizi Tedaviniz İçin İlham Alın',
            'allViewArticle': 'Tüm Makaleleri Görüntüle',
            'articleSubTitle1': 'Diyaliz Nedir?', 
            'articlesSubText1': 'Fermentum tristique egestas elit nulla morbi integer rhoncus quis in quam quis purus eu posuere dui scelerisque urna,turpis senectus ',
            'articleSubTitle2': 'Diyalizde Beslenme',
            'articlesSubText2': 'Fermentum tristique egestas elit nulla morbi integer rhoncus quis in quam quis purus eu posuere dui scelerisque urna,turpis senectus', 
            'articleSubTitle3': 'Böbrek Nakli',
            'articlesSubText3': 'Fermentum tristique egestas elit nulla morbi integer rhoncus quis in quam quis purus eu posuere dui scelerisque urna,turpis senectus', 
            'articleSubTitle4': 'İstanbulda ki En İyi 5 Diyaliz Merkezi',
            'articlesSubText4': 'Fermentum tristique egestas elit nulla morbi integer rhoncus quis in quam quis purus eu posuere dui scelerisque urna,turpis senectus', 
            'articleSubTitle5': 'GFR Hesaplama',
            'articlesSubText5': 'Fermentum tristique egestas elit nulla morbi integer rhoncus quis in quam quis purus eu posuere dui scelerisque urna,turpis senectus', 
        
            //    <!--=========DIALYSING FAVORITE POINT=========-->
            'favoriteTitle': 'Favori Tatil Diyalizi Seyahat Noktalarını Keşfedin',
            'favoriteSubTitle1': 'Akdenizin Mavi İncisi ',
            'favoriteSubTitle2': 'Maviye Açılan Yolculuk',
            'favoriteSubTitle3': 'Sahil Boyu Huzur',
            'favoriteSubTitle4': 'Dillere Destan Güzellikler', 
            'favoriteSubTitle5': 'Egenin İncisi ',
            'favoriteSubTitle6': 'Denizin ve Güneşin Tadı',
        
            //    <!--=========DIALYSING SUGGESTION POINT=========-->
            'suggestionTitle': 'Önerilen Diyaliz Merkezleri',
            'suggestion': 'Diyaliz Merkezi',
        
            //    <!--======= PATIENT THREAD =====-->
            'theread1': 'Tatilimizi sağlıklı bir şekilde geçirmemizi sağladıkları için dialysing.com ailesine sonsuz teşekkürler, daima kullanacağımız bir sistem oldu ve bizlerden tam puan aldı. Diyaliz hastalarına tavsiye etmekten asla tereddüt etmeyeceğiz.',
            'theread2': 'Memleketime gelirken diyaliz problemimi nasıl çözeceğimi düşünüyordum ve websitenize denk geldim. Bundan sonra dilediğim zaman aklımda hiç soru işareti kalmadan memleketime gelebileceğim için çok mutluyum, iyi ki böyle bir sistem oluşturmuşsunuz.',
            'thereadTitle': 'Önemli olan sizsiniz ve biz sizler için buradayız.', 
            'thereadText': 'Güvenilir uzman kadromuz ve altyapımız ile diyaliz merkezi ve tatil diyalizi lokasyon aramalarınızda hizmetinizdeyiz.',
            'thereadCustomer': '167 Mutlu Hasta',
        
            //    <!--======= LIKED CENTER =====-->
            'likedTitle': 'Beğenilen Diyaliz Merkezleri',
            'likedText': 'Diyaliz Merkezi', 
        
            //    <!--======= ADD CENTER =====-->
            'addTitle': 'Ücretsiz olarak kliniğinizi sistemimize dahil ederek bizler ile çalışmak ister misiniz?',
            'addText': 'Sizlerde kliniğinizi sistemimize dahil ederek Dialysing.com ailesine katılıp, hastalarınıza direkt hizmet vermeye başlayabilirsiniz.' ,
            'addCenterDialys': 'Diyaliz Merkezinizi Ekleyin',
        
            //    <!--======= GROW =====-->
            'growTitle': 'Güveninizle büyüyoruz!',
            'growText': '40+ ülkede yer alan 10000’nin üzerinde diyaliz merkezi ve kliniğinde, 20+ dilde hizmet alarak kolayca ve güvenli şekilde diyaliz rezervasyonunuzu Dialysing.com ile yapabilirsiniz.',
        
            //    <!--======= NEWSLETTER =====--> 
            'newsletterText': 'Son gelişmelerden ve diyaliz fırsatlarından haberdar olabilmek için mail listemize abone olabilirsiniz.',
        
            //    <!--======= FOOTER =====-->  
            'footerTitle': 'Eleifend eleifend vel lobortis arcu quam mattis sodales turpis ornare at dictumst in',
            'footerText': '2021 Dialysing.com Her hakkı saklıdır.',
              'footerSupport': 'Destek',
              'footerSupport1': 'Kadromuz',
              'footerSupport2': 'Kariyer',
              'footerSupport3': 'Bloglar ',
              'footerSupport4': 'Güvenlik',
              'footerServices': 'Hizmetler ',
              'footerServices1': 'Klinik Yönetimi',
              'footerServices2': 'Haberler',
              'footerServices3': 'Etkinlikler',
              'footerServices4': 'İletişim',
              'footerSecurity': 'Güvenlik ',
              'footerSecurity1': 'Kişisel Sözleşmeler',
              'footerSecurity2': 'Gizlilik Sözleşmeler', 
              'footerSubscription': 'Abonelikler' ,
              'footerSubscription1': 'Son gelişmelerden haberdar olmak için abone olun.',
        
            //    <!--======= REGISTER =====-->
            'activationOne': 'Birinci Adım',
            'activationTwo': 'Aktivasyon',
            'activationThree': 'Zaten üye misiniz?',
            'activationName': 'Adınız Soyadınız',
            'activationDate': 'Doğum Tarihiniz',
            'activationDate': 'Email Adresiniz',
            'activationPhone': 'Telefon Numaranız',
            'activationInformation': 'Evet, lütfen beni Dialysing.com daki seyahat fırsatları, ipuçları ve yeni özellikler hakkında bilgilendirin.',
            'activationInformation2': 'Şartlar ve Koşullar, Gizlilik Politikası ve Kişisel Verilerin İşlenmesine İlişkin Onay okudum ve kabul ediyorum.',
            'nextButton': 'Sonraki Adım',
            'activationFinish': 'Tamamlandı',
            'activationFinishTitle': 'Kayıt İşleminiz Tamamlandı',
            'activationFinishSub': 'Mail adresinize gelen aktivasyon linkine tıklayarak üyeliğinizi tamamladıktan sonra giriş yapabilirsiniz.',
        
            //    <!--======= GFR =====-->
            'gfrTitle': 'GFR Hesaplama',
            'gfrText':'Hesaplama yapılırken serum kreatinini, cinsiyet, yaş ve kilo baz alınır. Yakın zamanda yapılan testlerdeki kreatinin değeri biliniyorsa, hesaplama internet üzerinden de yapılabilir.',
              'gfrCalculation':' GFR Hesap Makinası',
            'gfrAges': 'Yaşınızı Giriniz',
            'gfrWeight': 'Kilonuzu Giriniz',
            'gfrKeratin': 'Son Kreatin Seviyeniz',
            'gfrGender': 'Cinsiyetiniz',
            'gfrWoman': 'Kadın',
            'gfrMan': 'Erkek',
            'gfrResult': 'Hesaplama Sonucunuz',
            'gfrExplanation': 'Hesaplanan gfrniz tahmini olduğundan ve kan kreatinin seviyesinin diğer başka faktörlerden de etkilenebildiğinden GFR ve Böbrek Yetmezliği seviyenizi değerlendirmenizin yapılması için mutlaka doktorunuzla görüşmenizi tavsiye ederiz',
              'gfrSectionTitle':' GFR Normalde Kaçtır? ' ,   
            'gfrContentText':' Yetişkinler için normal GFR 90 ın üzerindedir. Ancak yaşla birlikte GFR, böbrek hastalığı olmayan kişilerde bile azalmaktadır.',
            'gfrAge': 'Yaş (Yıl)',
            'gfrAverage': 'Ortalama GFR',
            'gfrContentText1': 'Tahmini GFRye göre kronik böbrek hastalığının evreleri',
            'gfrNarrow1': 'Evre',
            'gfrNarrow2': 'GFR',
            'gfrWide': 'Böbrek Fonksiyonu',
            'gfrNarrow3': 'Evre 1',
            'gfrNarrow4': '90 ve üzeri',
            'gfrWide1': 'Normal Böbrek Fonksiyonu',
            'gfrNarrow5': 'Evre 2',
            'gfrNarrow6': '60 ila 89',
            'gfrWide2': 'Hafif Böbrek Fonksiyonu',
            'gfrNarrow7': 'Evre 3',
            'gfrNarrow8': '30 ila 59',
            'gfrWide3': 'Orta Derece Böbrek Fonksiyonu',
            'gfrNarrow9': 'Evre 4',
            'gfrNarrow10': ' 15 ila 29',
            'gfrWide4': 'Ciddi Derece Fonksiyonu',
            'gfrNarrow11': 'Evre 5',
            'gfrNarrow12': '15’ten az veya diyaliz',
            'gfrWide5': 'Son Aşama Böbrek Yetmezliği', 
            'gfrContent1': 'KBH nin erken evrelerinde (1-2) hasta asemptomatiktir, kandaki kreatinin düzeyi normaldir (veya normale yakındır) ve kalan nefronlarda adaptif fonksiyon artışı ile sıvı, asit-baz ve elektrolit dengesi korunur. 1. aşamada, GFRnin normal olduğu ancak albüminüri (idrarda anormal bir albümin kaybı) gibi böbrek hasarı belirtileri vardır. KBH nin seyrini yavaşlatmak ve hatta geri döndürmek için tanıyı almak ve tedaviye erken başlamak çok önemlidir.',
            'gfrContent2': 'Böbrek fonksiyonu ve belirtileri açısından evre 1e benzer. Kalan nefronlar hala insan vücudunun homeostazını koruyabildiğinden ve herhangi bir semptom olmayabileceğinden KBH nin ilerlemesini değerlendirmek de önemlidir. Bu aşamada GFR düşüş oranı değerlendirilmelidir. Örneğin, yılda 4 ml/dklık bir oran, KBHnin ilerlemesi geciktirilemiyorsa, hastanın 11 yıl içinde böbrek yetmezliği aşamasına ulaşacağı ve renal replasman tedavisine ihtiyaç duyacağı anlamına gelir.',
            'gfrContent3': 'Böbrek fonksiyonu ve belirtileri açısından evre 1 benzer. Kalan nefronlar hala insan vücudunun homeostazını koruyabildiğinden ve herhangi bir semptom olmayabileceğinden KBH nin ilerlemesini değerlendirmek de önemlidir. Bu aşamada GFR düşüş oranı değerlendirilmelidir. Örneğin, yılda 4 ml/dklık bir oran, KBHnin ilerlemesi geciktirilemiyorsa, hastanın 11 yıl içinde böbrek yetmezliği aşamasına ulaşacağı ve renal replasman tedavisine ihtiyaç duyacağı anlamına gelir.',
            'gfrContent4': 'Evre 3 te, hastalarda genellikle hiçbir semptom görülmez, ancak SCr, eritropoietin, kalsitriol ve paratiroid hormon seviyeleri anormaldir. Bu orta dereceli böbrek yetmezliği aşamasında, insan homeostazı dengesini kaybetmeye başlar, bu nedenle komplikasyonları (hipertansiyon, anemi, olası kemik hastalığı vb.) değerlendirmek ve tedavi etmek çok önemlidir. Aşama 3 yönetiminin en temel özellikleri şunlardır:',
            'gfrContent5': 'Hedef seviye dahilinde kan basıncının sıkı kontrolü: (130 mmhg sistolik ve 80 mmhg diyastolik).',
            'gfrContent6': 'Çoğu hasta, bu hedeflenen kan basıncı seviyesine ulaşmak için ikiden fazla ilaca, en önemlisi bir diüretik ve ayrıca bir kalsiyum kanal blokerine ihtiyaç duyacaktır.',
            'gfrContent7': 'Tüm KBH li diyabet hastaları ve albüminürisi olan hastalar için ACE inhibitörleri tercih edilen antihipertansif ilaçlardır. Büyük araştırmalarda bulunduğu gibi, bu ilaç kategorisi, bu özel hasta gruplarında KBHnin ilerlemesini geciktirebilir.',
            'gfrContent7Text1': 'Şeker hastaları için sıkı glisemik kontrol',
            'gfrContent7Text2': 'Diyet protein kısıtlaması',
            'gfrContent7Text3': 'Sigara bırakma',
            'gfrContent7Text4': 'Lipid düşürücü tedavi',
            'gfrContent8': 'Evre 4 hastalarda anemi, kemik hastalığı, hipertansiyon, kardiyovasküler komplikasyonlar, hipokalsemi, nöropati, yetersiz beslenme, hiperfosfatemi, hiperkalemi, anoreksi ve asidoz gibi semptomlar olabilir. Şiddetli böbrek yetmezliğinin bu aşamasında bir nefroloğa görünmeniz, diyalize başlamanız ve sürece hazırlanmanız önerilir. Diyaliz hakkında bilgi almak için buraya tıklayın.',
            'gfrContent9': 'Evre 5 de böbrekler artık fonksiyon yapmıyor, bu nedenle renal replasman tedavisi, yani hemodiyaliz, periton diyalizi veya böbrek nakli gereklidir. Olası semptomlar kardiyovasküler sorunlar, anoreksiya, bulantı veya kusma, dirençli hiperkalemi vb. dir. Taramanızdan sonra nefroloğunuz ideal ve en etkili tedaviniz hakkında sizinle görüşecektir. Diyaliz süreci hakkında daha fazla bilgi için tıklayın',
            'gfrContent10': 'KBHnin nedeni ne olursa olsun, hastalığın semptomlarının her aşamada benzer olduğunu ve hastalığın ilerlemesini yavaşlatmak için gerekli tüm önlemlerin alınması önemlidir.',
            'gfrContent11': 'Doktorlar, KBH nin herhangi bir aşamasındaki hastalar için ne önerir?',
            'gfrContent12': 'Kan basıncının hedef seviyede sıkı kontrolü: (130 mmhg sistolik ve 80 mmhg diyastolik)',
            'gfrContent12Text1': 'Şeker hastaları için sıkı glisemik kontrol',
            'gfrContent13Text2': 'Sigara bırakma',
            'gfrContent14Text3': 'Düzenli egzersiz',
            'gfrContent15Text4': 'Obezite durumunda kilo kaybı',
            'gfrContent14Text5': 'Bir nefroloğa düzenli ziyaretler',
            'gfrContent15Text6': 'İlaç alımı ve düzenli kan testleri',
            'gfrContent13':  'Glomerüler filtrasyon hızı (GFR), böbreklerin ne kadar iyi performans gösterdiğini değerlendirmek için kullanılan bir testtir. Glomerüllerden, böbrek küçük filtrelerden, ne kadar kan geçtiğini, yani böbreklerin vücuttaki tüm metabolik atık ürünleri filtreleme ve atma yeteneğini ölçer. GFR muhtemelen böbrek fonksiyonunun ve fonksiyonel kütle değerlendirmesinin en iyi göstergesidir. Tahminler, Kronik Böbrek Hastalığının evresini saptamak, ciddiyetini değerlendirmek ve böbrek yetmezliğindeki ilerlemeyi izlemek için kullanılır. Böbrek hastasının böbrek durumunun net bir resmi elde edildiğinde tedavi yöntemlerine karar verilebilir. Böbrek hastalığı ne kadar erken tespit edilirse, ilerlemesini yavaşlatma şansı da o kadar artar.',

        },


        'en':{
            // <!--=========NAVBAR=========-->
            'country': 'Choose Your Country',
            'countr': 'Country',
	        'citySelect': 'Choose Your City',
	        'cities': 'City',
	        'districtSelect': 'Select Your District',
	        'city': 'District',
	        'add': 'Add',
	        'flag': './img/flags/en.png',
	        'addCenter': 'Add Your Center',
	        'register': 'Register',
	        'login': 'Login',
	        'emailAddress': 'Email Address',
	        'password': 'Enter Your Password',
	        'rememberMe': 'Remember me',
	        'passwordFind': 'I forgot my password',
	        'accountInformation': 'Together with your account, the Terms and Conditions and Privacy Policy & Processing of Personal Data are given consent.',

            // <!--=========BANNER=========-->
            'centerFindSearch':'Find the dialysis center you are looking for',
            'centerEasy': 'The fastest and easiest way to find a dialysis center',
            'centerFind': 'Find Dialysis',
            'cash': 'No reservation fee',
            'creditCard': 'No credit card',
            'cancelEasy': 'Reservation cancellation facility',

            // <!--=========DIALYSING CENTER EXPLORE=========-->
            'exploreTitle': 'Discover Dialysis Centers',
            'allView': 'View All',
            'dialysCenter': 'Dialysis Center',
            // <!--========= LAST SEARCH =========-->
	        'lastSearch1': 'Between January 25-February 10',
            // <!--=========DIALYSING ARTICLE=========-->
            'articleTitle': 'Get Inspiration for Your Dialysis Treatment',
            'allViewArticle': 'View All Articles',
            'articleSubTitle1': 'What is Dialysis?', 
            'articlesSubText1': 'Fermentum tristique egestas elit nulla morbi integer rhoncus quis in quam quis purus eu posuere dui scelerisque urna,turpis senectus ',
            'articleSubTitle2': 'Nutrition in Dialysis',
            'articlesSubText2': 'Fermentum tristique egestas elit nulla morbi integer rhoncus quis in quam quis purus eu posuere dui scelerisque urna,turpis senectus', 
            'articleSubTitle3': 'Kidney Transplant',
            'articlesSubText3': 'Fermentum tristique egestas elit nulla morbi integer rhoncus quis in quam quis purus eu posuere dui scelerisque urna,turpis senectus', 
            'articleSubTitle4': 'Top 5 Dialysis Centers in Istanbul',
            'articlesSubText4': 'Fermentum tristique egestas elit nulla morbi integer rhoncus quis in quam quis purus eu posuere dui scelerisque urna,turpis senectus', 
            'articleSubTitle5': 'GFR Calculation',
            'articlesSubText5': 'Fermentum tristique egestas elit nulla morbi integer rhoncus quis in quam quis purus eu posuere dui scelerisque urna,turpis senectus', 
        
            //    <!--=========DIALYSING FAVORITE POINT=========-->
            'favoriteTitle': 'Discover Favorite Vacation Dialysis Travel Destinations',
            'favoriteSubTitle1': 'The Blue Pearl of the Mediterranean',
            'favoriteSubTitle2': 'Journey to the Blue',
            'favoriteSubTitle3': 'Peace Along the Beach',
            'favoriteSubTitle4': 'Legendary Beauties', 
            'favoriteSubTitle5': 'The pearl of Ege',
            'favoriteSubTitle6': 'The Taste of the Sea and the Sun',
        
            //    <!--=========DIALYSING SUGGESTION POINT=========-->
            'suggestionTitle': 'Recommended Dialysis Centers',
            'suggestion': 'Dialysis Center',

            //    <!--======= PATIENT THREAD =====-->
            'theread1': 'Endless thanks to the dialysing.com family for helping us spend our holiday in a healthy way, it has always been a system we will use and it got full points from us. We will never hesitate to recommend it to dialysis patients.',
            'theread2': 'While coming to my hometown, I was thinking about how to solve my dialysis problem and I came across your website. I am very happy that I can come to my hometown whenever I want from now on without any question marks in my mind, I am glad that you have created such a system.',
            'thereadTitle': 'What matters is you and we are here for you.', 
            'thereadText': 'With our reliable expert staff and infrastructure, we are at your service for your dialysis center and holiday dialysis location searches.',
            'thereadCustomer': '167 Happy Patients',
                    
            //    <!--======= LIKED CENTER =====-->
             'likedTitle': 'Liked Dialysis Centers',
             'likedText': 'Dialysis Center', 
                    
             //    <!--======= ADD CENTER =====-->
             'addTitle': 'Would you like to work with us by including your clinic in our system for free?',
             'addText': 'By including your clinic in our system, you can join the Dialysing.com family and start serving your patients directly.' ,
             'addCenterDialys': 'Add Your Dialysis Center',
                    
            //    <!--======= GROW =====-->
            'growTitle': 'We are growing with your trust!',
            'growText': 'You can easily and securely make your dialysis reservation with Dialysing.com by getting service in 20+ languages ​​in over 10000 dialysis centers and clinics in 40+ countries.',
                    
              //    <!--======= NEWSLETTER =====--> 
              'newsletterText': 'You can subscribe to our mailing list to be informed about the latest developments and dialysis opportunities.',
                    
              //    <!--======= FOOTER =====-->  
              'footerTitle': 'Eleifend eleifend vel lobortis arcu quam mattis sodales turpis ornare at dictumst in',
              'footerText': '2021 Dialysing.com All rights reserved.',
              'footerSupport': 'Support',
              'footerSupport1': 'Our Staff',
              'footerSupport2': 'Career',
              'footerSupport3': 'Blogs',
              'footerSupport4': 'Security',
              'footerServices': 'Services',
              'footerServices1': 'Clinic Management',
              'footerServices2': 'News',
              'footerServices3': 'Events',
              'footerServices4': 'Contact',
              'footerSecurity': 'Security',
              'footerSecurity1': 'Personal Contracts',
              'footerSecurity2': 'Confidentiality Agreements', 
              'footerSubscription': 'Subscriptions' ,
              'footerSubscription1': 'Subscribe to be informed about the latest developments.',
                    
                        //    <!--======= REGISTER =====-->
                        'activationOne': 'Step One',
                        'activationTwo': 'Activation',
                        'activationThree': 'Already a member?',
                        'activationName': 'Your name and Your surname',
                        'activationDate': 'Birthday',
                        'activationDate': 'Email Address',
                        'activationPhone': 'Phone Number',
                        'activationInformation': 'Yes, please keep me informed about travel deals, tips and new features on Dialysing.com.',
                        'activationInformation2': 'I have read and accept the Terms and Conditions, Privacy Policy and Consent to the Processing of Personal Data.',
                        'nextButton': 'Next step',
                        'activationFinish': 'Completed',
                        'activationFinishTitle': 'Your Registration is Completed',
                        'activationFinishSub': 'You can log in after completing your membership by clicking the activation link sent to your e-mail address.',
                    
                        //    <!--======= GFR =====-->
                        'gfrTitle': 'GFR Calculation',
                        'gfrText':'The calculation is based on serum creatinine, gender, age and weight. If the creatinine value in recent tests is known, the calculation can also be done online.',
                          'gfrCalculation': 'GFR Calculator',
                        'gfrAges': 'Enter your age',
                        'gfrWeight': 'Enter Your Weight',
                        'gfrKeratin': 'Your Final Creatine Level',
                        'gfrGender': 'Your gender',
                        'gfrWoman': 'Woman',
                        'gfrMan': 'Man',
                        'gfrResult': 'Your Calculation Result',
                        'gfrExplanation': 'Since your calculated gf is an estimate and the blood creatinine level can be affected by other factors, we strongly recommend that you consult your doctor to have your GFR and Kidney Failure level evaluated.',
                        'gfrSectionTitle': 'What is the GFR Normally?' ,   
                        'gfrContentText': 'Normal GFR for adults is above 90. But with age, GFR decreases even in people without kidney disease.',
                        'gfrAge': 'Age (Year)',
                        'gfrAverage': 'Average GFR',
                        'gfrContentText1': 'Stages of chronic kidney disease based on estimated GFR',
                        'gfrNarrow1': 'Phase',
                        'gfrNarrow2': 'GFR',
                        'gfrWide': 'Kidney Function',
                        'gfrNarrow3': 'Phase 1',
                        'gfrNarrow4': '90 and above',
                        'gfrWide1': 'Normal Kidney Function',
                        'gfrNarrow5': 'Phase 2',
                        'gfrNarrow6': '60 to 89',
                        'gfrWide2': 'Mild Kidney Function',
                        'gfrNarrow7': 'Phase 3',
                        'gfrNarrow8': '30 to 59',
                        'gfrWide3': 'Moderate Kidney Function',
                        'gfrNarrow9': 'Phase 4',
                        'gfrNarrow10': ' 15 to 29',
                        'gfrWide4': 'Severe Degree Function',
                        'gfrNarrow11': 'Phase 5',
                        'gfrNarrow12': 'Less than 15 or dialysis',
                        'gfrWide5': 'End Stage Kidney Failure', 
                        'gfrContent1': 'In the early stages of CKD (1-2) the patient is asymptomatic, the blood creatinine level is normal (or close to normal), and the fluid, acid-base and electrolyte balance is maintained with increased adaptive function in the remaining nephrons. In stage 1, the GFR is normal but there are signs of kidney damage such as albuminuria (an abnormal loss of albumin in the urine). It is very important to get the diagnosis and start treatment early in order to slow the course of CKD and even reverse it.',
                        'gfrContent2': 'It is similar to stage 1 in terms of kidney function and symptoms. It is also important to assess the progression of CKD as the remaining nephrons can still maintain the homeostasis of the human body and there may be no symptoms. At this stage, the rate of GFR decline should be evaluated. For example, a rate of 4 ml/min per year means that if the progression of CKD cannot be delayed, the patient will reach the stage of kidney failure within 11 years and will need renal replacement therapy.',
                        'gfrContent3': 'It is similar to stage 1 in terms of kidney function and symptoms. It is also important to assess the progression of CKD as the remaining nephrons can still maintain the homeostasis of the human body and there may be no symptoms. At this stage, the rate of GFR decline should be evaluated. For example, a rate of 4 ml/min per year means that if the progression of CKD cannot be delayed, the patient will reach the stage of kidney failure within 11 years and will need renal replacement therapy.',
                        'gfrContent4': 'In stage 3, patients usually have no symptoms, but have abnormal levels of SCr, erythropoietin, calcitriol, and parathyroid hormone. At this stage of moderate renal failure, human homeostasis begins to lose its balance, so it is very important to evaluate and treat complications (hypertension, anemia, possible bone disease, etc.). The most basic features of stage 3 management are:',
                        'gfrContent5': 'Tight control of blood pressure within target level: (130 mmHg systolic and 80 mmHg diastolic).',
                        'gfrContent6': 'Most patients will need more than two medications to achieve this target blood pressure level, most notably a diuretic as well as a calcium channel blocker.',
                        'gfrContent7': 'ACE inhibitors are the antihypertensive drugs of choice for all diabetics with CKD and patients with albuminuria. As has been found in large studies, this category of drugs may delay the progression of CKD in these particular patient groups.',
                        'gfrContent7Text1': 'Tight glycemic control for diabetics',
                        'gfrContent7Text2': 'Dietary protein restriction',
                        'gfrContent7Text3': 'Quit smoking ',
                        'gfrContent7Text4': 'Lipid-lowering therapy',
                        'gfrContent8': 'Stage 4 patients may have symptoms such as anemia, bone disease, hypertension, cardiovascular complications, hypocalcemia, neuropathy, malnutrition, hyperphosphatemia, hyperkalemia, anorexia, and acidosis. At this stage of severe kidney failure, it is recommended that you see a nephrologist, start dialysis and prepare for the process. Click here to learn about dialysis.',
                        'gfrContent9': 'In stage 5, the kidneys are no longer functioning, so renal replacement therapy, ie hemodialysis, peritoneal dialysis, or kidney transplant is required. Possible symptoms are cardiovascular problems, anorexia, nausea or vomiting, resistant hyperkalemia, etc. is After your scan, your nephrologist will discuss with you your ideal and most effective treatment. Click for more information about the dialysis process',
                        'gfrContent10': 'Whatever the cause of CKD, it is important that the symptoms of the disease are similar at all stages and that all necessary precautions are taken to slow the progression of the disease.',
                        'gfrContent11': 'What do doctors recommend for patients at any stage of CKD?',
                        'gfrContent12': 'Tight control of blood pressure at target level: (130 mmHg systolic and 80 mmHg diastolic)',
                        'gfrContent12Text1': 'Tight glycemic control for diabetics',
                        'gfrContent13Text2': 'Quit smoking',
                        'gfrContent14Text3': 'Regular exercise',
                        'gfrContent15Text4': 'Weight loss in case of obesity',
                        'gfrContent14Text5': 'Regular visits to a nephrologist',
                        'gfrContent15Text6': 'Medication intake and regular blood tests',
                        'gfrContent13':  'Glomerular filtration rate (GFR) is a test used to evaluate how well the kidneys are performing. It measures how much blood passes through the glomeruli, kidney tiny filters, that is, the kidneys ability to filter and remove all metabolic waste products from the body. GFR is probably the best indicator of kidney function and functional mass assessment. Estimates are used to stage Chronic Kidney Disease, assess its severity, and monitor the progression of kidney failure. Once a clear picture of the kidney condition of the kidney patient is obtained, treatment modalities can be decided. The earlier kidney disease is detected, the greater the chance of slowing its progression.',
        },
        
        
    };


    
$('.dropdown-item').click(function() {
    localStorage.setItem('dil', JSON.stringify($(this).attr('id'))); 
    location.reload();
  });

    var lang =JSON.parse(localStorage.getItem('dil'));

    if(lang=='en'){
        $('#drop_yazı').html('English');
    }
    else{
        $('#drop_yazı').html('Türkçe');

    }

    $('a,h5,p,h1,h2,span,li,button,h3,label,div, h4, h6, img, option, placeholder, input').each(function(index,element) {
      $(this).text(arrLang[lang][$(this).attr('key')]);
    
  });

});
   