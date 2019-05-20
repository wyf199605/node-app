/**
 * 根据时间日期生成文件上传的目录
 *
 * @return string 返回文件上传路径
 */
export function getFileDirname(): string{
    let date = new Date(),
        year = date.getFullYear(),
        mouth = date.getMonth() + 1,
        day = date.getDate();

    return `${year}${mouth < 10 ? '0' + mouth : mouth}${day < 10 ? '0' + day : day}`;
}
