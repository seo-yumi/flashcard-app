import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const sampleSets = [
  {
    id: 1,
    title: '중학교 영단어 1',
    count: 20,
    color: '#4F8EF7',
    emoji: '📚',
    cards: [{ id: 1, front: 'apple', back: '사과', learned: false }],
  },
];

function StatusBar() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.getHours().toString().padStart(2, '0') +
          ':' +
          now.getMinutes().toString().padStart(2, '0')
      );
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 20px 6px',
        fontSize: 15,
        fontWeight: 600,
        color: '#1a1a2e',
      }}
    >
      <span>{time}</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <span style={{ fontSize: 12 }}>●●●●</span>
        <span style={{ fontSize: 12 }}>WiFi</span>
        <span style={{ fontSize: 12 }}>🔋</span>
      </div>
    </div>
  );
}

function HomeScreen({ sets, onSelectSet, onAddSet }) {
  const [search, setSearch] = useState('');
  const filtered = sets.filter((s) => s.title.includes(search));
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 100px' }}>
      {/* Header */}
      <div
        style={{
          padding: '10px 20px 16px',
          background: 'linear-gradient(135deg, #4F8EF7 0%, #6C63FF 100%)',
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: 13,
            marginBottom: 4,
          }}
        >
          안녕하세요 👋
        </div>
        <div
          style={{
            color: '#fff',
            fontSize: 22,
            fontWeight: 700,
            marginBottom: 16,
          }}
        >
          나의 학습 세트
        </div>
        <div
          style={{
            background: 'rgba(255,255,255,0.2)',
            borderRadius: 12,
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.8)' }}>🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="세트 검색..."
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#fff',
              fontSize: 15,
              flex: 1,
            }}
          />
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          display: 'flex',
          gap: 12,
          padding: '0 20px',
          marginBottom: 20,
        }}
      >
        {[
          { label: '총 세트', value: sets.length, icon: '📦' },
          {
            label: '총 카드',
            value: sets.reduce((a, s) => a + s.cards.length, 0),
            icon: '🃏',
          },
          {
            label: '학습 완료',
            value: sets.reduce(
              (a, s) => a + s.cards.filter((c) => c.learned).length,
              0
            ),
            icon: '✅',
          },
        ].map((st) => (
          <div
            key={st.label}
            style={{
              flex: 1,
              background: '#fff',
              borderRadius: 16,
              padding: '12px 10px',
              textAlign: 'center',
              boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
            }}
          >
            <div style={{ fontSize: 20, marginBottom: 4 }}>{st.icon}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#1a1a2e' }}>
              {st.value}
            </div>
            <div style={{ fontSize: 11, color: '#888' }}>{st.label}</div>
          </div>
        ))}
      </div>

      {/* Sets */}
      <div style={{ padding: '0 20px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 14,
          }}
        >
          <span style={{ fontSize: 17, fontWeight: 700, color: '#1a1a2e' }}>
            내 세트
          </span>
          <button
            onClick={onAddSet}
            style={{
              background: '#4F8EF7',
              color: '#fff',
              border: 'none',
              borderRadius: 20,
              padding: '6px 14px',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            + 새 세트
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map((set) => (
            <div
              key={set.id}
              onClick={() => onSelectSet(set)}
              style={{
                background: '#fff',
                borderRadius: 20,
                padding: 18,
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
              {/* ✅ 수정: 템플릿 리터럴 올바르게 */}
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  background: `${set.color}22`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                }}
              >
                {set.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#1a1a2e',
                    marginBottom: 4,
                  }}
                >
                  {set.title}
                </div>
                <div style={{ fontSize: 13, color: '#888' }}>
                  {set.cards.length}개 카드
                </div>
                <div
                  style={{
                    marginTop: 8,
                    height: 4,
                    background: '#f0f0f0',
                    borderRadius: 4,
                  }}
                >
                  {/* ✅ 수정: 이중 백틱 제거 */}
                  <div
                    style={{
                      height: 4,
                      borderRadius: 4,
                      background: set.color,
                      width: `${
                        (set.cards.filter((c) => c.learned).length /
                          set.cards.length) *
                        100
                      }%`,
                      transition: 'width 0.5s',
                    }}
                  />
                </div>
              </div>
              <div style={{ color: '#ccc', fontSize: 20 }}>›</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SetDetailScreen({
  set,
  onBack,
  onStartFlash,
  onStartQuiz,
  onStartFlashWrong,
  onStartQuizWrong, 
  onUpdateSet,
  onDelete,
}) {
  const learned = set.cards.filter((c) => c.learned).length;
  const handleDeleteCard = (cardId) => {
    const updated = {
      ...set,
      cards: set.cards.filter((c) => c.id !== cardId),
    };
    onUpdateSet(updated);
  };

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 100px' }}>
      {/* ✅ 수정: 템플릿 리터럴 올바르게 */}
      <div
        style={{
          padding: '10px 20px 24px',
          background: `linear-gradient(135deg, ${set.color} 0%, ${set.color}99 100%)`,
          borderBottomLeftRadius: 28,
          borderBottomRightRadius: 28,
          marginBottom: 20,
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: 'rgba(255,255,255,0.25)',
            border: 'none',
            borderRadius: 20,
            padding: '6px 14px',
            color: '#fff',
            fontSize: 14,
            cursor: 'pointer',
            marginBottom: 16,
          }}
        >
          ‹ 뒤로
        </button>
        <button
          onClick={() => {
            if (window.confirm('세트를 삭제할까요?')) onDelete();
          }}
          style={{
            background: 'rgba(255,0,0,0.3)',
            border: 'none',
            borderRadius: 20,
            padding: '6px 14px',
            color: '#fff',
            fontSize: 14,
            cursor: 'pointer',
            marginBottom: 16,
          }}
        >
          🗑 삭제
        </button>
        <div style={{ fontSize: 36, marginBottom: 8 }}>{set.emoji}</div>
        <div
          style={{
            color: '#fff',
            fontSize: 22,
            fontWeight: 700,
            marginBottom: 4,
          }}
        >
          {set.title}
        </div>
        <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>
          {set.cards.length}개 카드 · {learned}개 학습완료
        </div>
        <div
          style={{
            marginTop: 14,
            height: 6,
            background: 'rgba(255,255,255,0.3)',
            borderRadius: 4,
          }}
        >
          {/* ✅ 수정: 이중 백틱 제거 */}
          <div
            style={{
              height: 6,
              borderRadius: 4,
              background: '#fff',
              width: `${(learned / set.cards.length) * 100}%`,
              transition: 'width 0.5s',
            }}
          />
        </div>
      </div>

      {/* Mode buttons */}
      <div style={{ padding: '0 20px', marginBottom: 20 }}>
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}
        >
          {[
            {
              label: '플래시카드',
              icon: '🃏',
              color: '#4F8EF7',
              action: onStartFlash,
            },
            {
              label: '퀴즈',
              icon: '📝',
              color: '#FF6B6B',
              action: onStartQuiz,
            },
            { label:"모르는것만\n플래시카드", icon:"🃏", color:"#6C63FF", action: onStartFlashWrong },
            { label:"모르는것만\n퀴즈", icon:"📝", color:"#FF922B", action: onStartQuizWrong },
          ].map((m) => (
            <button
              key={m.label}
              onClick={m.action}
              style={{
                background: m.color,
                border: 'none',
                borderRadius: 18,
                padding: '20px 12px',
                color: '#fff',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 6 }}>{m.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{m.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Card list */}
      <div style={{ padding: '0 20px' }}>
        <div
          style={{
            fontSize: 17,
            fontWeight: 700,
            color: '#1a1a2e',
            marginBottom: 14,
          }}
        >
          카드 목록
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {set.cards.map((card) => (
            <div
              key={card.id}
              style={{
                background: '#fff',
                borderRadius: 16,
                padding: '14px 16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{ fontSize: 15, fontWeight: 600, color: '#1a1a2e' }}
                >
                  {card.front}
                </div>
                <div style={{ fontSize: 13, color: '#666', marginTop: 3 }}>
                  {card.back}
                </div>
              </div>
              <div
                onClick={() => {
                  const updated = {
                    ...set,
                    cards: set.cards.map((c) =>
                      c.id === card.id ? { ...c, learned: !c.learned } : c
                    ),
                  };
                  onUpdateSet(updated);
                }}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  background: card.learned ? '#6BCB77' : '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: 14,
                }}
              >
                {card.learned ? '✓' : ''}
              </div>
              {/* ✅ 삭제 버튼 */}
              <div
                onClick={() => handleDeleteCard(card.id)}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  background: '#FF6B6B22',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: 14,
                }}
              >
                🗑️
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FlashCardScreen({ set, onBack, onUpdateSet }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [cards, setCards] = useState([...set.cards]);
  const [done, setDone] = useState(false);

  const card = cards[index];

  const handleKnow = () => {
    const updated = cards.map((c, i) =>
      i === index ? { ...c, learned: true } : c
    );
    setCards(updated);
    onUpdateSet({
      ...set,
      cards: set.cards.map((c) =>
        c.id === card.id ? { ...c, learned: true } : c
      ),
    });
    next(updated);
  };
  const handleDontKnow = () => {
    next(cards);
  };
  const next = (updatedCards) => {
    setFlipped(false);
    setTimeout(() => {
      if (index + 1 >= updatedCards.length) setDone(true);
      else setIndex(index + 1);
    }, 150);
  };

  if (done)
    return (
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 30,
          gap: 20,
        }}
      >
        <div style={{ fontSize: 64 }}>🎉</div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: '#1a1a2e',
            textAlign: 'center',
          }}
        >
          학습 완료!
        </div>
        <div style={{ fontSize: 15, color: '#666', textAlign: 'center' }}>
          {cards.filter((c) => c.learned).length}개 카드를 학습했어요
        </div>
        <button
          onClick={onBack}
          style={{
            background: '#4F8EF7',
            color: '#fff',
            border: 'none',
            borderRadius: 20,
            padding: '14px 32px',
            fontSize: 16,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          돌아가기
        </button>
      </div>
    );

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '10px 20px 100px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 20,
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: '#f5f5f5',
            border: 'none',
            borderRadius: 20,
            padding: '8px 14px',
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          ‹ 뒤로
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ height: 6, background: '#f0f0f0', borderRadius: 4 }}>
            {/* ✅ 수정: 이중 백틱 제거 */}
            <div
              style={{
                height: 6,
                borderRadius: 4,
                background: '#4F8EF7',
                width: `${(index / cards.length) * 100}%`,
                transition: 'width 0.4s',
              }}
            />
          </div>
          <div
            style={{
              fontSize: 12,
              color: '#888',
              marginTop: 4,
              textAlign: 'center',
            }}
          >
            {index + 1} / {cards.length}
          </div>
        </div>
      </div>

      {/* Card */}
      <div
        onClick={() => setFlipped(!flipped)}
        style={{
          flex: 1,
          maxHeight: 360,
          background: flipped ? '#1a1a2e' : '#fff',
          borderRadius: 28,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          cursor: 'pointer',
          transition: 'background 0.35s',
          padding: 30,
          marginBottom: 24,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 14,
            right: 16,
            fontSize: 12,
            color: flipped ? 'rgba(255,255,255,0.4)' : '#ccc',
          }}
        >
          {flipped ? '뒷면' : '앞면 · 눌러서 뒤집기'}
        </div>
        <div
          style={{
            fontSize: flipped ? 28 : 32,
            fontWeight: 700,
            color: flipped ? '#fff' : '#1a1a2e',
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          {flipped ? card.back : card.front}
        </div>
        {!flipped && (
          <div
            style={{
              position: 'absolute',
              bottom: 14,
              fontSize: 13,
              color: '#ccc',
            }}
          >
            탭하여 정답 확인
          </div>
        )}
      </div>

      {flipped && (
        <div style={{ display: 'flex', gap: 14 }}>
          <button
            onClick={handleDontKnow}
            style={{
              flex: 1,
              background: '#FF6B6B22',
              color: '#FF6B6B',
              border: '2px solid #FF6B6B',
              borderRadius: 20,
              padding: '16px',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            😅 모르겠어요
          </button>
          <button
            onClick={handleKnow}
            style={{
              flex: 1,
              background: '#6BCB7722',
              color: '#2eaa55',
              border: '2px solid #6BCB77',
              borderRadius: 20,
              padding: '16px',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            ✅ 알아요!
          </button>
        </div>
      )}
    </div>
  );
}

function QuizScreen({ set, onBack }) {
  const [cards] = useState(
    [...set.cards]
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(8, set.cards.length))
  );
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [done, setDone] = useState(false);

  // ✅ 수정: getChoices 미사용 함수 제거, choices만 유지
  const [choices] = useState(() =>
    cards.map((c) => {
      const others = set.cards
        .filter((o) => o.id !== c.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      return [...others, c].sort(() => Math.random() - 0.5);
    })
  );

  const card = cards[index];

  const handleSelect = (choice) => {
    if (selected) return;
    setSelected(choice.id);
    if (choice.id === card.id) setScore((s) => s + 1);
    setTimeout(() => {
      if (index + 1 >= cards.length) setDone(true);
      else {
        setIndex((i) => i + 1);
        setSelected(null);
      }
    }, 900);
  };

  if (done)
    return (
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 30,
          gap: 16,
        }}
      >
        {/* ✅ 수정: 곱셈 연산자 * 추가 */}
        <div style={{ fontSize: 64 }}>
          {score >= cards.length * 0.8
            ? '🏆'
            : score >= cards.length * 0.5
            ? '😊'
            : '😅'}
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: '#1a1a2e' }}>
          퀴즈 완료!
        </div>
        <div style={{ fontSize: 42, fontWeight: 800, color: '#4F8EF7' }}>
          {score}
          <span style={{ fontSize: 20, color: '#aaa' }}>/{cards.length}</span>
        </div>
        {/* ✅ 수정: 곱셈 연산자 * 추가 */}
        <div style={{ fontSize: 15, color: '#666' }}>
          {score >= cards.length * 0.8
            ? '훌륭해요! 🎉'
            : score >= cards.length * 0.5
            ? '잘 했어요! 계속 노력하세요'
            : '조금 더 연습이 필요해요'}
        </div>
        <button
          onClick={onBack}
          style={{
            background: '#4F8EF7',
            color: '#fff',
            border: 'none',
            borderRadius: 20,
            padding: '14px 32px',
            fontSize: 16,
            fontWeight: 700,
            cursor: 'pointer',
            marginTop: 10,
          }}
        >
          돌아가기
        </button>
      </div>
    );

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '10px 20px 100px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 20,
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: '#f5f5f5',
            border: 'none',
            borderRadius: 20,
            padding: '8px 14px',
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          ‹ 뒤로
        </button>
        <div
          style={{ flex: 1, height: 6, background: '#f0f0f0', borderRadius: 4 }}
        >
          {/* ✅ 수정: 이중 백틱 제거 */}
          <div
            style={{
              height: 6,
              borderRadius: 4,
              background: '#FF6B6B',
              width: `${(index / cards.length) * 100}%`,
              transition: 'width 0.4s',
            }}
          />
        </div>
        <div style={{ fontSize: 13, color: '#888', whiteSpace: 'nowrap' }}>
          {index + 1}/{cards.length}
        </div>
      </div>

      <div
        style={{
          background: '#fff',
          borderRadius: 24,
          padding: '28px 24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          marginBottom: 24,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 12,
            color: '#FF6B6B',
            fontWeight: 700,
            textTransform: 'uppercase',
            marginBottom: 12,
            letterSpacing: 1,
          }}
        >
          뜻은 무엇인가요?
        </div>
        <div style={{ fontSize: 26, fontWeight: 800, color: '#1a1a2e' }}>
          {card.front}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {choices[index].map((choice) => {
          let bg = '#fff',
            border = '2px solid #f0f0f0',
            color = '#1a1a2e';
          if (selected) {
            if (choice.id === card.id) {
              bg = '#6BCB7722';
              border = '2px solid #6BCB77';
              color = '#2eaa55';
            } else if (choice.id === selected) {
              bg = '#FF6B6B22';
              border = '2px solid #FF6B6B';
              color = '#FF6B6B';
            }
          }
          return (
            <button
              key={choice.id}
              onClick={() => handleSelect(choice)}
              style={{
                background: bg,
                border,
                borderRadius: 16,
                padding: '16px 18px',
                textAlign: 'left',
                fontSize: 15,
                fontWeight: 600,
                color,
                cursor: 'pointer',
                transition: 'all 0.25s',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              }}
            >
              {choice.back}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function AddSetScreen({ onBack, onAdd }) {
  const [title, setTitle] = useState('');
  const [emoji, setEmoji] = useState('📚');
  const [cards, setCards] = useState([{ front: '', back: '' }]);
  const [excelFileName, setExcelFileName] = useState('');
  const emojis = ['📚', '📖', '🔬', '🎨', '🏛️', '🧮', '🌍', '💡', '🎵', '⚽'];
  const colors = [
    '#4F8EF7',
    '#FF6B6B',
    '#6BCB77',
    '#FFD93D',
    '#C77DFF',
    '#FF922B',
  ];
  const [color, setColor] = useState('#4F8EF7');

  // ✅ 엑셀 업로드 핸들러
  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setExcelFileName(file.name);
    const reader = new FileReader();
    reader.onload = (evt) => {
      const workbook = XLSX.read(evt.target.result, { type: 'binary' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const parsed = rows
        .filter((row) => row[0] && row[1])
        .map((row) => ({ front: String(row[0]), back: String(row[1]) }));
      if (parsed.length > 0) setCards(parsed);
    };
    reader.readAsBinaryString(file);
  };

  const addCard = () => setCards([...cards, { front: '', back: '' }]);
  const updateCard = (i, field, val) =>
    setCards(cards.map((c, ci) => (ci === i ? { ...c, [field]: val } : c)));
  // ✅ 카드 삭제 함수
  const deleteCard = (i) => setCards(cards.filter((_, ci) => ci !== i));
  const handleSave = () => {
    if (!title.trim()) return;
    const validCards = cards
      .filter((c) => c.front.trim() && c.back.trim())
      .map((c, i) => ({ id: i + 1, ...c, learned: false }));
    if (validCards.length === 0) return;
    onAdd({
      id: Date.now(),
      title,
      emoji,
      color,
      count: validCards.length,
      cards: validCards,
    });
  };

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '10px 20px 100px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 24,
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: '#f5f5f5',
            border: 'none',
            borderRadius: 20,
            padding: '8px 14px',
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          취소
        </button>
        <span style={{ fontSize: 17, fontWeight: 700 }}>새 세트 만들기</span>
        <button
          onClick={handleSave}
          style={{
            background: '#4F8EF7',
            color: '#fff',
            border: 'none',
            borderRadius: 20,
            padding: '8px 16px',
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          저장
        </button>
      </div>

      <div
        style={{
          background: '#fff',
          borderRadius: 20,
          padding: 18,
          marginBottom: 16,
          boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
        }}
      >
        <div
          style={{
            fontSize: 13,
            color: '#888',
            marginBottom: 8,
            fontWeight: 600,
          }}
        >
          세트 이름
        </div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="예) 중학교 영단어"
          style={{
            width: '100%',
            border: 'none',
            outline: 'none',
            fontSize: 17,
            fontWeight: 600,
            color: '#1a1a2e',
            background: 'transparent',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div
        style={{
          background: '#fff',
          borderRadius: 20,
          padding: 18,
          marginBottom: 16,
          boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
        }}
      >
        <div
          style={{
            fontSize: 13,
            color: '#888',
            marginBottom: 12,
            fontWeight: 600,
          }}
        >
          이모지
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {emojis.map((e) => (
            <button
              key={e}
              onClick={() => setEmoji(e)}
              style={{
                fontSize: 24,
                background: emoji === e ? '#4F8EF722' : '#f5f5f5',
                border:
                  emoji === e ? '2px solid #4F8EF7' : '2px solid transparent',
                borderRadius: 12,
                padding: 8,
                cursor: 'pointer',
              }}
            >
              {e}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          background: '#fff',
          borderRadius: 20,
          padding: 18,
          marginBottom: 16,
          boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
        }}
      >
        <div
          style={{
            fontSize: 13,
            color: '#888',
            marginBottom: 12,
            fontWeight: 600,
          }}
        >
          색상
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                background: c,
                border:
                  color === c ? '3px solid #1a1a2e' : '3px solid transparent',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      </div>
      {/* ✅ 엑셀 업로드 버튼 */}
      <div
        style={{
          fontSize: 15,
          fontWeight: 700,
          color: '#1a1a2e',
          marginBottom: 12,
        }}
      >
        카드 추가
      </div>
      <label
        style={{
          display: 'block',
          width: '100%',
          background: '#f0f7ff',
          border: '2px dashed #4F8EF7',
          borderRadius: 18,
          padding: 16,
          fontSize: 15,
          color: '#4F8EF7',
          cursor: 'pointer',
          fontWeight: 600,
          textAlign: 'center',
          marginBottom: 10,
          boxSizing: 'border-box',
        }}
      >
        📂 엑셀 파일 업로드 (.xlsx)
        {excelFileName ? (
          <div
            style={{
              fontSize: 12,
              color: '#888',
              marginTop: 4,
              fontWeight: 400,
            }}
          >
            ✅ {excelFileName} ({cards.length}개 카드 불러옴)
          </div>
        ) : (
          <div
            style={{
              fontSize: 12,
              color: '#aaa',
              marginTop: 4,
              fontWeight: 400,
            }}
          >
            A열: 영어단어 · B열: 단어뜻
          </div>
        )}
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleExcelUpload}
          style={{ display: 'none' }}
        />
      </label>

      {cards.map((card, i) => (
        <div
          key={i}
          style={{
            background: '#fff',
            borderRadius: 18,
            padding: 16,
            marginBottom: 10,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}
        >
          {/* ✅ 카드 헤더 + 삭제 버튼 */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 6,
            }}
          >
            <div style={{ fontSize: 12, color: '#aaa' }}>카드 {i + 1}</div>
            {cards.length > 1 && (
              <button
                onClick={() => deleteCard(i)}
                style={{
                  background: '#FF6B6B22',
                  border: 'none',
                  borderRadius: 10,
                  padding: '3px 10px',
                  fontSize: 12,
                  color: '#FF6B6B',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                삭제
              </button>
            )}
          </div>
          <input
            value={card.front}
            onChange={(e) => updateCard(i, 'front', e.target.value)}
            placeholder="앞면 (예: apple)"
            style={{
              width: '100%',
              border: 'none',
              borderBottom: '1px solid #f0f0f0',
              outline: 'none',
              fontSize: 15,
              color: '#1a1a2e',
              padding: '6px 0',
              marginBottom: 10,
              background: 'transparent',
              boxSizing: 'border-box',
            }}
          />
          <input
            value={card.back}
            onChange={(e) => updateCard(i, 'back', e.target.value)}
            placeholder="뒷면 (예: 사과)"
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              fontSize: 15,
              color: '#666',
              padding: '6px 0',
              background: 'transparent',
              boxSizing: 'border-box',
            }}
          />
        </div>
      ))}
      <button
        onClick={addCard}
        style={{
          width: '100%',
          background: '#f5f5f5',
          border: '2px dashed #ddd',
          borderRadius: 18,
          padding: 16,
          fontSize: 15,
          color: '#888',
          cursor: 'pointer',
          fontWeight: 600,
        }}
      >
        + 카드 추가
      </button>
    </div>
  );
}

export default function App() {
  const [sets, setSets] = useState(() => {
    try {
      const saved = localStorage.getItem('classcard-sets');
      return saved ? JSON.parse(saved) : sampleSets;
    } catch {
      return sampleSets;
    }
  });
  const [screen, setScreen] = useState('home');
  const [selectedSet, setSelectedSet] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('classcard-sets', JSON.stringify(sets));
    } catch {}
  }, [sets]);

  const updateSet = (updated) => {
    setSets((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    setSelectedSet(updated);
  };
  const deleteSet = (id) => {
    setSets((prev) => prev.filter((s) => s.id !== id));
    setScreen('home');
  };
  const tabs = [
    { id: 'home', icon: '🏠', label: '홈' },
    { id: 'addset', icon: '➕', label: '추가' },
  ];

  const renderScreen = () => {
    if (screen === 'home')
      return (
        <HomeScreen
          sets={sets}
          onSelectSet={(s) => {
            setSelectedSet(s);
            setScreen('detail');
          }}
          onAddSet={() => setScreen('addset')}
        />
      );
    if (screen === 'detail' && selectedSet)
      return (
        <SetDetailScreen
          set={selectedSet}
          onBack={() => setScreen('home')}
          onStartFlash={() => setScreen('flash')}
          onStartQuiz={() => setScreen('quiz')}
          onStartFlashWrong={()=>setScreen("flash-wrong")}
          onStartQuizWrong={()=>setScreen("quiz-wrong")}
          onUpdateSet={updateSet}
          onDelete={() => deleteSet(selectedSet.id)}
        />
      );
    if (screen === 'flash' && selectedSet)
      return (
        <FlashCardScreen
          set={selectedSet}
          onBack={() => setScreen('detail')}
          onUpdateSet={updateSet}
        />
      );
    if (screen === 'quiz' && selectedSet)
      return (
        <QuizScreen set={selectedSet} onBack={() => setScreen('detail')} />
      );
    if (screen === 'addset')
      return (
        <AddSetScreen
          onBack={() => setScreen('home')}
          onAdd={(s) => {
            setSets((prev) => [...prev, s]);
            setScreen('home');
          }}
        />
      );
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontFamily: "'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif",
      }}
    >
      {/* Phone frame */}
      <div
        style={{
          width: '100%',
          height: '100vh',
          background: '#f2f2f7',
          borderRadius: 0,
          overflow: 'hidden',
          boxShadow: 'none',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <StatusBar />

        {/* Dynamic Island */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 120,
            height: 36,
            background: '#000',
            borderRadius: 18,
            zIndex: 10,
          }}
        />

        {/* Screen content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
          }}
        >
          {renderScreen()}
        </div>

        {/* Bottom nav */}
        {(screen === 'home' || screen === 'addset') && (
          <div
            style={{
              height: 83,
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(0,0,0,0.08)',
              display: 'flex',
              alignItems: 'flex-start',
              paddingTop: 10,
              paddingBottom: 20,
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setScreen(tab.id)}
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 3,
                }}
              >
                <span style={{ fontSize: 22 }}>{tab.icon}</span>
                <span
                  style={{
                    fontSize: 11,
                    color: screen === tab.id ? '#4F8EF7' : '#8e8e93',
                    fontWeight: screen === tab.id ? 700 : 400,
                  }}
                >
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Home indicator */}
        <div
          style={{
            height: 5,
            background: 'transparent',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 8,
          }}
        >
          <div
            style={{
              width: 120,
              height: 4,
              background: 'rgba(0,0,0,0.2)',
              borderRadius: 2,
            }}
          />
        </div>
      </div>
    </div>
  );
}
