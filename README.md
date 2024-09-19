# govspeak-js

Status: Work in progress

An attempt at reimplementing https://github.com/alphagov/govspeak in JS, using
[remark](https://github.com/remarkjs/remark).

## Component support

| Component               | Syntax              | Support | Notes              |
| ----------------------- | ------------------- |---------|------------------- |
| Headings                | ##                  | 🟡 | H1 not supported, trailing spaces not required |
| Blockquotes             | \>                  | ✅ | Default markdown   |
| Bullets                 | \-                  | ✅️ | Default markdown   |
| Lists                   | 1.                  | ✅️ | Default markdown   |
| Code Blocks             | \`\`\`              | ✅️ | Default markdown   |
| Horizontal Rules        | \* \* \*            | ✅️ | Default markdown   |
| Links                   | []()                | ✅️ | Default markdown   |
| Email Links             | <example.com\>      | ✅️ | Default markdown   |
| Emphasis                |  \_ \_              | ✅️ | Default markdown   |
| Markdown Images         | \!\[\]\(\)          | ✅️ | Default markdown   |
| Information callouts    | ^                   | ❌ | New attention?     |
| Warning callouts        | %                   | ❌ | New attention?     |
| Example callout         | $E                  | ❌ | New dollar block   |
| Statistic headline      | {stat-headline}     | ❌ | New weird block    |
| Contact Block           | $C                  | ❌ | New dollar block   |
| Address                 | $A                  | ❌ | New dollar block   |
| Downloads               | $D                  | ❌ | New dollar block   |
| Place                   | $P                  | ❌ | New dollar block   |
| Information             | $I                  | ❌ | New dollar block   |
| Additional Information  | $AI                 | ❌ | New dollar block   |
| Call to Action          | $CTA                | ✅️ | New dollar block   |
| External Link           | x\[\]\(\)x          | ❌ | New link addition  |
| Steps                   | s1.                 | ❌ | New list type      |
| Legislative Lists       | \* 1.               | ❌ | New list type      |
| Devolved content        | :england:           | ❌ | New weird block    |
| Tables                  | \|---\|             | 🟡 | GFM? Needs check   |
| Barcharts               | {barchart}          | ❌ | New table addition |
| Attachments             | [Attachment:]       | ❌ | New weird link     |
| Attachment Links        | [AttachmentLink:]   | ❌ | New weird link     |
| Images                  | [Image:]            | ❌ | New weird link     |
| Embeded Link            | [embed:link:]       | ❌ | New weird link     |
| Embeded Contact         | [Contact:]          | ❌ | New weird link     |
| Button                  | {button}            | ❌ | Like directives    |
| Acronyms                | \*[]:               | ✅ | [remark-abbr][]    |
| Superscript/Subscript   | <sup>               | ✅ | Default HTML       |
| Video                   | youtube.com         | ✅ | New autolink?      |
| Footnotes               | [^n]                | 🟡 | GFM? Needs check   |
| Advisory                |                     | ❌ | Deprecated         |
| Answer                  |                     | ❌ | Deprecated         |
| Inline Attachments      | [InlineAttachment:] | ❌ | Deprecated         |
| Embed Attachments       | [embed:attachment:] | ❌ | Deprecated         |
| Embed Image Attachments | [embed:image:]      | ❌ | Deprecated         |
| Summary                 | $!                  | ❌ | Deprecated         |
| Legacy Images           | !!1                 | ❌ | Deprecated         |
| Legacy Attachment       | !@1                 | ❌ | Deprecated         |

<!-- Definitions -->

[remark-abbr]: https://www.github.com/richardtowers/remark-abbr