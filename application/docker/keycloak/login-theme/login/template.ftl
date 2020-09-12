<#macro registrationLayout bodyClass="" displayInfo=false displayMessage=true>
<!DOCTYPE html>

<#-- Attempt to reverse-engineer code for page’s current language, as Keycloak does not currently make this available -->
<#assign LANG_CODE = "en">
<#if .locale??>
    <#assign LANG_CODE = .locale>
</#if>
<#if locale??>
    <#list locale.supported>
        <#items as supportedLocale>
            <#if supportedLocale.label == locale.current>
                <#if supportedLocale.url?contains("?kc_locale=")>
                    <#assign LANG_CODE = supportedLocale.url?keep_after("?kc_locale=")[0..1]>
                </#if>
                <#if supportedLocale.url?contains("&kc_locale=")>
                    <#assign LANG_CODE = supportedLocale.url?keep_after("&kc_locale=")[0..1]>
                </#if>
            </#if>
        </#items>
    </#list>
</#if>

<!--[if lt IE 9]><html class="lte-ie8 ${properties.kcHtmlClass!}" lang="${LANG_CODE}"><![endif]-->
<!--[if gt IE 8]><!--><html class="${properties.kcHtmlClass!}" lang="${LANG_CODE}"><!--<![endif]-->

<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="robots" content="noindex, nofollow">

    <#if properties.meta?has_content>
        <#list properties.meta?split(' ') as meta>
            <meta name="${meta?split('==')[0]}" content="${meta?split('==')[1]}"/>
        </#list>
    </#if>
    <title><#nested "title"> - ${realm.displayName!'INPEAK Trainer'}</title>

    <link rel="icon" type="image/png" sizes="32x32" href="${url.resourcesPath}/images/favicon/favicon-32x32.png">

    <meta name="msapplication-TileColor" content="#093436">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link href="${url.resourcesPath}/css/style.css" rel="stylesheet" type="text/css" />

    <#if properties.styles?has_content>
        <#list properties.styles?split(' ') as style>
            <link href="${url.resourcesPath}/${style}" rel="stylesheet" />
        </#list>
    </#if>
    <#if properties.scripts?has_content>
        <#list properties.scripts?split(' ') as script>
            <script src="${url.resourcesPath}/${script}" type="text/javascript"></script>
        </#list>
    </#if>
    <#if scripts??>
        <#list scripts as script>
            <script src="${script}" type="text/javascript"></script>
        </#list>
    </#if>

    <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
</head>

