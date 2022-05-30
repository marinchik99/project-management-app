import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    detection: {
      order: ['queryString', 'cookie'],
      caches: ['cookie'],
    },
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          header: {
            boardsBtn: 'Boards',
            createBoardBtn: 'Create new board',
            loginBtn: 'Log in',
            signupBtn: 'Sign up',
            logoutBtn: 'Logout',
          },

          loginPage: {
            title: 'Log in to your account',
            loginLabel: 'Enter your username',
            loginErrLength: 'The minimum login length is 3 characters',
            loginErrSymbols: 'The login can contain only Latin letters and numbers',
            passwordLabel: 'Enter your password',
            passwordErrLength: 'The minimum login length is 4 characters',
            fieldErrRequired: 'Fill in the field',
            loginBtn: 'Log in',
            signupLink: 'Sign up',
            alert: 'Invalid username or password!',
          },

          signupPage: {
            title: 'Log in',
            nameLabel: 'Enter tour name',
            nameErrLength: 'The minimum name length is 2 characters',
            nameErrSymbols: 'The name can contain only Latin letters',
            loginLabel: 'Enter your username',
            loginErrLength: 'The minimum login length is 3 characters',
            loginErrSymbols: 'The login can contain only Latin letters and numbers',
            passwordLabel: 'Enter your password',
            passwordErrLength: 'The minimum login length is 4 characters',
            fieldErrRequired: 'Fill in the field',
            agreePolicy: 'I agree with the security policy',
            signupBtn: 'Sign up',
            loginLink: 'Already have an account? Log in',
            alert: 'An account with this username already exists.',
          },

          welcomePage: {
            generalDesript:
              'Helps to organize work effectively. Create and track tasks, also manage them and share an information with team members.',
            aboutProjectPart1:
              'Start by creating boards in which you will place lists and task cards. They can be arranged in the order you need',
            aboutProjectPart2:
              'Cards can be moved to another list, edited and deleted. Deleting a board automatically deletes the lists and cards linked to it.',
            aboutProjectBtn: 'Start',
            aboutCourseTitle: 'About course',
            aboutCourseDescription:
              'React conuse is designed for  RS School students who have passed RS School stage #2, as well as for those who have knowledge and practical experience in using the following technologies and tools:',
            aboutTeamTitle: 'About developers',
            aboutTeam: {
              marina: {
                name: 'Marina',
                done: 'App structure, Routing, Welcome page, Board page, Columns on the Board page.',
              },
              petr: {
                name: 'Petr',
                done: 'Boards page, Header, Localisation.',
              },
              sergey: {
                name: 'Sergey',
                done: 'Authorization, Tasks.',
              },
            },
          },

          boardsPage: {
            title: 'Boards',
            addNewBoardBtn: 'Add new board',
          },

          boardPage: {
            addColumnBtn: 'Add new column',
            column: {
              editTitleSubmit: 'Submit',
              editTitleCancel: 'Cansel',
              addTaskBtn: 'Add Task',
            },
          },

          createBoardModal: {
            title: 'Create board',
            titleLabel: 'Board title',
            titleInputError: '*This field is mandatory',
            descriptionLabel: 'Board description',
          },

          createColumnModal: {
            title: 'Create column',
            titleLabel: 'Column title',
            titleInputError: '*This field is mandatory',
          },

          createTaskModal: {
            title: 'Create task',
            titleLabel: 'Task title',
            titleInputError: '*Fill this field',
            descriptionLabel: 'Task description',
          },

          editProfile: {
            title: 'Edit profile',
            namePlaceholder: 'User name',
            inputNameError:
              'The minimum username length is 2 characters and can contain only Latin letters',
            loginPlaceholder: 'Login',
            inputLoginError:
              'The minimum login length is 3 characters and can contain only Latin letters and numbers',
            passwordPlaceholer: 'Password',
            inputPasswordError: 'The minimum login length is 4 characters',
          },

          removeConfirmModal: {
            boardText: 'Are you sure you want to delete this board?',
            columnText: 'Are you sure you want to delete this column?',
            deleteTask: 'Are you sure you want to delete this task?',
          },

          saveBtn: 'Save',
          createBtn: 'Create',
          closeBtn: 'Close',
          deleteBtn: 'Delete',
          yesBtn: 'Yes',
          noBtn: 'No',

          '404page': {
            mainText: 'This page has not been found',
            redirectText: 'Go to',
            redirectLink: 'Main page',
          },

          footer: {
            marinaName: 'Marina',
            petrName: 'Petr',
            sergeyName: 'Sergey',
          },
        },
      },
      ru: {
        translation: {
          header: {
            boardsBtn: 'Доски',
            createBoardBtn: 'Создать новую доску',
            loginBtn: 'Войти',
            signupBtn: 'Зарегистрироваться',
            logoutBtn: 'Выйти',
          },

          loginPage: {
            title: 'Войти в аккаунт',
            loginLabel: 'Введите логин',
            loginErrLength: 'Минимальная длина логина 3 символа',
            loginErrSymbols: 'Логин может содержать только латинские буквы и цифры',
            passwordLabel: 'Введите пароль',
            passwordErrLength: 'Минимальная длина пароля 4 символа',
            fieldErrRequired: 'Заполните поле',
            loginBtn: 'Войти',
            signupLink: 'Зарегистрироваться',
            alert: 'Неверный логин или пароль!',
          },

          signupPage: {
            title: 'Регистрация',
            nameLabel: 'Введите имя',
            nameErrLength: 'Минимальная длина имени 2 символа',
            nameErrSymbols: 'Имя может содержать только латинские буквы',
            loginLabel: 'Введите логин',
            loginErrLength: 'Минимальная длина логина 3 символа',
            loginErrSymbols: 'Логин может содержать только латинские буквы и цифры',
            passwordLabel: 'Введите пароль',
            passwordErrLength: 'Минимальная длина пароля 4 символа',
            fieldErrRequired: 'Заполните поле',
            agreePolicy: 'Согласен с политикой безопасности',
            signupBtn: 'Зарегистрироваться',
            loginLink: 'Уже есть аккаунт? Войти',
            alert: 'Аккаунт с таким логином уже существует.',
          },

          welcomePage: {
            generalDesript:
              'Помогает эффективно организовать работу. Создавайте и отслеживайте задачи, а также управляйте ими и делитесь информацией с участниками команды.',
            aboutProjectPart1:
              'Начните с создания досок, в которые будете помещать списки и карточки с заданиями. Они могут располагаться в нужном для Вас порядке.',
            aboutProjectPart2:
              'Карточки можно переносить в другой список, редактировать и удалять. Удаление доски автоматически удаляет привязанные к ней списки и каточки.',
            aboutProjectBtn: 'Начать',
            aboutCourseTitle: 'О курсе',
            aboutCourseDescription:
              ' Курс React предназначен для студентов RS School, которые прошли RS School stage #2, а также для тех, кто имеет знания и практический опыт использования следующих технологий и инструментов:',
            aboutTeamTitle: 'О разработчиках',
            aboutTeam: {
              marina: {
                name: 'Марина',
                done: 'Структура приложения, роутинг, страница приветствия, страница доски, колонки для доски.',
              },
              petr: {
                name: 'Пётр',
                done: 'Страница досок, шапку сайта, локализацию.',
              },
              sergey: {
                name: 'Сергей',
                done: 'Авторизация, задачи для досок.',
              },
            },
          },

          boardsPage: {
            title: 'Доски',
            addNewBoardBtn: 'Добавить доску',
          },

          boardPage: {
            addColumnBtn: 'Добавить колонку',
            column: {
              editTitleSubmit: 'Принять',
              editTitleCancel: 'Отменить',
              addTaskBtn: 'Добавить задачу',
            },
          },

          createBoardModal: {
            title: 'Создать доску',
            titleLabel: 'Заголовок доски',
            titleInputError: '*Это поле обязательно для заполнения',
            descriptionLabel: 'Описание доски',
          },

          createColumnModal: {
            title: 'Создать колонку',
            titleLabel: 'Заголовок колонки',
            titleInputError: '*Это поле обязательно для заполнения',
          },

          createTaskModal: {
            title: 'Создание задачи',
            titleLabel: 'Заголовок',
            titleInputError: '*Заполните поле',
            descriptionLabel: 'Описание задачи',
            applyBtn: 'Создать',
          },

          editProfile: {
            title: 'Редактировать профиль',
            namePlaceholder: 'Имя пользователя',
            inputNameError: 'Имя должно содержать латинские буквы и длина не менее 2 символов',
            loginPlaceholder: 'Логин',
            inputLoginError:
              'Логин должен содержать латинские буквы и цифры и длина не менее 3 символов',
            passwordPlaceholer: 'Пароль',
            inputPasswordError: 'Минимальная длина пароля - 4 символа',
          },

          removeConfirmModal: {
            boardText: 'Вы уверены, что хотите удалить эту доску?',
            columnText: 'Вы уверены, что хотите удалить колонку?',
            userText: 'Вы уверены, что хотите удалить полользователя?',
            deleteTask: 'Вы уверены, что хотите удалить эту задачу?',
          },

          saveBtn: 'Сохранить',
          createBtn: 'Создать',
          closeBtn: 'Закрыть',
          deleteBtn: 'Удалить',
          yesBtn: 'Да',
          noBtn: 'Нет',

          '404page': {
            mainText: 'Такая страница не найдена',
            redirectText: 'Перейти на',
            redirectLink: 'Главную',
          },

          footer: {
            marinaName: 'Марина',
            petrName: 'Пётр',
            sergeyName: 'Сергей',
          },
        },
      },
    },
  });

export default i18n;
