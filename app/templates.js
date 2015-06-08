/*jshint multistr: true */
define(function (require, exports, module) {
  "use strict";
  return {
    messenger: ' \
      <div class="header-top-line"> \
        <a href="#?" class="add-person"></a> \
        <a href="#?" class="close"></a> \
        <div class="add-person-box"> \
          <form action=""> \
            <div class="field-wrap"> \
              <input type="text" value=""> \
            </div> \
            <div class="scroll-box"></div> \
            <div class="submit-wrap"> \
              <input type="submit" value="Добавить в группу"> \
            </div> \
          </form> \
        </div> \
      </div> \
      <div class="wrap-content"> \
        <div class="list-contacts"> \
          <div class="person"></div> \
          <div class="search"> \
            <input type="text" class="filter-text" value=""> \
            <input type="reset" class="filter-reset" value=""> \
            <input type="submit" class="filter-submit" value=""> \
          </div> \
          <div class="list-friends"> \
            <ul> \
            </ul> \
            <div> \
              <a href="#" class="btn-search">Поиск в Evorch</a> \
            </div> \
          </div> \
          <div class="list-friends list-similar-contants"> \
            <ul> \
            </ul> \
          </div> \
        </div> \
        <div class="dialog-wrap"> \
        </div> \
      </div>',
    dialog: ' \
      <div class="active-person"></div> \
      <div class="content"> \
        <div class="dialog"> \
        </div> \
        <div class="request-to-add"> \
          <form action=""> \
            <span class="title">Пользователь Алина Полина  не включен в ваш список контактов.</span> \
            <a href="" class="btn">Добавить в список контактов</a> \
            <div class="textarea-box"> \
              <textarea maxlength="120">Здравствуйте, Алина Полина. Я хочу внести Вас в свой список контактов в Evorch.</textarea> \
              <input type="submit" value="Добавить"> \
            </div> \
          </form> \
        </div> \
        <div class="field-input-text"> \
          <textarea class="input"></textarea> \
          <a href="" class="add-photo"></a> \
          <a href="" class="add-smile"></a> \
          <input class="send" type="submit" value="" title="Отправить"> \
        </div> \
      </div>',
    person: ' \
      <a href=""><img src="<%= avatar %>" alt=""></a> \
      <div class="wrap"> \
      <a href="" class="name"><%= name %></a> \
        <div class="select-status-box"> \
          <select name="select-status" id="select-status" class="select-status"> \
            <option value="online" title="../app/images/mess_status_online.png">В сети</option> \
            <option value="do_not_disturb" title="../app/images/mess_status_do_not_disturb.png">Не беспокоить</option> \
            <option value="away" selected="selected" title="../app/images/mess_status_away.png">Нет на месте</option> \
            <option value="offline" title="../app/images/mess_status_offline.png">Невидимый</option> \
          </select> \
        </div> \
      </div>',
    active_person: ' \
      <a href="" class="link-img"><img src="<%= avatar %>" alt=""></a> \
      <div class="person"> \
        <a href="" class="name"><%= name %></a> \
        <span class="status status_online"></span> \
        <span class="geo">Санкт-Петербург, Россия</span> \
      </div>',
    user: ' \
      <li> \
        <a href="#"> \
          <div class="wrap-img"> \
            <img src="<%= avatar %>" alt="<%= name %>"> \
            <span class="icon-status icon-status_do_not_disturb"></span> \
          </div> \
          <span class="name"><%= name %></span> \
        </a> \
      </li>',
    message_contact: ' \
      <div class="img"> \
        <img src="<%= avatar %>" alt=""> \
      </div> \
      <div class="message"> \
        <p><%= text %></p> \
        <span class="date"><%= time %></span> \
      </div>',
    message_user: ' \
      <div class="message"> \
        <p><%= text %></p> \
        <span class="date"><%= time %></span> \
      </div>'
  };
});
