<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=social.displayInfo; section>
    <#if section = "title">
        ${msg("loginTitle",(realm.displayName!''))}
    <#elseif section = "header">
        ${msg("loginTitleHtml",(realm.displayNameHtml!''))?no_esc}
    <#elseif section = "form">
        <h3 class="sub-login-text">${msg("subLoginTitle")}</h3>
        <#if realm.password>
            <form id="kc-form-login" class="${properties.kcFormClass!}" action="${url.loginAction}" method="post">
                <div class="${properties.kcFormGroupClass!}">
                    <#if usernameEditDisabled??>
                        <div class="textfield-outlined">
                            <input
                                class="${properties.kcInputClass!} username-login"
                                id="username"
                                name="username"
                                type="text"
                                placeholder=""
                                disabled
                                value=${(login.username!'')}
                            />
                            <label htmlFor="username">Username</label>
                        </div>
                    <#else>
                        <div class="textfield-outlined">
                            <input
                                class="${properties.kcInputClass!} username-login"
                                id="username"
                                name="username"
                                type="text"
                                placeholder=""
                                autofocus
                                autocomplete="off"
                                value="${(login.username!'')}"
                            />
                            <label htmlFor="username">${msg("username")}</label>
                        </div>
                    </#if>
                </div>

                <div class="${properties.kcFormGroupClass!}">
                    <div class="textfield-outlined">
                        <input
                            class="${properties.kcInputClass!} password-login"
                            id="password"
                            name="password"
                            type="password"
                            placeholder=""
                            autocomplete="off"
                            value=""
                        />
                        <label htmlFor="password">${msg("password")}</label>
                    </div>
                </div>


                    <div id="kc-form-options" class="${properties.kcFormOptionsClass!} remember-me-block">
                        <#if realm.rememberMe && !usernameEditDisabled??>
                            <div class="checkbox ${properties.kcFormGroupClass}">
                                <div class="multiple-choice">
                                    <#if login.rememberMe??>
                                        <input id="rememberMe" name="rememberMe" type="checkbox" tabindex="3" checked>
                                        <label for="rememberMe" class="remember-me-label">${msg("rememberMe")}</label>
                                    <#else>
                                        <input id="rememberMe" name="rememberMe" type="checkbox" tabindex="3">
                                        <label for="rememberMe" class="remember-me-label">${msg("rememberMe")}</label>
                                    </#if>
                                </div>
                            </div>
                        </#if>
                    </div>

                    <div id="forgot-block" class="${properties.kcFormOptionsWrapperClass!} ${properties.kcFormGroupClass}">
                            <#if realm.resetPasswordAllowed>
                                <p id="forgot-text"><a id="forgot-link" href="${url.loginResetCredentialsUrl}">${msg("doForgotPassword")}</a></p>
                            </#if>
                    </div>

                    <div id="kc-form-buttons" class="${properties.kcFormButtonsClass!} ${properties.kcFormGroupClass}">
                        <div class="${properties.kcFormButtonsWrapperClass!}">
                            <input class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonLargeClass!}" name="login" id="kc-login" class="login-button" type="submit" value="${msg("doLogIn")}"/>
                        </div>
                    </div>

                    <#if realm.password && social.providers??>
                        <div id="kc-social-providers">
                            <div class="or-line">
                                <span class="or-line-span">${msg("or")}</span>
                            </div>
                            <ul class="list">
                                <#list social.providers as p>
                                    <li><a href="${p.loginUrl}" id="social-${p.alias}" class="button social ${p.providerId}">${msg("continueWith")} ${p.displayName}</a></li>
                                </#list>
                            </ul>
                        </div>
                    </#if>

                    <#if realm.password && realm.registrationAllowed && !usernameEditDisabled??>
                        <div id="kc-registration">
                            <p id="register-text">${msg("noAccount")}</p>
                            <a id="register-button" href="${url.registrationUrl}">${msg("registerLink")}</a>
                        </div>
                    </#if>
            </form>
        </#if>
    </#if>
</@layout.registrationLayout>
