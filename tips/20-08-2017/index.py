class Solution(object):
    def minWindow(self, s, t):
        if not t or not s:
            return ''

        tape = t + s
        tape_len = len(tape)
        pattern_len = len(t)
        left_cursor = min_left_cursor = 0
        right_cursor = min_right_cursor = pattern_len - 1

        counts = [0] * 256
        current_counts = [0] * 256

        for c in t:
            counts[ord(c)] += 1
            current_counts[ord(c)] += 1

        while True:
            left_char = ord(tape[left_cursor])

            if current_counts[left_char] == 0:
                left_cursor += 1
            elif current_counts[left_char] > counts[left_char]:
                left_cursor += 1
                current_counts[left_char] -= 1
            else:
                if min_left_cursor < pattern_len or right_cursor - left_cursor < min_right_cursor - min_left_cursor:
                    min_left_cursor = left_cursor
                    min_right_cursor = right_cursor

                right_cursor += 1

                if right_cursor >= tape_len:
                    break

                right_char = ord(tape[right_cursor])

                if counts[right_char] > 0:
                    current_counts[right_char] += 1

        if min_left_cursor < pattern_len:
            return ''

        return tape[min_left_cursor:min_right_cursor + 1]


print(Solution().minWindow('a', 'aa'))
