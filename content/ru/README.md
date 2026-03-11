# React Component Maker (расширение для VS Code)

Быстрое создание настраиваемых по шаблонам React-компонентов.
Это расширение помогает разработчикам создавать структуру компонентов с минимальными усилиями — по правому клику мыши.

<br>

## ✨ Возможности

- Создание компонентов на основе ваших шаблонов (как добраться до папки шаблонов `.react-templates` читайте ниже)
- Поддержка JavaScript и TypeScript
- Автоматическая генерация:
  - Файлов стилей (CSS, SCSS, CSS Modules)
  - Index-файлов (index.js может быть создан в папке компонента или в родительской — создан или добавлен к существующим реэкспортам)
  - Типов (`types.ts`)
  - Тестов (в папке `tests`)
- Настройка стилей именования файлов и папок: "camelCase", "PascalCase", "kebab-case", "snake_case", "lowercase"
- Гибкие настройки в интерфейсе VS Code

<br>

## 🚀 Как использовать

1. **Кликните правой кнопкой мыши** по нужной папке
2. Выберите **"Create React Component"**
3. Введите имя компонента
4. Выберите шаблон из своей папки шаблонов

> 💡 Шаблоны — это `.jsx`, `.tsx`, `.js` или `.ts` файлы, хранящиеся в папке `.react-templates` внутри папки расширения.

<br>

## ⚙️ Настройки

Настроить расширение можно в `Настройки → Расширения → React Component Maker` или CTRL + , → введите "react component maker" для Windows или CMD + , → введите "react component maker" для Mac.

### Доступные опции:

- **TypeScript**: включение `.tsx` вместо `.jsx`
- **Стили именования**:
  - Название папок и файлов: camelCase, PascalCase, kebab-case, snake_case, lowercase
- **Стили компонентов**:
  - Генерация файла стилей (вкл/выкл)
  - Расширения: `css`, `scss`, `module.css`, `module.scss`
- **Генерация тестов**:
  - Вкл/выкл
  - Шаблон теста
- **Шаблоны компонента, index и types файлов**

### Локальная конфигурация

С помощью файла `.rcmakerrc.json` можно сохранить локальные настройки для каждого проекта отдельно. Рекомендуемое расположение файла — рядом с `package.json` проекта. Теперь при переключении между проектами нет необходимости изменять каждый раз глобальные настройки.

Локальные настройки имеют приоритет над глобальными. Файл локальных настроек необязательно должен содержать все настройки. Если в локальном файле чего-то не хватает, будут использованы глобальные настройки.

При создании структуры компонента происходит поиск файла с локальными настройками начиная с папки-родителя выше по иерархии вплоть до папки, которая ограничивает рабочее пространство VS Code. Если файлов с локальными настройками не найдено — используются глобальные.

Вот пример файла локальной конфигурации:

```json
{
  "useTypeScript": false,
  "defaultTemplate": "import styles from './${componentStyleFileName}';\n\nexport const ${componentName} = () => {\n  return (\n    <>\n      <div className={styles.${camelCase}}>Hello from ${componentName}</div>\n    </>\n  );\n}",
  "folderNameStyle": "kebab-case",
  "fileNameStyle": "PascalCase",
  "createStyleFile": true,
  "styleFileNameStyle": "camelCase",
  "styleExtension": "module.css",
  "generateIndexFile": true,
  "indexTemplate": "export * from './${componentFolderName}/${componentBaseFileName}';\n",
  "indexInComponentFolder": false,
  "generateTypesFile": false,
  "typesTemplate": "export interface ${componentName}Props {\n}\n",
  "generateTestFile": false,
  "testTemplate": "import { render } from '@testing-library/react';\nimport ${componentName} from './${componentFolderName}/${componentFileName}';\n\ndescribe('${componentName}', () => {\n  it('renders correctly', () => {\n    render(<${componentName} />);\n  });\n});"
}
```

<br>

## 📂 Папка шаблонов

Команда **"Open Component Templates"** (по правому клику) откроет папку шаблонов (откроется до 5 файлов одновременно). В редакторе, на любом ярлыке шаблона кликните правой кнопкой мыши и в контекстном меню нажмите на пункт **"Reveal in File Explorer"**.

Каждый шаблон может использовать переменные:

```js
import styles from "./${componentStyleFileName}";

export const ${componentName} = () => {
  return (
    <div className={styles.${camelCase}}>Hello from ${componentName}</div>
  );
}
```

При создании шаблонов компонентов можно использовать специальные литералы. Они будут автоматически заменены на соответствующие значения в зависимости от имени компонента и настроек.

### Доступные переменные

#### 📁 Названия файлов и папок

| Литерал                    | Пример                | Описание                                                                                        |
|----------------------------|-----------------------|-------------------------------------------------------------------------------------------------|
| `${componentName}`         | `NavBar`              | Название компонента в PascalCase                                                                |
| `${componentFileName}`     | `NavBar.tsx`          | Имя файла компонента с расширением (зависит от настроек — *File Name Style*, *Use TypeScript*)  |
| `${componentBaseFileName}` | `NavBar`              | Имя файла компонента без расширения (зависит от настройки — *File Name Style*)                  |
| `${componentFolderName}`   | `nav-bar`             | Имя папки компонента (зависит от настройки — *Folder Name Style*)                               |
| `${componentStyleFileName}`| `navBar.module.css`   | Имя файла стилей (зависит от настроек — *Style File Name Style*, *Style Extension*)             |
| `${componentIndexFileName}`| `index.ts`            | Имя index-файла (всегда index.js)                                                               |
| `${componentTypesFileName}`| `types.ts`            | Имя файла с типами (всегда types.ts)                                                            |
| `${componentTestFileName}` | `NavBar.test.tsx`     | Имя тестового файла (зависит от настроек — *File Name Style*, *Use TypeScript*)                 |

#### 🔤 Форматы имени

| Литерал        | Пример       | Описание                         |
|----------------|--------------|----------------------------------|
| `${pascalCase}`| `NavBar`     | PascalCase (по умолчанию)        |
| `${camelCase}` | `navBar`     | camelCase                        |
| `${kebabCase}` | `nav-bar`    | kebab-case                       |
| `${snakeCase}` | `nav_bar`    | snake_case                       |
| `${lowerCase}` | `navbar`     | все строчные буквы               |
