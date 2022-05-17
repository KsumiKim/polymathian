package sra.common.service;

import java.io.UnsupportedEncodingException;

public interface CryptoService {
  String enCrypt(String paramString) throws UnsupportedEncodingException;
  
  String deCrypt(String paramString) throws UnsupportedEncodingException;
  
  String encryptPasswordSha256(String paramString) throws UnsupportedEncodingException;
  
  String encryptPasswordSha512(String paramString) throws UnsupportedEncodingException;
  
  String encryptPasswordBcrypt(CharSequence paramCharSequence) throws UnsupportedEncodingException;
}


/* Location:              C:\spo\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\sra\WEB-INF\classes\!\sra\common\service\CryptoService.class
 * Java compiler version: 8 (52.0)
 * JD-Core Version:       1.1.3
 */