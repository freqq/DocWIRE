<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=true; section>
    <#if section = "title">
        ${msg("emailForgotTitle")}
    <#elseif section = "header">
        ${msg("emailForgotTitle")}
    <#elseif section = "back">
        <a class="link-back" href="${url.loginUrl}">${msg("backToLogin")}</a>
    <#elseif section = "form">
        <p class="email-instruction">${msg("emailInstruction")}</p>

        <form id="kc-reset-password-form" class="${properties.kcFormClass!}" action="${url.loginAction}" method="post">
            <div class="${properties.kcFormGroupClass!}">
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
                    <label htmlFor="username"><#if !realm.loginWithEmailAllowed>${msg("username")}<#elseif !realm.registrationEmailAsUsername>${msg("usernameOrEmail")}<#else>${msg("email")}</#if></label>
                </div>
            </div>

            <div class="${properties.kcFormGroupClass!}">
                <div id="kc-form-buttons" class="${properties.kcFormButtonsClass!}">
                    <input class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonLargeClass!}" class="send-email-button" type="submit" value="${msg("doResetPassword")}"/>
                </div>
            </div>
        </form>
    </#if>
</@layout.registrationLayout>