<body class="${properties.kcBodyClass!}">
    <script>document.body.className = ((document.body.className) ? document.body.className + ' js-enabled' : 'js-enabled');</script>

    <main id="content" role="main">

        <div class="grid-row">
            <div class="column-one-third">
                <div class="top-header">
                    <a href="#"><img src="${url.resourcesPath}/images/logos/inpeak-logo.svg" id="main-page-logo" alt="main-page-logo" /></a>
                    <#if realm.internationalizationEnabled>
                        <div id="kc-locale" class="${properties.kcLocaleClass!}">
                            <div id="kc-locale-wrapper" class="${properties.kcLocaleWrapperClass!}">
                                <div class="kc-dropdown" id="kc-locale-dropdown">
                                    <a href="#" id="kc-current-locale-link">${locale.current}</a>
                                    <ul class="locale-list">
                                        <#list locale.supported as l>
                                            <li class="kc-dropdown-item"><a href="${l.url}">${l.label}</a></li>
                                        </#list>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </#if>
                </div>

                <div><#nested "back"></div>

                <h2 class="heading-large"><#nested "title"></h2>

                <div id="kc-content" class="${properties.kcContentClass!}">
                    <div id="kc-content-wrapper" class="${properties.kcContentWrapperClass!}">

                        <#if displayMessage && message?has_content>
                            <#if message.type = 'error'>
                                <div class="error-summary" role="group" aria-labelledby="error-summary-heading-example-1" tabindex="-1">
                                    <h1 class="heading-medium error-summary-heading" id="error-summary-heading-example-1">
                                        ${msg("thereIsProblem")}
                                    </h1>

                                    <ul class="error-summary-list" id="error-details">
                                        <li>${message.summary}</li>
                                    </ul>
                                </div>
                            <#else>
                                <div class="${properties.kcFeedbackAreaClass!}">
                                    <div class="alert alert-${message.type}"><p>
                                        <#if message.type = 'success'><span class="${properties.kcFeedbackSuccessIcon!}"></span></#if>
                                        <#if message.type = 'warning'><span class="${properties.kcFeedbackWarningIcon!}"></span></#if>
                                        <#if message.type = 'info'><span class="${properties.kcFeedbackInfoIcon!}"></span></#if>
                                        <span class="kc-feedback-text">${message.summary}</span></p>
                                    </div>
                                </div>
                            </#if>
                        </#if>

                        <div id="kc-form" class="${properties.kcFormAreaClass!}">
                            <div id="kc-form-wrapper" class="${properties.kcFormAreaWrapperClass!}">
                                <#nested "form">
                            </div>
                        </div>
                    </div>
                </div>


                <footer id="footer" role="contentinfo">
                    &copy; 2020 INPEAK Trainer
                </footer>
            </div>

            <div class="column-two-thirds">
                <div class="slideshow-container">
                    <div class="mySlides fade">
                        <img src="${url.resourcesPath}/images/app/app-1.png" alt="app-1">
                        <div class="text">
                            <p class="title">Moduł kalendarza</p>
                            <p class="subtitle">
                                Aplikacja zawiera kalendarz, dzieki ktoremu jestes na biezaco ze wszystkimi treningami i nie opuscisz ani jednego i zostaniesz w formie dzięki naszym trenerom!
                            </p>
                        </div>
                    </div>

                    <div class="mySlides fade">
                        <img src="${url.resourcesPath}/images/app/app-2.png" alt="app-2">
                        <div class="text">
                            <p class="title">Moduł kalendarza</p>
                            <p class="subtitle">
                                Aplikacja zawiera kalendarz, dzieki ktoremu jestes na biezaco ze wszystkimi treningami i nie opuscisz ani jednego i zostaniesz w formie dzięki naszym trenerom!
                            </p>
                        </div>
                    </div>

                    <div class="mySlides fade">
                        <img src="${url.resourcesPath}/images/app/app-3.png" alt="app-3">
                        <div class="text">
                            <p class="title">Moduł kalendarza</p>
                            <p class="subtitle">
                                Aplikacja zawiera kalendarz, dzieki ktoremu jestes na biezaco ze wszystkimi treningami i nie opuscisz ani jednego i zostaniesz w formie dzięki naszym trenerom!
                            </p>
                        </div>
                    </div>

                    <!-- The dots/circles -->
                    <div style="text-align:center">
                        <span class="dot" onclick="currentSlide(1)"></span>
                        <span class="dot" onclick="currentSlide(2)"></span>
                        <span class="dot" onclick="currentSlide(3)"></span>
                    </div>
                </div>
                <br>



                <div id="kc-container" class="${properties.kcContainerClass!}">
                    <div id="kc-container-wrapper" class="${properties.kcContainerWrapperClass!}">
                        <#-- <div id="kc-header" class="${properties.kcHeaderClass!}">
                            <div id="kc-header-wrapper" class="${properties.kcHeaderWrapperClass!}"><#nested "header"></div>
                        </div>-->
                    </div>
                </div>
            </div>
        </div>
    </main>

    <div id="global-app-error" class="app-error hidden"></div>

    <script src="${url.resourcesPath}/javascript/govuk-template.js?0.22.1"></script>
    <script src="${url.resourcesPath}/javascript/slider.js"></script>
    <script>if (typeof window.GOVUK === 'undefined') document.body.className = document.body.className.replace('js-enabled', '');</script>
</body>
</html>
</#macro>
