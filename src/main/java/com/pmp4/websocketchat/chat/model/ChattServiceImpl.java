package com.pmp4.websocketchat.chat.model;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChattServiceImpl implements ChattService {
    private final ChattDAO chattDAO;

    @Override
    public List<ChattVO> selectChatt() {
        return chattDAO.selectChatt();
    }
}
