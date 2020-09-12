<#import "template.ftl" as layout>
<@layout.registrationLayout; section>
    <#if section = "title">
        ${msg("registerWithTitle",(realm.displayName!''))}
    <#elseif section = "header">
        ${msg("registerWithTitleHtml",(realm.displayNameHtml!''))?no_esc}
    <#elseif section = "back">
        <a class="link-back" href="${url.loginUrl}">${msg("backToLogin")}</a>
    <#elseif section = "form">
        <form id="kc-register-form" class="${properties.kcFormClass!}" action="${url.registrationAction}" method="post">
          <input type="text" readonly value="this is not a login form" style="display: none;">
          <input type="password" readonly value="this is not a login form" style="display: none;">

          <div class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('firstName',properties.kcFormGroupErrorClass!)}" style="display:none">
            <div class="${properties.kcLabelWrapperClass!}">
                <label for="firstName" class="${properties.kcLabelClass!}">${msg("firstName")}</label>
            </div>
            <div class="${properties.kcInputWrapperClass!}">
                <input type="text" id="firstName" class="${properties.kcInputClass!}" name="firstName" value="temp_first_name"/>
            </div>
          </div>

          <div class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('lastName',properties.kcFormGroupErrorClass!)}" style="display:none">
            <div class="${properties.kcLabelWrapperClass!}">
                <label for="lastName" class="${properties.kcLabelClass!}">${msg("lastName")}</label>
            </div>
            <div class="${properties.kcInputWrapperClass!}">
                <input type="text" id="lastName" class="${properties.kcInputClass!}" name="lastName" value="temp_last_name"/>
            </div>
          </div>

          <#if !realm.registrationEmailAsUsername>
            <div class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('username',properties.kcFormGroupErrorClass!)}">
                <div class="textfield-outlined">
                    <input
                        class="${properties.kcInputClass!}"
                        id="username"
                        name="username"
                        type="text"
                        placeholder=""
                        value="${(register.formData.username!'')}"
                        autofocus
                    />
                    <label htmlFor="username">${msg("createUsername")}</label>
                </div>
            </div>
          </#if>

            <div class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('email',properties.kcFormGroupErrorClass!)}">
                <div class="textfield-outlined">
                    <input
                        class="${properties.kcInputClass!}"
                        id="email"
                        name="email"
                        type="text"
                        placeholder=""
                        value="${(register.formData.email!'')}"
                    />
                    <label htmlFor="username">${msg("email")}</label>
                </div>
            </div>

            <#if passwordRequired>
            <div class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('password',properties.kcFormGroupErrorClass!)}">
                <div class="textfield-outlined">
                    <input
                        class="${properties.kcInputClass!}"
                        id="password"
                        name="password"
                        type="password"
                        placeholder=""
                        value=""
                    />
                    <label htmlFor="username">${msg("createPassword")}</label>
                </div>
            </div>

            <div class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('password-confirm',properties.kcFormGroupErrorClass!)}">
                <div class="textfield-outlined">
                    <input
                        class="${properties.kcInputClass!}"
                        id="password-confirm"
                        name="password-confirm"
                        type="password"
                        placeholder=""
                        value=""
                    />
                    <label htmlFor="username">${msg("passwordConfirm")}</label>
                </div>
            </div>
            </#if>

            <#if recaptchaRequired??>
            <div class="form-group">
                <div class="${properties.kcInputWrapperClass!}">
                    <div class="g-recaptcha" data-size="compact" data-sitekey="${recaptchaSiteKey}"></div>
                </div>
            </div>
            </#if>

            <div class="${properties.kcFormGroupClass!}">
                <div id="kc-form-buttons" class="${properties.kcFormButtonsClass!}">
                    <input class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonLargeClass!}" type="submit" value="${msg("doRegister")}"/>
                </div>
            </div>
        </form>
    </#if>
</@layout.registrationLayout>
