import { createJid } from '../src/utils/createJid';

describe('createJid Utility Function', () => {
  describe('Group JID handling', () => {
    it('should return group JID unchanged', () => {
      const groupJid = '123456789-123456789@g.us';
      expect(createJid(groupJid)).toBe(groupJid);
    });

    it('should handle long group identifiers', () => {
      const longGroupId = '123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890-123456789';
      const expected = `${longGroupId}@g.us`;
      expect(createJid(longGroupId)).toBe(expected);
    });
  });

  describe('Already formatted JIDs', () => {
    it('should return already formatted WhatsApp JID unchanged', () => {
      const jid = '5511999999999@s.whatsapp.net';
      expect(createJid(jid)).toBe(jid);
    });

    it('should return lid JID unchanged', () => {
      const lidJid = '123456789@lid';
      expect(createJid(lidJid)).toBe(lidJid);
    });

    it('should return broadcast JID unchanged', () => {
      const broadcastJid = '123456789@broadcast';
      expect(createJid(broadcastJid)).toBe(broadcastJid);
    });
  });

  describe('Number formatting', () => {
    it('should remove spaces, parentheses, and plus signs', () => {
      const number = '+55 (11) 9 9999-9999';
      const result = createJid(number);
      expect(result).toBe('5511999999999@s.whatsapp.net');
    });

    it('should handle numbers with colons', () => {
      const number = '5511999999999:123';
      const result = createJid(number);
      expect(result).toBe('5511999999999@s.whatsapp.net');
    });
  });

  describe('Brazilian number formatting', () => {
    it('should format 13-digit Brazilian number correctly', () => {
      const number = '5511999999999';
      const result = createJid(number);
      expect(result).toBe('5511999999999@s.whatsapp.net');
    });

    it('should handle old Brazilian format', () => {
      const number = '551199999999';
      const result = createJid(number);
      expect(result).toBe('551199999999@s.whatsapp.net');
    });

    it('should format São Paulo mobile correctly', () => {
      const number = '5511987654321';
      const result = createJid(number);
      expect(result).toBe('5511987654321@s.whatsapp.net');
    });
  });

  describe('Mexico and Argentina number formatting', () => {
    it('should format Mexican number correctly', () => {
      const number = '5215512345678';
      const result = createJid(number);
      expect(result).toBe('525512345678@s.whatsapp.net');
    });

    it('should format Argentine number correctly', () => {
      const number = '5491123456789';
      const result = createJid(number);
      expect(result).toBe('541123456789@s.whatsapp.net');
    });

    it('should handle non-13-digit MX/AR numbers', () => {
      const number = '521234567890';
      const result = createJid(number);
      expect(result).toBe('521234567890@s.whatsapp.net');
    });
  });

  describe('Edge cases', () => {
    it('should handle empty string', () => {
      const result = createJid('');
      expect(result).toBe('@s.whatsapp.net');
    });

    it('should handle number with only special characters', () => {
      const number = '+++---()()()';
      const result = createJid(number);
      expect(result).toBe('@s.whatsapp.net');
    });

    it('should handle very long numbers as group JID', () => {
      const longNumber = '123456789012345678901234567890';
      const result = createJid(longNumber);
      expect(result).toBe('123456789012345678901234567890@g.us');
    });
  });
});