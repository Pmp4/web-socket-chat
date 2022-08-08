package com.pmp4.websocketchat.chat.controller;

import com.pmp4.websocketchat.chat.model.ChattService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RequestMapping("/")
@RequiredArgsConstructor
public class ChattAPI {
    private static final Logger logger = LoggerFactory.getLogger(ChattAPI.class);
    private final ChattService chattService;

    @GetMapping("/api")
    @ResponseBody
    public String chattView() {
        logger.info("채팅 내역보기");

        return "hello";
    }
}
