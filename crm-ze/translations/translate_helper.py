import csv
import sys

def append_translations(pairs, output_file):
    """Append translation pairs to CSV file."""
    with open(output_file, 'a', newline='', encoding='utf-8') as f:
        writer = csv.writer(f, quoting=csv.QUOTE_MINIMAL)
        for eng, alb in pairs:
            writer.writerow([eng, alb])
    print(f"Appended {len(pairs)} translations")

if __name__ == "__main__":
    # Read from stdin, format: english|||albanian per line
    pairs = []
    for line in sys.stdin:
        line = line.strip()
        if '|||' in line:
            parts = line.split('|||', 1)
            pairs.append((parts[0], parts[1]))
    append_translations(pairs, '/Users/ezekaj/Desktop/zeo_dental/crm-ze/translations/translated_aa.csv')
