const StringUtil = {
  matchPath : (menuPath: string, currentPath: string): boolean => {
    // [id] 같은 부분을 정규표현식으로 변환
    const regex = new RegExp('^' + menuPath.replace(/\[.*?\]/g, '[^/]+') + '$')
    return regex.test(currentPath)
  }
}

export default StringUtil
